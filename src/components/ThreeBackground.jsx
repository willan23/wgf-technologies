import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DARK_PALETTE = [
  new THREE.Color(0x00f2fe), // Neon Cyber Cyan
  new THREE.Color(0x3b82f6), // Electric Blue
  new THREE.Color(0x38bdf8), // Sky Blue
  new THREE.Color(0x10b981), // Cyber Emerald
  new THREE.Color(0xf59e0b), // Warm Gold accent
];

const LIGHT_PALETTE = [
  new THREE.Color(0x0284c7), // Deep Sky Cyan
  new THREE.Color(0x1d4ed8), // Royal Blue
  new THREE.Color(0x0369a1), // Ocean Blue
  new THREE.Color(0x047857), // Deep Emerald
  new THREE.Color(0xd97706), // Rich Amber
];

function pickBrandColor(palette, index) {
  // Weight distribution toward cyan/blue, with emerald and gold accents matching WGF symbol
  const r = (index * 0.61803398875) % 1;
  if (r < 0.38) return palette[0];
  if (r < 0.68) return palette[1];
  if (r < 0.82) return palette[2];
  if (r < 0.92) return palette[3];
  return palette[4];
}

function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1400
    );
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    let isLightMode = document.documentElement.classList.contains('light-mode');

    // =========================================================================
    // 1. VOLUMETRIC PARTICLE FIELD (GLSL Shader with per-particle size & glow)
    // =========================================================================
    const particleCount = 720;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const initialParticles = [];

    const activePalette = isLightMode ? LIGHT_PALETTE : DARK_PALETTE;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical shell + deep field distribution for richer depth-of-field
      const radius = 140 + Math.pow(Math.random(), 0.75) * 480;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta) * 1.35;
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.95;
      const z = (Math.random() - 0.5) * 650;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const c = pickBrandColor(activePalette, i);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      // Tiered sizes: micro-stars, mid-nodes, and occasional bright bokeh orbs
      const tier = Math.random();
      sizes[i] = tier > 0.94 ? 9.5 + Math.random() * 5.0 : tier > 0.65 ? 5.2 + Math.random() * 2.5 : 2.4 + Math.random() * 2.0;
      phases[i] = Math.random() * Math.PI * 2;

      initialParticles.push({
        x,
        y,
        z,
        speed: 0.18 + Math.random() * 0.55,
        amp: 4 + Math.random() * 9,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uOpacity: { value: isLightMode ? 0.65 : 0.88 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float dist = -mvPosition.z;
          float pulse = 0.78 + 0.22 * sin(uTime * 1.8 + aPhase);
          gl_PointSize = clamp(aSize * pulse * (280.0 / max(dist, 60.0)) * uPixelRatio, 1.5, 28.0);
          // Smooth depth fade for very distant or very close particles
          float depthFade = smoothstep(750.0, 180.0, dist) * smoothstep(20.0, 95.0, dist);
          vAlpha = depthFade * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uOpacity;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv) * 2.0;
          if (d > 1.0) discard;

          // Soft volumetric halo + hot core
          float halo = exp(-d * d * 4.5);
          float core = exp(-d * d * 22.0);
          vec3 finalColor = mix(vColor, vec3(1.0), core * 0.65);
          float alpha = (halo * 0.75 + core * 0.45) * vAlpha * uOpacity;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particleSystem);

    // =========================================================================
    // 2. NEURAL CONSTELLATION SYNAPSE NETWORK (Dynamic 3D LineSegments)
    // =========================================================================
    const hubCount = 72;
    const maxConnectDist = 128;
    const maxConnections = (hubCount * (hubCount - 1)) / 2;

    const hubs = [];
    for (let i = 0; i < hubCount; i++) {
      const c = pickBrandColor(activePalette, i);
      hubs.push({
        baseX: (Math.random() - 0.5) * 580,
        baseY: (Math.random() - 0.5) * 380,
        baseZ: (Math.random() - 0.5) * 260,
        x: 0,
        y: 0,
        z: 0,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        color: c.clone(),
      });
    }

    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isLightMode ? 0.16 : 0.22,
      blending: isLightMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const constellationLines = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(constellationLines);

    // =========================================================================
    // 3. DEEP-SPACE GYROSCOPIC ORBITAL RINGS
    // =========================================================================
    const orbitGroup = new THREE.Group();
    const createOrbitalRing = (radius, segments, tiltX, tiltY, colorHex, opacity) => {
      const pts = [];
      for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      const loop = new THREE.LineLoop(geo, mat);
      loop.rotation.x = tiltX;
      loop.rotation.y = tiltY;
      return { loop, geo, mat };
    };

    const ring1 = createOrbitalRing(260, 128, Math.PI * 0.36, Math.PI * 0.12, isLightMode ? 0x0284c7 : 0x00f2fe, isLightMode ? 0.08 : 0.1);
    const ring2 = createOrbitalRing(340, 128, -Math.PI * 0.28, Math.PI * 0.22, isLightMode ? 0x1d4ed8 : 0x3b82f6, isLightMode ? 0.06 : 0.07);
    orbitGroup.add(ring1.loop, ring2.loop);
    orbitGroup.position.z = -90;
    scene.add(orbitGroup);

    // =========================================================================
    // 4. INTERACTIVE MOUSE & SCROLL CONTROLS
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerWorldX = 0;
    let pointerWorldY = 0;
    let scrollY = window.scrollY || 0;

    const handleMouseMove = (event) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -(event.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 28;
      targetY = ny * 22;
      pointerWorldX = nx * 280;
      pointerWorldY = ny * 180;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // =========================================================================
    // 5. THEME SYNCHRONIZATION
    // =========================================================================
    const applyThemePalette = (light) => {
      const palette = light ? LIGHT_PALETTE : DARK_PALETTE;
      const colAttr = particleGeo.attributes.color.array;
      for (let i = 0; i < particleCount; i++) {
        const c = pickBrandColor(palette, i);
        colAttr[i * 3] = c.r;
        colAttr[i * 3 + 1] = c.g;
        colAttr[i * 3 + 2] = c.b;
      }
      particleGeo.attributes.color.needsUpdate = true;

      for (let i = 0; i < hubCount; i++) {
        hubs[i].color.copy(pickBrandColor(palette, i));
      }

      particleMaterial.uniforms.uOpacity.value = light ? 0.65 : 0.88;
      particleMaterial.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      particleMaterial.needsUpdate = true;

      lineMaterial.opacity = light ? 0.16 : 0.22;
      lineMaterial.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      lineMaterial.needsUpdate = true;

      ring1.mat.color.setHex(light ? 0x0284c7 : 0x00f2fe);
      ring2.mat.color.setHex(light ? 0x1d4ed8 : 0x3b82f6);
    };

    const observer = new MutationObserver(() => {
      const currentLightMode = document.documentElement.classList.contains('light-mode');
      if (currentLightMode !== isLightMode) {
        isLightMode = currentLightMode;
        applyThemePalette(isLightMode);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // =========================================================================
    // 6. ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      particleMaterial.uniforms.uTime.value = elapsedTime;

      // Inertial camera & scene parallax
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      const scrollOffset = scrollY * 0.08;

      particleSystem.rotation.y = elapsedTime * 0.018 + mouseX * 0.004;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.08) * 0.06 - mouseY * 0.004;
      particleSystem.position.y = scrollOffset * 0.35;

      constellationLines.rotation.y = particleSystem.rotation.y * 0.85;
      constellationLines.rotation.x = particleSystem.rotation.x * 0.85;
      constellationLines.position.y = scrollOffset * 0.25;

      orbitGroup.rotation.z = elapsedTime * 0.035;
      orbitGroup.rotation.y = elapsedTime * 0.02 + mouseX * 0.003;
      orbitGroup.position.y = scrollOffset * 0.18;

      // Organic particle wave displacement
      const posArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const init = initialParticles[i];
        posArr[i3] = init.x + Math.cos(elapsedTime * init.speed + init.y * 0.015) * init.amp * 0.6;
        posArr[i3 + 1] = init.y + Math.sin(elapsedTime * init.speed + init.x * 0.015) * init.amp;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Update neural hub positions & dynamic synapse connections
      for (let i = 0; i < hubCount; i++) {
        const h = hubs[i];
        h.x = h.baseX + Math.sin(elapsedTime * 0.45 + h.phase) * 32;
        h.y = h.baseY + Math.cos(elapsedTime * 0.38 + h.phase * 1.3) * 28;
        h.z = h.baseZ + Math.sin(elapsedTime * 0.3 + h.phase * 0.7) * 24;

        // Subtle cursor gravity interaction
        const dxMouse = h.x - pointerWorldX;
        const dyMouse = h.y - pointerWorldY;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
        if (distMouseSq < 25000 && distMouseSq > 1) {
          const factor = (1 - Math.sqrt(distMouseSq) / 158) * 14;
          h.x += (dxMouse / Math.sqrt(distMouseSq)) * factor;
          h.y += (dyMouse / Math.sqrt(distMouseSq)) * factor;
        }
      }

      let vertexIdx = 0;
      const maxDistSq = maxConnectDist * maxConnectDist;

      for (let i = 0; i < hubCount; i++) {
        const a = hubs[i];
        for (let j = i + 1; j < hubCount; j++) {
          const b = hubs[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            const strength = 1 - Math.sqrt(distSq) / maxConnectDist;
            const cIdx = vertexIdx * 3;

            linePositions[cIdx] = a.x;
            linePositions[cIdx + 1] = a.y;
            linePositions[cIdx + 2] = a.z;

            linePositions[cIdx + 3] = b.x;
            linePositions[cIdx + 4] = b.y;
            linePositions[cIdx + 5] = b.z;

            lineColors[cIdx] = a.color.r * strength;
            lineColors[cIdx + 1] = a.color.g * strength;
            lineColors[cIdx + 2] = a.color.b * strength;

            lineColors[cIdx + 3] = b.color.r * strength;
            lineColors[cIdx + 4] = b.color.g * strength;
            lineColors[cIdx + 5] = b.color.b * strength;

            vertexIdx += 2;
          }
        }
      }

      lineGeo.setDrawRange(0, vertexIdx);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 7. RESIZE, VISIBILITY & CLEANUP
    // =========================================================================
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const handleVisibility = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) animate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      particleGeo.dispose();
      particleMaterial.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      ring1.geo.dispose();
      ring1.mat.dispose();
      ring2.geo.dispose();
      ring2.mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-bg-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}

export default ThreeBackground;
