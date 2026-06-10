import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- PARTICLE SPECIFICATIONS ---
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = []; // To keep track of original coordinates for wave animation

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a spherical/cloud structure
      const x = (Math.random() - 0.5) * 800;
      const y = (Math.random() - 0.5) * 800;
      const z = (Math.random() - 0.5) * 800;

      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;

      initialPositions.push({ x, y, z, speed: 0.2 + Math.random() * 0.8 });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // --- CUSTOM CANVAS TEXTURE FOR CIRCULAR PARTICLES ---
    const createCircleTexture = (colorStr) => {
      const matCanvas = document.createElement('canvas');
      matCanvas.width = 16;
      matCanvas.height = 16;
      const matCtx = matCanvas.getContext('2d');
      
      const gradient = matCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, colorStr);
      gradient.addColorStop(0.5, colorStr.replace('1)', '0.3)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      matCtx.fillStyle = gradient;
      matCtx.fillRect(0, 0, 16, 16);
      
      const texture = new THREE.CanvasTexture(matCanvas);
      return texture;
    };

    // Color definitions
    const darkColor = 'rgba(0, 242, 254, 1)'; // Neon Cyan
    const lightColor = 'rgba(14, 165, 233, 1)'; // Deep Cyan

    // Detect if light mode is active on start
    let isLightMode = document.documentElement.classList.contains('light-mode');
    
    // Create material with circular sprite texture
    const material = new THREE.PointsMaterial({
      size: 4,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture(isLightMode ? lightColor : darkColor),
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // --- INTERACTIVE SYSTEM CONTROLS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse positions between -1 and 1
      targetX = (event.clientX - window.innerWidth / 2) * 0.08;
      targetY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- THEME MONITORING ---
    const observer = new MutationObserver(() => {
      const currentLightMode = document.documentElement.classList.contains('light-mode');
      if (currentLightMode !== isLightMode) {
        isLightMode = currentLightMode;
        // Re-generate texture with updated color palette
        material.map = createCircleTexture(isLightMode ? lightColor : darkColor);
        material.needsUpdate = true;
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
      
      // Interpolate mouse movements for cinematic inertial deceleration
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate particle cloud gently
      particleSystem.rotation.y = elapsedTime * 0.02 + mouseX * 0.002;
      particleSystem.rotation.x = elapsedTime * 0.01 + mouseY * 0.002;

      // React to scrolling - shifts depth coordinate
      particleSystem.position.z = scrollY * 0.1;

      // Animate individual particles organically (wave simulation)
      const positionsArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const initial = initialPositions[i];
        
        // Simple wave animation on Y and X axis based on index and elapsed time
        positionsArray[i3 + 1] = initial.y + Math.sin(elapsedTime * initial.speed + initial.x * 0.05) * 8;
        positionsArray[i3] = initial.x + Math.cos(elapsedTime * initial.speed * 0.5 + initial.y * 0.05) * 4;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESPONSIVENESS CONTROLS ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-bg-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
}

export default ThreeBackground;
