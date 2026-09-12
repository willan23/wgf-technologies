import React from 'react';
import { motion } from 'framer-motion';
import { company } from '../data/company';
import './Symbol3D.css';

export default function Symbol3D({ size = 'lg', className = '', alt = 'WGF symbol' }) {
  return (
    <div className={`symbol-3d-stage symbol-3d-${size} ${className}`.trim()} aria-hidden={alt ? undefined : true}>
      <motion.div
        className="symbol-3d-card"
        animate={{ rotateY: [-12, 12, -12], rotateX: [6, -4, 6], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={company.assets.symbol3d} alt={alt} className="symbol-3d-img" draggable={false} />
      </motion.div>
    </div>
  );
}
