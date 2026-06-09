import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, MessageSquare, Briefcase, ChevronRight } from 'lucide-react';
import './Hero.css';

function Hero() {
  const [terminalHistory, setTerminalHistory] = useState([
    "WGF OS v2.0.6 (Porto, Portugal)",
    "Initializing eBPF Kernel telemetry... ACTIVE",
    "Loading AI Security Threat detection engine... ACTIVE",
    "Type 'help' to see list of available commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll terminal to bottom
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
          "Comandos disponíveis:",
          "  scan      - Executa varredura de segurança simulada no sistema",
          "  projects  - Lista a stack tecnológica dos projetos da WGF",
          "  contact   - Mostra informações de contacto direto",
          "  clear     - Limpa o ecrã do terminal"
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setInputVal("");
        return;
      case 'contact':
        response = [
          `> ${inputVal}`,
          "Contactos Diretos da WGF Technologies:",
          "  - WhatsApp: +351 939 060 342",
          "  - E-mail: wgftechnologies@gmail.com",
          "  - LinkedIn: linkedin.com/in/william-fernandes-152506244",
          "  - Localização: Porto, Portugal"
        ];
        break;
      case 'projects':
        response = [
          `> ${inputVal}`,
          "Stack de Projetos Principais:",
          "  [1] NGAV & EDR Core: Rust, eBPF Kernel, Driver Ring-0, AI",
          "  [2] AI Site Shield: Next.js, FastAPI, Redis, Dramatiq, PostgreSQL",
          "  [3] WGF SenseOS: Wi-Fi Sensing, Gait Analysis, Coordenadas 3D (Z-axis)",
          "  [4] WGF Note IDE: Electron, React Native, Ollama AI, Python Sandbox",
          "  [5] Connect CPLP/STPway: React Native, Firebase Auth, reCAPTCHA Enterprise",
          "  [6] SUPER CKDO: Next.js 16, TypeScript, TailwindCSS, LCP Optimization",
          "  [7] CLMA Engenharia: React, Vite, Framer Motion, Radix UI",
          "  [8] EcoSEO Acquisition: Growth Strategy, Product Hunt launch automation"
        ];
        break;
      case 'scan':
        response = [
          `> ${inputVal}`,
          "[~] A iniciar varredura de segurança em WGF-Core...",
          "[~] A analisar ficheiros expostos e chaves privadas...",
          "[!] Alerta: Detetado NEXT_PUBLIC_API_KEY no frontend! (Corrigindo via Git Hook)",
          "[~] A validar assinaturas SHA de pacotes CI/CD...",
          "[+] Varredura concluída. 100% dos pacotes fixados. 0 vulnerabilidades ativas."
        ];
        break;
      default:
        response = [
          `> ${inputVal}`,
          `Comando não reconhecido: '${cmd}'. Digite 'help' para ajuda.`
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
            Disponível para Projetos Globais
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title">
            Segurança de Sistemas & <br />
            <span className="text-gradient">Desenvolvimento Full-Stack</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Aplico o rigor "Zero-Fault" da aviação no desenvolvimento de software de alta performance. De drivers de kernel eBPF em Rust a aplicações mobile FinTech e plataformas Web escaláveis.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <a href="#projects" className="btn-primary">
              <Briefcase size={18} /> Ver Projetos
            </a>
            <a href="https://wa.me/351939060342?text=Ol%C3%A1%20William,%20estive%20a%20ver%20o%20teu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!" target="_blank" rel="noreferrer" className="btn-secondary">
              <MessageSquare size={18} /> Conversar no WhatsApp
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="quick-stats-row glass-effect">
            <div className="stat-box">
              <h3>Rust & C</h3>
              <p>Kernel/Drivers</p>
            </div>
            <div className="stat-box">
              <h3>Next.js / TS</h3>
              <p>Web Premium</p>
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
                <Shield size={14} className="shield-icon" /> Secure
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
                  placeholder="Digita um comando..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button type="submit" style={{ display: 'none' }}>Enviar</button>
              </form>
            </div>
          </div>
          <div className="terminal-hint">
            Dica: Experimenta digitar <span className="hint-code">scan</span> ou <span className="hint-code">projects</span> e pressiona Enter!
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
