import React from 'react';
import { motion } from 'framer-motion';
import { Plane, ShieldCheck, Cpu, Rocket, Calendar, MapPin, Award } from 'lucide-react';
import './Timeline.css';
import { useLanguage } from '../context/LanguageContext.jsx';

const eventIcons = [Cpu, Plane, ShieldCheck, Rocket];
const eventColors = ["#3b82f6", "#00f2fe", "#10b981", "#a855f7"];

function Timeline() {
  const { t } = useLanguage();
  const events = t.timeline.events || [];

  return (
    <section id="timeline" className="timeline-section">
      <div className="section-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="timeline-badge glass-effect"
        >
          <Award size={16} color="var(--accent-cyan)" />
          <span>{t.timeline.badge}</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          {t.timeline.titleStart} <span className="text-gradient">{t.timeline.titleGrad}</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-desc"
        >
          {t.timeline.desc}
        </motion.p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {events.map((item, index) => {
          const IconComp = eventIcons[index % eventIcons.length];
          const color = eventColors[index % eventColors.length];
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              key={index}
              className={`timeline-item ${isEven ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <div className="timeline-node" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}80` }}>
                <IconComp size={20} color="#ffffff" />
              </div>

              <div className="timeline-content glass-effect" style={{ borderLeftColor: color }}>
                <div className="timeline-meta">
                  <span className="timeline-year">
                    <Calendar size={14} /> {item.year}
                  </span>
                  <span className="timeline-location">
                    <MapPin size={14} /> {item.location}
                  </span>
                </div>

                <span className="timeline-badge-item" style={{ backgroundColor: `${color}18`, color: color, borderColor: `${color}40` }}>
                  {item.badge}
                </span>

                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>

                <div className="timeline-highlights">
                  {item.highlights.map((h, i) => (
                    <span key={i} className="highlight-tag">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Timeline;
