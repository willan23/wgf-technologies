import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import { whatsappUrl } from '../lib/forms';

export default function Contact() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const initialType = params.get('type') || 'general';
  const [copied, setCopied] = useState('');
  const { contacts } = company;

  useEffect(() => {
    document.title = `Contact | ${company.name}`;
  }, []);

  const copy = async (value, key) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      <PageHero title={t.contact.title} subtitle={t.contact.body} />
      <section className="section-block two-col">
        <div className="contact-methods">
          <a className="contact-card glass-effect" href={whatsappUrl('Hello WGF Technologies')}>
            <MessageSquare />
            <div>
              <span>{t.contact.whatsapp}</span>
              <strong>{contacts.phoneDisplay}</strong>
            </div>
            <button type="button" className="contact-copy-btn" onClick={(e) => { e.preventDefault(); copy(contacts.phoneDisplay, 'phone'); }}>
              {copied === 'phone' ? t.contact.copied : t.contact.copy}
            </button>
          </a>
          <a className="contact-card glass-effect" href={`mailto:${contacts.email}`}>
            <Mail />
            <div>
              <span>{t.contact.emailLabel}</span>
              <strong>{contacts.email}</strong>
            </div>
            <button type="button" className="contact-copy-btn" onClick={(e) => { e.preventDefault(); copy(contacts.email, 'email'); }}>
              {copied === 'email' ? t.contact.copied : t.contact.copy}
            </button>
          </a>
          <a className="contact-card glass-effect" href={contacts.linkedin} target="_blank" rel="noreferrer">
            <Linkedin />
            <div>
              <span>LinkedIn</span>
              <strong>William Fernandes</strong>
            </div>
          </a>
          <a className="contact-card glass-effect" href={contacts.github} target="_blank" rel="noreferrer">
            <Github />
            <div>
              <span>GitHub</span>
              <strong>willan23</strong>
            </div>
          </a>
        </div>
        <ContactForm defaultType={initialType} />
      </section>
    </div>
  );
}
