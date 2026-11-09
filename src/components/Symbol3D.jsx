import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { company } from '../data/company';
import './Symbol3D.css';

const ThreeDHeroObject = lazy(() => import('./ThreeDHeroObject'));

function canRenderWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) return false;
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

const EXTRUSION_SLICES = [-16, -12, -8, -4];

export default function Symbol3D({ size = 'lg', className = '', alt = 'WGF symbol' }) {
  const stageRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  // Normalized pointer coordinates (-0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 140, mass: 0.75 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['15%', '85%']);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['15%', '85%']);

  useEffect(() => {
    if (size === 'lg') {
      setWebglReady(canRenderWebGL());
    }
  }, [size]);

  const handleMouseMove = (event) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const rx = (event.clientX - rect.left) / rect.width - 0.5;
    const ry = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(Math.max(-0.5, Math.min(0.5, rx)));
    pointerY.set(Math.max(-0.5, Math.min(0.5, ry)));
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const isLarge = size === 'lg';

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`symbol-3d-stage symbol-3d-${size} ${className}`.trim()}
      aria-hidden={alt ? undefined : true}
    >
      {/* Ambient volumetric backlight */}
      <div className="symbol-3d-aura" aria-hidden="true" />

      {/* Live WebGL 3D Gyroscopic Core for Hero stage */}
      {isLarge && webglReady && (
        <div className="symbol-3d-webgl-layer" aria-hidden="true">
          <Suspense fallback={null}>
            <ThreeDHeroObject interactive={false} />
          </Suspense>
        </div>
      )}

      {/* Interactive 3D Preserve-3D Rig */}
      <motion.div
        className="symbol-3d-rig"
        style={{
          rotateX,
          rotateY,
          x: parallaxX,
          y: parallaxY,
        }}
      >
        <motion.div
          className="symbol-3d-card"
          animate={{
            rotateY: [-9, 9, -9],
            rotateX: [5, -4, 5],
            y: [0, -11, 0],
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* 3D CSS Gyroscopic Orbital Rings */}
          {isLarge && (
            <>
              <div className="symbol-3d-orbit symbol-3d-orbit-1" aria-hidden="true">
                <span className="orbit-node orbit-node-cyan" />
              </div>
              <div className="symbol-3d-orbit symbol-3d-orbit-2" aria-hidden="true">
                <span className="orbit-node orbit-node-gold" />
              </div>
            </>
          )}

          {/* Volumetric 3D Extrusion Depth Slices */}
          {EXTRUSION_SLICES.map((zOffset, idx) => (
            <img
              key={zOffset}
              src={company.assets.symbol3d}
              alt=""
              aria-hidden="true"
              draggable={false}
              className={`symbol-3d-slice symbol-3d-slice-${idx}`}
              style={{
                transform: `translateZ(${zOffset}px) scale(${1 - idx * 0.004})`,
              }}
            />
          ))}

          {/* Primary High-Definition 3D Symbol */}
          <img
            src={company.assets.symbol3d}
            alt={alt}
            className="symbol-3d-img"
            draggable={false}
          />

          {/* Dynamic Specular Reflection Overlay */}
          <motion.div
            className="symbol-3d-sheen"
            aria-hidden="true"
            style={{
              '--sheen-x': sheenX,
              '--sheen-y': sheenY,
            }}
          />
        </motion.div>

        {/* Holographic 3D Pedestal Base */}
        {isLarge && (
          <div className="symbol-3d-pedestal" aria-hidden="true">
            <div className="pedestal-ring pedestal-ring-outer" />
            <div className="pedestal-ring pedestal-ring-inner" />
            <div className="pedestal-core-glow" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
