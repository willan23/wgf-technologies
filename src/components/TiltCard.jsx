import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function TiltCard({
  children,
  className = '',
  maxTilt = 9,
  scaleOnHover = 1.015,
  glare = true,
}) {
  const cardRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkEnvironment = () => {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      const touchOrMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setDisabled(Boolean(reduced || touchOrMobile));
    };
    checkEnvironment();
    window.addEventListener('resize', checkEnvironment);
    return () => window.removeEventListener('resize', checkEnvironment);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 175, mass: 0.65 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (event) => {
    if (!cardRef.current || disabled) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(Math.max(-0.5, Math.min(0.5, relativeX)));
    y.set(Math.max(-0.5, Math.min(0.5, relativeY)));
    if (!hovered) setHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  if (disabled) {
    return <div className={`tilt-card-fallback ${className}`.trim()}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: hovered ? scaleOnHover : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1100px',
      }}
      className={`tilt-card-shell ${hovered ? 'is-tilting' : ''} ${className}`.trim()}
    >
      <div className="tilt-card-inner">
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="tilt-card-glare"
            style={{
              '--glare-x': glareX,
              '--glare-y': glareY,
              opacity: hovered ? 1 : 0,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default TiltCard;
