import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, MessageSquare, Briefcase, FileText, Activity } from 'lucide-react';
import './Hero.css';
import TiltCard from './TiltCard.jsx';
import ThreeDHeroObject from './ThreeDHeroObject.jsx';

function Hero() {
  const [terminalHistory, setTerminalHistory] = useState([
    "WGF OS v2.0.6 (Porto, Portugal) - Cyber-Security Kernel Console",
    "Initializing eBPF Kernel telemetry... [OK]",
    "Loading AI Security Threat Detection Engine... [ACTIVE]",
    "Zero-Fault Aeronautical Process Integration... [ONLINE]",
    "Digite 'help' para ver a lista completa de comandos.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll terminal ao atualizar histórico
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    switch (cmd) {
      case 'help':
        response = [
          `> ${inputVal}`,
          "Comandos disponíveis na consola WGF OS:",
          "  scan      - Executa varredura de segurança defensiva em tempo real",
          "  projects  - Lista o ecossistema de projetos & produtos WGF",
          "  skills    - Exibe a matriz tecnológica (Rust, eBPF, Next.js, Cisco)",
          "  timeline  - Mostra a jornada 'Zero-Fault' do fundador William Fernandes",
          "  cv        - Abrir/Descarregar o Currículo / Biografia (PDF)",
          "  status    - Exibe a telemetria do sistema e estado do Kernel",
          "  contact   - Mostra contactos diretos (WhatsApp, E-mail, LinkedIn)",
          "  clear     - Limpa o ecrã do terminal"
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setInputVal("");
        return;
      case 'cv':
        response = [
          `> ${inputVal}`,
          "[+] A abrir Currículo / Biografia de William Fernandes (PDF)...",
          "[✓] Ficheiro pronto: /Biografia.pdf"
        ];
        window.open('/Biografia.pdf', '_blank');
        break;
      case 'status':
        response = [
          `> ${inputVal}`,
          "┌───────────────────────────────────────────────────────────┐",
          "│ WGF OS TELEMETRY & KERNEL STATUS                          │",
          "├───────────────────────────────────────────────────────────┤",
          "│ System State      : ONLINE (Zero-Fault Mode)              │",
          "│ Location          : Porto, Portugal                       │",
          "│ eBPF Probes       : 12 Active Ring-0 Probes               │",
          "│ AI Threat Latency : < 0.8ms                               │",
          "│ Defense Matrix    : 100% Cisco Certified Compliance       │",
          "└───────────────────────────────────────────────────────────┘"
        ];
        break;
      case 'skills':
        response = [
          `> ${inputVal}`,
          "Matriz Principal de Tecnologias WGF:",
          "  [Kernel/Security] Rust, eBPF (Linux), Windows Ring-0, Cisco Security",
          "  [Full-Stack Web]  Next.js 16, TypeScript, React, Vite, TailwindCSS",
          "  [Backend/Cloud]   FastAPI, Python, Redis, Dramatiq, PostgreSQL",
          "  [Mobile/FinTech]  React Native, Firebase Auth, reCAPTCHA, STPway API",
          "  [IoT / AI]        Wi-Fi Sensing (CSI 3D Z-Axis), ZKP, Ollama Offline"
        ];
        break;
      case 'timeline':
        response = [
          `> ${inputVal}`,
          "Jornada 'Zero-Fault' — William Fernandes:",
          "  • 2018-2021 | Engenharia Informática (Base de Arquitetura & Redes)",
          "  • 2022-2024 | Técnico de Produção Aeronáutica em Portugal (Rigor Absoluto)",
          "  • 2024-2026 | Gestão de Redes & Certificação Cisco Cybersecurity",
          "  • 2026+     | Fundador WGF Technologies & Ecossistema de Produtos"
        ];
        break;
      case 'contact':
        response = [
          `> ${inputVal}`,
          "Contactos Diretos da WGF Technologies:",
          "  - WhatsApp : +351 939 060 342",
          "  - E-mail   : wgftechnologies@gmail.com",
          "  - LinkedIn : linkedin.com/in/william-fernandes-152506244",
          "  - Sede     : Porto, Portugal"
        ];
        break;
      case 'projects':
        response = [
          `> ${inputVal}`,
          "Ecossistema de Soluções WGF Technologies:",
          "  [1] Sistema NGAV & EDR Enterprise (Rust + eBPF Kernel Driver)",
          "  [2] AI Site Shield (SaaS de Varredura Defensiva de Código IA)",
          "  [3] WGF SenseOS (Sensoriamento Indoor 3D Wi-Fi sem Câmaras)",
          "  [4] WGF Note (IDE Local-First com Ollama AI Offline)",
          "  [5] Connect CPLP / STPway (App Mobile FinTech & Gateway Bancário)",
          "  [6] SUPER CKDO (Web E-commerce Next.js 16 de Alta Performance)",
          "  [7] CLMA Engenharia (Web Design Premium para Construção Civil)"
        ];
        break;
      case 'scan':
        response = [
          `> ${inputVal}`,
          "[~] A iniciar varredura defensiva em WGF-Kernel Subsystem...",
          "[~] A analisar chamadas eBPF e integridade de pacotes...",
          "[✓] Telemetria de memória: 0 fuga de dados detetada.",
          "[✓] Chaves de criptografia e assinaturas SHA256: 100% VÁLIDAS.",
          "[+] Varredura concluída com sucesso! 0 vulnerabilidades encontradas."
        ];
        break;
      default:
        response = [
          `> ${inputVal}`,
          `Comando '${cmd}' não reconhecido. Digite 'help' para ver os comandos válidos.`
        ];
    }

    setTerminalHistory(prev => [...prev, ...response, ""]);
    setInputVal("");
  };

  const focusTerminalInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Holograma 3D Cibernético */}
      <div className="hero-3d-container">
        <ThreeDHeroObject />
      </div>

      <div className="hero-grid-layout">
        {/* Left Side: Copywriting */}
        <motion.div 
          className="hero-intro"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="hero-badge glass-effect">
            <span className="badge-dot"></span>
            <Activity size={14} className="pulse-icon" /> Disponível para Projetos Globais & Consultoria
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title">
            Segurança de Sistemas & <br />
            <span className="text-gradient">Desenvolvimento Full-Stack</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Aplico o rigor <strong>"Zero-Fault"</strong> da aviação no desenvolvimento de software de alta performance. De drivers de kernel eBPF em Rust a aplicações mobile FinTech e plataformas Web de grande escala.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <a href="#projects" className="btn-primary">
              <Briefcase size={18} /> Ver Projetos
            </a>
            <a href="/Biografia.pdf" target="_blank" rel="noreferrer" className="btn-secondary">
              <FileText size={18} /> Ver Currículo (PDF)
            </a>
            <a href="https://wa.me/351939060342?text=Ol%C3%A1%20William,%20estive%20a%20ver%20o%20teu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!" target="_blank" rel="noreferrer" className="btn-secondary whatsapp-btn">
              <MessageSquare size={18} /> WhatsApp
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="quick-stats-row glass-effect">
            <div className="stat-box">
              <h3>Rust & eBPF</h3>
              <p>Kernel & Security</p>
            </div>
            <div className="stat-box">
              <h3>Next.js 16</h3>
              <p>Web High-Speed</p>
            </div>
            <div className="stat-box">
              <h3>React Native</h3>
              <p>FinTech Mobile</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Terminal */}
        <motion.div 
          className="hero-interactive"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard maxTilt={6}>
            <div className="terminal-window" onClick={focusTerminalInput}>
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="t-btn close"></span>
                  <span className="t-btn minimize"></span>
                  <span className="t-btn maximize"></span>
                </div>
                <div className="terminal-title">
                  <Terminal size={14} className="terminal-title-icon" /> wgf-security-terminal.sh
                </div>
                <div className="terminal-status-light">
                  <Shield size={14} className="shield-icon" /> Secure OS
                </div>
              </div>
              <div className="terminal-body">
                <div className="terminal-output">
                  {terminalHistory.map((line, index) => (
                    <div key={index} className="terminal-line">
                      {line}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
                <form onSubmit={handleTerminalSubmit} className="terminal-prompt-form">
                  <span className="terminal-prompt">willan@wgf-tech:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="terminal-input"
                    placeholder="Digita um comando (ex: help, scan, skills)..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <button type="submit" style={{ display: 'none' }}>Enviar</button>
                </form>
              </div>
            </div>
          </TiltCard>
          <div className="terminal-hint">
            Dica: Experimenta digitar <span className="hint-code" onClick={() => setInputVal('scan')}>scan</span>, <span className="hint-code" onClick={() => setInputVal('skills')}>skills</span> ou <span className="hint-code" onClick={() => setInputVal('cv')}>cv</span> e pressiona Enter!
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

