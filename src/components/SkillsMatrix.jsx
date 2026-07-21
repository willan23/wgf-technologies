import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal, Cpu, Smartphone, Layers, CheckCircle2, Code2 } from 'lucide-react';
import TiltCard from './TiltCard.jsx';
import './SkillsMatrix.css';

const skillCategories = [
  {
    id: "kernel",
    title: "Kernel & Cibersegurança",
    icon: Shield,
    color: "#3b82f6",
    subtitle: "Sistemas Defensivos & Telemetria Low-Level",
    description: "Desenvolvimento de drivers de sistema e agentes eBPF com rigor aeronáutico e consumo ultrabaixo de recursos.",
    skills: [
      { name: "Rust", level: 95, desc: "Agentes Linux eBPF, Segurança de Memória e Concorrência Zero-Cost" },
      { name: "eBPF (Linux Kernel)", level: 92, desc: "Telemetria e monitorização defensiva de chamadas de sistema no Kernel" },
      { name: "Windows Ring-0 Driver", level: 88, desc: "Drivers C para captura de eventos em tempo real no Windows" },
      { name: "Cisco Cybersecurity", level: 95, desc: "Análise de pacotes, Packet Tracer e Hardening de Infraestruturas Críticas" },
      { name: "Threat AI Engine", level: 90, desc: "Classificação local de ameaças e mitigação automatizada EDR" }
    ]
  },
  {
    id: "web",
    title: "Full-Stack Web & Cloud",
    icon: Code2,
    color: "#00f2fe",
    subtitle: "Aplicações de Alta Performance e SEO",
    description: "Arquiteturas escaláveis com Next.js 16, TypeScript e APIs REST/GraphQL assíncronas.",
    skills: [
      { name: "Next.js 16 / React", level: 96, desc: "App Router, ISR, LCP otimizado e componentes Radix/Tailwind" },
      { name: "TypeScript / JS", level: 95, desc: "Desenvolvimento seguro com tipos estritos e padrões limpos" },
      { name: "FastAPI & Python", level: 90, desc: "APIs assíncronas de alto débito e processamento de dados" },
      { name: "Redis & Dramatiq", level: 88, desc: "Filas de tarefas assíncronas distribuídas e caching agressivo" },
      { name: "PostgreSQL & Firebase", level: 92, desc: "Modelação relacional e base de dados em tempo real" }
    ]
  },
  {
    id: "mobile",
    title: "Mobile & FinTech",
    icon: Smartphone,
    color: "#a855f7",
    subtitle: "Pagamentos Seguros e Experiência Nativa",
    description: "Aplicações móveis resilientes em ambientes de conectividade instável com validações bancárias.",
    skills: [
      { name: "React Native & Expo", level: 94, desc: "Aplicações móveis multiplataforma com performance nativa" },
      { name: "Firebase Auth & Security", level: 92, desc: "Autenticação multifator, OTP delivery e regras de segurança" },
      { name: "reCAPTCHA Enterprise", level: 90, desc: "Proteção contra bots e mitigação de ataques cibernéticos" },
      { name: "STPway & Bank APIs", level: 88, desc: "Integração direta com gateways de pagamento institucionais" }
    ]
  },
  {
    id: "iot",
    title: "IoT, Wi-Fi Sensing & AI Local",
    icon: Cpu,
    color: "#10b981",
    subtitle: "Sensoriamento Sem Câmaras e Assistentes Offline",
    description: "Inovação em localização 3D usando física de ondas Wi-Fi e inteligência artificial offline.",
    skills: [
      { name: "Wi-Fi Sensing (CSI)", level: 92, desc: "Sensoriamento indoor tridimensional (eixo Z) via Channel State Info" },
      { name: "ZKP (Zero-Knowledge)", level: 86, desc: "Provas de privacidade biológica sem partilha de dados corporais" },
      { name: "Ollama & Local LLMs", level: 90, desc: "Integração de modelos de linguagem 100% offline em IDEs e Desktop" },
      { name: "Electron Desktop", level: 88, desc: "IDEs e ferramentas desktop cruzadas com backend Python local" }
    ]
  }
];

function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState("kernel");

  const currentCategory = skillCategories.find(c => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="skills-badge glass-effect"
        >
          <Layers size={16} color="var(--accent-cyan)" />
          <span>Matriz de Especialização</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Stack Tecnológico & <span className="text-gradient">Competências Clave</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-desc"
        >
          Combinando o rigor de linguagens compiladas de baixo nível com o dinamismo do ecossistema web moderno.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="skills-tabs-container">
        <div className="skills-tabs glass-effect">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                className={`skills-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
                style={{ "--tab-accent": cat.color }}
              >
                <IconComponent size={18} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Display */}
      <div className="skills-content-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="category-detail-wrapper"
          >
            <TiltCard maxTilt={5}>
              <div className="category-overview-card glass-effect" style={{ borderTop: `4px solid ${currentCategory.color}` }}>
                <div className="category-header-row">
                  <div className="category-icon-box" style={{ backgroundColor: `${currentCategory.color}15`, color: currentCategory.color }}>
                    {React.createElement(currentCategory.icon, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="category-title">{currentCategory.title}</h3>
                    <p className="category-subtitle">{currentCategory.subtitle}</p>
                  </div>
                </div>
                <p className="category-description">{currentCategory.description}</p>
              </div>
            </TiltCard>

            <div className="skills-bars-grid">
              {currentCategory.skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="skill-bar-card glass-effect"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div className="skill-meta-row">
                    <span className="skill-name">
                      <CheckCircle2 size={16} color={currentCategory.color} /> {skill.name}
                    </span>
                    <span className="skill-percent" style={{ color: currentCategory.color }}>{skill.level}%</span>
                  </div>

                  <div className="skill-track">
                    <motion.div 
                      className="skill-progress" 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                      style={{ background: `linear-gradient(90deg, ${currentCategory.color}99, ${currentCategory.color})` }}
                    />
                  </div>

                  <p className="skill-detail-desc">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default SkillsMatrix;
