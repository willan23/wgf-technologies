import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function TiltCard({ children, className = "", maxTilt = 12 }) {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile/touch to avoid tilt conflicts
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Framer Motion Values for Tracking Mouse Coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinates to degrees of rotation
  // When mouse is on the left (negative ratio), rotateY is positive (tilts right face forward)
  // When mouse is at the top (negative ratio), rotateX is positive (tilts top face forward)
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Spring configuration for cinematic inertia
  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center as a ratio from -0.5 to 0.5
    const relativeX = (event.clientX - rect.left) / width - 0.5;
    const relativeY = (event.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Reset values to center
    x.set(0);
    y.set(0);
  };

  // Skip rendering tilt animations on mobile for UX/perf
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default TiltCard;
