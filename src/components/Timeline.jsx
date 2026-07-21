import React from 'react';
import { motion } from 'framer-motion';
import { Plane, ShieldCheck, Cpu, Rocket, Calendar, MapPin, Award } from 'lucide-react';
import './Timeline.css';

const timelineEvents = [
  {
    year: "2018 - 2021",
    title: "Engenharia Informática & Fundamentos de Sistemas",
    location: "São Tomé e Príncipe",
    badge: "Formação de Base",
    icon: Cpu,
    color: "#3b82f6",
    desc: "Desenvolvimento de uma base sólida em arquitetura de computadores, redes de comunicação, programação estruturada e engenharia de software.",
    highlights: ["Arquitetura de Sistemas", "Redes & Protocolos", "Programação Orientada a Objetos"]
  },
  {
    year: "2022 - 2024",
    title: "Técnico de Produção Aeronáutica (Nível 4)",
    location: "Porto, Portugal",
    badge: "Rigor Aeronáutico Zero-Fault",
    icon: Plane,
    color: "#00f2fe",
    desc: "Produção de compósitos de fibra de carbono e vidro para transportes públicos de alta exigência. Aplicação de padrões industriais aeroespaciais onde o erro não é uma opção.",
    highlights: ["Processos Zero-Fault", "Engenharia de Compósitos", "Qualidade & Latência Zero"]
  },
  {
    year: "2024 - 2026",
    title: "Redes, Sistemas Informáticos & Cibersegurança Cisco",
    location: "Porto, Portugal",
    badge: "Certificação Cisco",
    icon: ShieldCheck,
    color: "#10b981",
    desc: "Especialização em Gestão de Redes e Cibersegurança pela Cisco Networking Academy. Foco defensivo em segurança de infraestruturas críticas e eBPF no Kernel Linux.",
    highlights: ["Cisco Cybersecurity Certified", "Telemetria eBPF & Kernel Rust", "Análise de Tráfego Packet Tracer"]
  },
  {
    year: "2026+",
    title: "Fundador WGF Technologies & Ecossistema de Software",
    location: "Porto, Portugal & Global",
    badge: "Fundador & Inovação",
    icon: Rocket,
    color: "#a855f7",
    desc: "Lançamento e consolidação de produtos proprietários de alta performance em Cibersegurança (NGAV/EDR), IoT/Sensoriamento Wi-Fi (SenseOS) e FinTech Mobile (STPway).",
    highlights: ["EDR Enterprise Rust", "SenseOS Wi-Fi Sensing ZKP", "FinTech STPway & SUPER CKDO"]
  }
];

function Timeline() {
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
          <span>Rigor & Evolução Contínua</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          A Trajetória <span className="text-gradient">"Zero-Fault Journey"</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-desc"
        >
          Da precisão física da aviação ao desenvolvimento de sistemas críticos e cibersegurança avançada.
        </motion.p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {timelineEvents.map((item, index) => {
          const IconComp = item.icon;
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
              <div className="timeline-node" style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}80` }}>
                <IconComp size={20} color="#ffffff" />
              </div>

              <div className="timeline-content glass-effect" style={{ borderLeftColor: item.color }}>
                <div className="timeline-meta">
                  <span className="timeline-year">
                    <Calendar size={14} /> {item.year}
                  </span>
                  <span className="timeline-location">
                    <MapPin size={14} /> {item.location}
                  </span>
                </div>

                <span className="timeline-badge-item" style={{ backgroundColor: `${item.color}18`, color: item.color, borderColor: `${item.color}40` }}>
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
