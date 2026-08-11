import React from 'react';
import { Award, ShieldAlert, Target, FileText, Phone } from 'lucide-react';
import './About.css';

function About() {
  const whatsappUrl = "https://wa.me/351939060342?text=Ol%C3%A1%20William,%20estive%20a%20ver%20o%20teu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";

  return (
    <section id="about" className="about-section">
      <div className="about-grid-layout">
        {/* Left Side: Profile Photo in Cyber Frame */}
        <div className="about-photo-wrapper">
          <div className="photo-frame glass-effect">
            <img 
              src="/image.png" 
              alt="Willan Fernandes" 
              className="profile-photo" 
            />
            <div className="frame-overlay-glow"></div>
            <div className="frame-border-corner top-left"></div>
            <div className="frame-border-corner top-right"></div>
            <div className="frame-border-corner bottom-left"></div>
            <div className="frame-border-corner bottom-right"></div>
          </div>
          <div className="photo-badges">
            <div className="photo-badge-item glass-effect">
              <Award size={18} color="var(--accent-cyan)" />
              <span>Cisco Certified</span>
            </div>
            <div className="photo-badge-item glass-effect">
              <Target size={18} color="var(--accent-green)" />
              <span>Aeronautics Rigor</span>
            </div>
          </div>
        </div>

        {/* Right Side: Structured Story */}
        <div className="about-details">
          <span className="about-tagline">A Minha Trajetória</span>
          <h2 className="section-title">
            Willan Da Graça Fernandes <br />
            <span className="text-gradient">Engenheiro & Especialista</span>
          </h2>
          
          <div className="about-text-content">
            <p className="lead-paragraph">
              A minha jornada é definida por uma transição constante entre o rigor da engenharia física e a inovação em cibersegurança e sistemas digitais.
            </p>
            <p>
              Nasci em São Tomé e Príncipe em 18 de março de 1997. Iniciei o meu percurso académico em **Engenharia Informática (2018-2021)**, onde desenvolvi uma base sólida em arquitetura de sistemas e redes computacionais.
            </p>
            <p>
              Em dezembro de 2022, mudei-me para **Portugal** para expandir as minhas capacidades técnicas. Formei-me como **Técnico de Produção Aeronáutica (Nível 4)** e assumi a responsabilidade pela produção de compósitos de fibra para a indústria de transporte público. Esta experiência no setor aeroespacial ensinou-me o valor prático da **latência zero, precisão extrema e gestão de processos complexos**.
            </p>
            <p>
              Como autodidata focado em infraestrutura crítica, especializei-me em **Gestão de Redes e Sistemas Computacionais**, com certificações avançadas pela **Cisco Networking Academy em Cybersecurity e Packet Tracer** obtidas em 2026.
            </p>
            <p className="highlight-paragraph">
              Atualmente, estou focado no crescimento da **WGF Technologies**. Se algum dos 22 projetos ou tecnologias desenvolvidas chamou a sua atenção, entre em contacto para **adquirir a solução (código-fonte / licença), contratar consultoria ou propor uma parceria estratégica de investimento**.
            </p>
          </div>

          <div className="about-actions">
            <a href="/Curriculo_Willan_Fernandes.pdf" target="_blank" rel="noreferrer" className="btn-primary">
              <FileText size={18} /> Ver Currículo Completo (PDF)
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              <Phone size={18} /> Contacto WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
