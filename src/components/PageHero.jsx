import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="page-hero">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="page-hero-inner"
      >
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </motion.div>
    </section>
  );
}
