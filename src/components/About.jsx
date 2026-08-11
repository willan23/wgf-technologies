import React from 'react';
import { Award, ShieldAlert, Target, FileText, Phone } from 'lucide-react';
import './About.css';
import { useLanguage } from '../context/LanguageContext.jsx';

function About() {
  const { t } = useLanguage();
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
          <span className="about-tagline">{t.about.badge}</span>
          <h2 className="section-title">
            {t.about.titleStart} <br />
            <span className="text-gradient">{t.about.titleGrad}</span>
          </h2>
          
          <div className="about-text-content">
            <p className="lead-paragraph">
              {t.about.lead}
            </p>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p className="highlight-paragraph">{t.about.p4}</p>
          </div>

          <div className="about-actions">
            <a href="/Curriculo_Willan_Fernandes.pdf" target="_blank" rel="noreferrer" className="btn-primary">
              <FileText size={18} /> {t.about.btnCV}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              <Phone size={18} /> {t.about.btnContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
