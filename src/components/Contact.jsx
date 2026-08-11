import React, { useState } from 'react';
import { Phone, Linkedin, Mail, Github, CheckCircle, Send, Loader2 } from 'lucide-react';
import './Contact.css';
import { useLanguage } from '../context/LanguageContext.jsx';

function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular o envio para o servidor
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Auto fechar a mensagem de sucesso após 7 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 7000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const whatsappUrl = "https://wa.me/351939060342?text=Ol%C3%A1%20William,%20estive%20a%20ver%20o%20teu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!";
  const githubUrl = "https://github.com/willan23";
  const linkedinUrl = "https://linkedin.com/in/william-fernandes-152506244";
  const emailUrl = "mailto:wgftechnologies@gmail.com";

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container glass-effect">
        {/* Left Side: Contact Information Cards */}
        <div className="contact-info">
          <h2 className="section-title">
            {t.contact.titleStart} <br />
            <span className="text-gradient">{t.contact.titleGrad}</span>
          </h2>
          <p className="section-desc">
            {t.contact.desc}
          </p>
          
          <div className="contact-methods">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Phone size={24} color="var(--accent-green)" />
              </div>
              <div className="contact-card-text">
                <span>{t.contact.whatsappLabel}</span>
                <strong>+351 939 060 342</strong>
              </div>
              <button 
                onClick={(e) => copyToClipboard('+351 939 060 342', 'phone', e)}
                className="contact-copy-btn"
                title="Copiar Telefone"
              >
                {copiedField === 'phone' ? t.contact.copiedText : t.contact.copyBtn}
              </button>
            </a>
            
            <a href={emailUrl} className="contact-card">
              <div className="contact-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Mail size={24} color="var(--accent-gold)" />
              </div>
              <div className="contact-card-text">
                <span>{t.contact.emailLabel}</span>
                <strong>wgftechnologies@gmail.com</strong>
              </div>
              <button 
                onClick={(e) => copyToClipboard('wgftechnologies@gmail.com', 'email', e)}
                className="contact-copy-btn"
                title="Copiar Email"
              >
                {copiedField === 'email' ? t.contact.copiedText : t.contact.copyBtn}
              </button>
            </a>
            
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Linkedin size={24} color="var(--accent-blue)" />
              </div>
              <div className="contact-card-text">
                <span>{t.contact.linkedinLabel}</span>
                <strong>William Fernandes</strong>
              </div>
            </a>

            <a href={githubUrl} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon-wrapper" style={{ background: 'rgba(243, 244, 246, 0.1)' }}>
                <Github size={24} className="github-icon-color" />
              </div>
              <div className="contact-card-text">
                <span>Repositórios GitHub</span>
                <strong>willan23</strong>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Stateful Contact Form */}
        <div className="contact-form-container">
          {submitSuccess ? (
            <div className="form-success-alert">
              <CheckCircle size={56} className="success-icon-anim" color="var(--accent-green)" />
              <h3>Mensagem Enviada!</h3>
              <p>Obrigado pelo contacto. Responderei o mais brevemente possível para iniciarmos a análise do teu projeto.</p>
              <div className="success-divider">ou</div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">
                <Phone size={18} /> Ping Direto no WhatsApp
              </a>
              <button onClick={() => setSubmitSuccess(false)} className="btn-secondary w-full justify-center" style={{ marginTop: '1rem' }}>
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Enviar Mensagem</h3>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="O teu nome" 
                  className="form-input" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="O teu e-mail" 
                  className="form-input" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Como posso ajudar no teu projeto ou negócio?" 
                  rows="4" 
                  className="form-input" 
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spinner-icon" /> A enviar...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
