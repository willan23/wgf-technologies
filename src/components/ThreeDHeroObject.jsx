import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ThreeDHeroObject() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- DIMENSIONS SETUP ---
    const width = mountRef.current.clientWidth || 400;
    const height = mountRef.current.clientHeight || 400;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls (for interactive rotation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom to avoid scrolling conflict
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 50); // Cyan glow light
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 50); // Blue light
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // --- GEOMETRIES AND MATERIALS ---
    // 1. Core Sphere (glowing wireframe)
    const geometry = new THREE.SphereGeometry(1.8, 32, 32);
    
    // Store original position coordinates for vertex displacement/morphing
    const positionAttribute = geometry.attributes.position;
    const originalPositions = new Float32Array(positionAttribute.count * 3);
    for (let i = 0; i < positionAttribute.count * 3; i++) {
      originalPositions[i] = positionAttribute.array[i];
    }

    // Material setup matching system theme
    let isLightMode = document.documentElement.classList.contains('light-mode');
    
    const getWireframeColor = (light) => (light ? 0x0ea5e9 : 0x00f2fe);
    const getSolidColor = (light) => (light ? 0xffffff : 0x03050a);
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: getWireframeColor(isLightMode),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const innerSphereGeo = new THREE.SphereGeometry(1.75, 32, 32);
    const innerSphereMat = new THREE.MeshPhongMaterial({
      color: getSolidColor(isLightMode),
      transparent: true,
      opacity: 0.7,
      shininess: 100,
      specular: 0x3b82f6,
    });

    const cyberSphere = new THREE.Mesh(geometry, wireframeMaterial);
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    
    const group3D = new THREE.Group();
    group3D.add(cyberSphere);
    group3D.add(innerSphere);

    // 2. Outer Orbital Ring with nodes
    const ringGeometry = new THREE.RingGeometry(2.4, 2.42, 64);
    const ringMaterial = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x1d4ed8 : 0x3b82f6,
      transparent: true,
      opacity: 0.4,
    });
    const orbitalRing = new THREE.LineLoop(ringGeometry, ringMaterial);
    orbitalRing.rotation.x = Math.PI / 3;
    orbitalRing.rotation.y = Math.PI / 6;
    group3D.add(orbitalRing);

    // Floating orbital satellite nodes
    const nodeCount = 5;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: isLightMode ? 0x1d4ed8 : 0x00f2fe,
      emissive: isLightMode ? 0x0ea5e9 : 0x00f2fe,
      emissiveIntensity: 0.5,
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      group3D.add(node);
      nodes.push({
        mesh: node,
        speed: 0.5 + Math.random() * 0.8,
        angle: (i / nodeCount) * Math.PI * 2,
        radius: 2.4,
      });
    }

    scene.add(group3D);

    // --- THEME UPDATE ---
    const observer = new MutationObserver(() => {
      const currentLightMode = document.documentElement.classList.contains('light-mode');
      if (currentLightMode !== isLightMode) {
        isLightMode = currentLightMode;
        wireframeMaterial.color.setHex(getWireframeColor(isLightMode));
        innerSphereMat.color.setHex(getSolidColor(isLightMode));
        ringMaterial.color.setHex(isLightMode ? 0x1d4ed8 : 0x3b82f6);
        nodeMaterial.color.setHex(isLightMode ? 0x1d4ed8 : 0x00f2fe);
        nodeMaterial.emissive.setHex(isLightMode ? 0x0ea5e9 : 0x00f2fe);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // 1. Update controls
      controls.update();

      // 2. Vertex Displacement (Morphing Cyber-Sphere)
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        
        // Fetch original coordinates
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Apply 3D noise/sine deformation based on coordinate and time
        const wave = Math.sin(ox * 2 + elapsedTime * 2) * Math.cos(oy * 2 + elapsedTime * 2) * 0.15;
        
        // Push vertices outwards along normal vector (away from center)
        const length = Math.sqrt(ox*ox + oy*oy + oz*oz);
        positions[i3] = ox + (ox / length) * wave;
        positions[i3 + 1] = oy + (oy / length) * wave;
        positions[i3 + 2] = oz + (oz / length) * wave;
      }
      geometry.attributes.position.needsUpdate = true;

      // 3. Rotate the group gently on other axis
      group3D.rotation.z = elapsedTime * 0.05;

      // 4. Animate outer nodes moving on orbital ring
      nodes.forEach((n) => {
        n.angle += 0.01 * n.speed;
        // Position on 3D rotated orbit plane
        const x = Math.cos(n.angle) * n.radius;
        const y = Math.sin(n.angle) * n.radius;
        
        // Rotate points matching orbitalRing orientation: x = rotateX, y = rotateY
        // Apply matrix or simple Euler rotations
        const tempVec = new THREE.Vector3(x, y, 0);
        tempVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3);
        tempVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
        
        n.mesh.position.copy(tempVec);
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- RESPONSIVE HANDLER ---
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="hero-3d-object-mount"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab'
      }}
    />
  );
}

export default ThreeDHeroObject;
