import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ThreeDHeroObject({ interactive = true, className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    // --- SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    container.appendChild(renderer.domElement);

    // Optional OrbitControls when interactive mode is enabled
    let controls = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.9;
    }

    let isLightMode = document.documentElement.classList.contains('light-mode');

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isLightMode ? 0.65 : 0.35);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x00f2fe, 2.8, 30);
    pointLightCyan.position.set(5, 5, 5);
    scene.add(pointLightCyan);

    const pointLightBlue = new THREE.PointLight(0x3b82f6, 2.2, 30);
    pointLightBlue.position.set(-5, -4, 4);
    scene.add(pointLightBlue);

    const pointLightGold = new THREE.PointLight(0xf59e0b, 1.6, 30);
    pointLightGold.position.set(4, -5, -3);
    scene.add(pointLightGold);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 1. FRESNEL RIM-LIT ENERGY CORE ---
    const innerCoreGeo = new THREE.SphereGeometry(1.42, 48, 48);
    const fresnelMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(isLightMode ? 0xe0f2fe : 0x050b18) },
        uRimColor1: { value: new THREE.Color(isLightMode ? 0x0284c7 : 0x00f2fe) },
        uRimColor2: { value: new THREE.Color(isLightMode ? 0xd97706 : 0xf59e0b) },
        uOpacity: { value: isLightMode ? 0.38 : 0.62 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vWorldPos = position;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform vec3 uRimColor1;
        uniform vec3 uRimColor2;
        uniform float uOpacity;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);
          float gradientMix = clamp((vWorldPos.x + 1.5) / 3.0, 0.0, 1.0);
          vec3 rimColor = mix(uRimColor1, uRimColor2, gradientMix * 0.65 + 0.15 * sin(uTime));
          vec3 col = mix(uBaseColor, rimColor, fresnel * 1.15);
          float alpha = clamp(uOpacity * (0.35 + fresnel * 0.95), 0.0, 0.92);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, fresnelMat);
    rootGroup.add(innerCoreMesh);

    // --- 2. MORPHING GEODESIC WIREFRAME SHELL ---
    const shellGeo = new THREE.IcosahedronGeometry(1.68, 4);
    const posAttr = shellGeo.attributes.position;
    const originalPositions = new Float32Array(posAttr.count * 3);
    for (let i = 0; i < posAttr.count * 3; i++) {
      originalPositions[i] = posAttr.array[i];
    }

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x0284c7 : 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.22 : 0.24,
      depthWrite: false,
    });
    const cyberSphere = new THREE.Mesh(shellGeo, wireframeMat);
    rootGroup.add(cyberSphere);

    // --- 3. MULTI-AXIS GYROSCOPIC ORBITAL RINGS ---
    const createGyroRing = (radius, tube, colorHex, opacity, rotX, rotY) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      return { mesh, geo, mat, rotX, rotY };
    };

    const ringCyan = createGyroRing(
      2.28,
      0.012,
      isLightMode ? 0x0284c7 : 0x00f2fe,
      isLightMode ? 0.42 : 0.48,
      Math.PI / 2.8,
      Math.PI / 7
    );
    const ringBlue = createGyroRing(
      2.58,
      0.01,
      isLightMode ? 0x1d4ed8 : 0x3b82f6,
      isLightMode ? 0.32 : 0.35,
      -Math.PI / 3.1,
      -Math.PI / 5
    );
    const ringGold = createGyroRing(
      2.86,
      0.009,
      isLightMode ? 0xd97706 : 0xf59e0b,
      isLightMode ? 0.28 : 0.3,
      Math.PI / 2.1,
      -Math.PI / 3.5
    );

    rootGroup.add(ringCyan.mesh, ringBlue.mesh, ringGold.mesh);

    // Dashed telemetry precision ring (Points along a circle)
    const tickCount = 96;
    const tickPositions = new Float32Array(tickCount * 3);
    for (let i = 0; i < tickCount; i++) {
      const a = (i / tickCount) * Math.PI * 2;
      const r = 3.08;
      tickPositions[i * 3] = Math.cos(a) * r;
      tickPositions[i * 3 + 1] = Math.sin(a) * r;
      tickPositions[i * 3 + 2] = 0;
    }
    const tickGeo = new THREE.BufferGeometry();
    tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPositions, 3));
    const tickMat = new THREE.PointsMaterial({
      color: isLightMode ? 0x047857 : 0x10b981,
      size: 0.045,
      transparent: true,
      opacity: isLightMode ? 0.55 : 0.65,
      depthWrite: false,
    });
    const tickRing = new THREE.Points(tickGeo, tickMat);
    tickRing.rotation.x = Math.PI / 3.6;
    tickRing.rotation.y = Math.PI / 9;
    rootGroup.add(tickRing);

    // --- 4. ORBITING SATELLITE NODES ---
    const satellites = [];
    const satGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const satColors = [0x00f2fe, 0x3b82f6, 0x10b981, 0xf59e0b, 0x00f2fe, 0xf59e0b];
    const satRings = [ringCyan, ringBlue, ringCyan, ringGold, ringBlue, ringGold];

    for (let i = 0; i < 6; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: satColors[i],
      });
      const mesh = new THREE.Mesh(satGeo, mat);
      rootGroup.add(mesh);
      satellites.push({
        mesh,
        mat,
        ring: satRings[i],
        radius: i % 3 === 0 ? 2.28 : i % 3 === 1 ? 2.58 : 2.86,
        angle: (i / 6) * Math.PI * 2,
        speed: (i % 2 === 0 ? 1 : -1) * (0.45 + i * 0.08),
      });
    }

    // --- 5. POINTER PARALLAX ---
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const handlePointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerX = nx;
      pointerY = ny;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // --- 6. THEME OBSERVER ---
    const observer = new MutationObserver(() => {
      const currentLightMode = document.documentElement.classList.contains('light-mode');
      if (currentLightMode !== isLightMode) {
        isLightMode = currentLightMode;
        wireframeMat.color.setHex(isLightMode ? 0x0284c7 : 0x00f2fe);
        wireframeMat.opacity = isLightMode ? 0.22 : 0.24;
        fresnelMat.uniforms.uBaseColor.value.setHex(isLightMode ? 0xe0f2fe : 0x050b18);
        fresnelMat.uniforms.uRimColor1.value.setHex(isLightMode ? 0x0284c7 : 0x00f2fe);
        fresnelMat.uniforms.uRimColor2.value.setHex(isLightMode ? 0xd97706 : 0xf59e0b);
        fresnelMat.uniforms.uOpacity.value = isLightMode ? 0.38 : 0.62;
        ringCyan.mat.color.setHex(isLightMode ? 0x0284c7 : 0x00f2fe);
        ringBlue.mat.color.setHex(isLightMode ? 0x1d4ed8 : 0x3b82f6);
        ringGold.mat.color.setHex(isLightMode ? 0xd97706 : 0xf59e0b);
        tickMat.color.setHex(isLightMode ? 0x047857 : 0x10b981);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // --- 7. ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let frameId = 0;
    const axisX = new THREE.Vector3(1, 0, 0);
    const axisY = new THREE.Vector3(0, 1, 0);
    const tempVec = new THREE.Vector3();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      fresnelMat.uniforms.uTime.value = elapsedTime;

      if (controls) {
        controls.update();
      }

      smoothX += (pointerX - smoothX) * 0.05;
      smoothY += (pointerY - smoothY) * 0.05;

      // Morphing geodesic vertices
      const positions = shellGeo.attributes.position.array;
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const wave =
          Math.sin(ox * 2.2 + elapsedTime * 1.8) *
          Math.cos(oy * 2.2 + elapsedTime * 1.6) *
          Math.sin(oz * 1.8 + elapsedTime * 1.4) *
          0.11;

        const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
        positions[i3] = ox + (ox / len) * wave;
        positions[i3 + 1] = oy + (oy / len) * wave;
        positions[i3 + 2] = oz + (oz / len) * wave;
      }
      shellGeo.attributes.position.needsUpdate = true;

      // Gyroscopic precession + mouse tilt
      cyberSphere.rotation.y = elapsedTime * 0.16;
      cyberSphere.rotation.x = elapsedTime * 0.09;

      ringCyan.mesh.rotation.z = elapsedTime * 0.22;
      ringBlue.mesh.rotation.z = -elapsedTime * 0.18;
      ringGold.mesh.rotation.z = elapsedTime * 0.14;
      tickRing.rotation.z = -elapsedTime * 0.1;

      rootGroup.rotation.y = smoothX * 0.35 + (!interactive ? elapsedTime * 0.12 : 0);
      rootGroup.rotation.x = -smoothY * 0.28 + Math.sin(elapsedTime * 0.5) * 0.08;

      // Update satellite positions along their respective tilted rings
      for (let i = 0; i < satellites.length; i++) {
        const s = satellites[i];
        const angle = s.angle + elapsedTime * s.speed;
        tempVec.set(Math.cos(angle) * s.radius, Math.sin(angle) * s.radius, 0);
        tempVec.applyAxisAngle(axisY, s.ring.rotY);
        tempVec.applyAxisAngle(axisX, s.ring.rotX);
        s.mesh.position.copy(tempVec);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. RESIZE & VISIBILITY ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    const handleVisibility = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) animate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      observer.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerCoreGeo.dispose();
      fresnelMat.dispose();
      shellGeo.dispose();
      wireframeMat.dispose();
      ringCyan.geo.dispose();
      ringCyan.mat.dispose();
      ringBlue.geo.dispose();
      ringBlue.mat.dispose();
      ringGold.geo.dispose();
      ringGold.mat.dispose();
      tickGeo.dispose();
      tickMat.dispose();
      satGeo.dispose();
      satellites.forEach((s) => s.mat.dispose());
      if (controls) controls.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`hero-3d-object-mount ${className}`.trim()}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: interactive ? 'grab' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    />
  );
}

export default ThreeDHeroObject;
