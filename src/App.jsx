import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Linkedin, Mail, MessageSquare, ArrowUp } from 'lucide-react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Timeline from './components/Timeline.jsx';
import SkillsMatrix from './components/SkillsMatrix.jsx';
import Showcase from './components/Showcase.jsx';
import Contact from './components/Contact.jsx';
import ThreeBackground from './components/ThreeBackground.jsx';

function App() {
  // Inicializar o tema a partir do localStorage ou padrão 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('wgf-portfolio-theme');
    return savedTheme ? savedTheme : 'dark';
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Efeito para sincronizar a classe do tema no elemento HTML raiz
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    localStorage.setItem('wgf-portfolio-theme', theme);
  }, [theme]);

  // Efeito para monitorizar o progresso do scroll na página
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/351939060342?text=Ol%C3%A1%20William,%20estive%20a%20ver%20o%20teu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";
  const githubUrl = "https://github.com/willan23";
  const linkedinUrl = "https://linkedin.com/in/william-fernandes-152506244";
  const emailUrl = "mailto:wgftechnologies@gmail.com";

  return (
    <div className="app-container">
      {/* Scroll Progress Bar Top */}
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Grid Pattern */}
      <div className="bg-grid"></div>
      
      {/* Glow Orbs */}
      <div className="bg-glow"></div>
      <div className="bg-glow-2"></div>

      {/* Interactive 3D Particles Background */}
      <ThreeBackground />

      <header className="main-header glass-effect">
        <div className="logo-container">
          <span className="logo-text">WGF <span className="logo-accent">Technologies</span></span>
        </div>
        <nav className="main-nav">
          <a href="#hero">Início</a>
          <a href="#about">Sobre Mim</a>
          <a href="#timeline">Trajetória</a>
          <a href="#skills">Competências</a>
          <a href="#projects">Projetos</a>
          <a href="#contact">Contacto</a>
          
          {/* Seletor Dinâmico de Tema */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Alternar Tema"
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="#contact" className="btn-primary">Fale Comigo</a>
        </nav>
      </header>
      
      <main>
        <Hero theme={theme} />
        <About theme={theme} />
        <Timeline theme={theme} />
        <SkillsMatrix theme={theme} />
        <Showcase theme={theme} />
        <Contact theme={theme} />
      </main>

      {/* Floating Action Buttons */}
      <div className="floating-actions-container">
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="floating-action-btn whatsapp-float-btn"
          title="Contacto Rápido no WhatsApp"
        >
          <MessageSquare size={22} />
        </a>

        {showBackToTop && (
          <button 
            onClick={scrollToTop} 
            className="floating-action-btn back-to-top-btn"
            title="Voltar ao Topo"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      <footer className="main-footer">
        <div className="footer-socials">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="footer-social-link" title="GitHub">
            <Github size={22} />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="footer-social-link" title="LinkedIn">
            <Linkedin size={22} />
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="footer-social-link" title="WhatsApp">
            <MessageSquare size={22} />
          </a>
          <a href={emailUrl} className="footer-social-link" title="E-mail">
            <Mail size={22} />
          </a>
        </div>
        <p>&copy; 2026 WGF Technologies. William Fernandes. Todos os direitos reservados.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>Porto, Portugal</p>
      </footer>
    </div>
  );
}

export default App;

