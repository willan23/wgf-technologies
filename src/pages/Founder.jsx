import React, { useEffect } from 'react';
import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { getPublicProducts } from '../data/products';
import PageHero from '../components/PageHero';
import { whatsappUrl } from '../lib/forms';

const founderBio = {
  paragraphs: [
    'Willan Da Graça Fernandes was born in São Tomé e Príncipe on 18 March 1997. He began Computer Engineering studies (2018–2021), building foundations in systems architecture and networks.',
    'In December 2022 he moved to Portugal and trained as an Aeronautical Production Technician (Level 4), working with fiber composites for public transport manufacturing — experience that reinforced precision and process discipline.',
    'He continues specializing in network and computer systems management, including Cisco Networking Academy cybersecurity coursework. He founded WGF Technologies to turn product development into market-ready technology businesses and is seeking partners and investment to scale.',
  ],
};

export default function Founder() {
  const { t } = useLanguage();
  const products = getPublicProducts();
  const { founder, contacts } = company;

  useEffect(() => {
    document.title = `Founder | ${company.name}`;
  }, []);

  return (
    <div>
      <PageHero title={t.founder.title} subtitle={t.founder.role} />
      <section className="section-block founder-layout">
        <div className="founder-photo-card glass-effect">
          <img src={company.assets.crest} alt="WGF crest" className="founder-crest" />
          <img src={founder.photo} alt={founder.name} className="founder-photo" />
          <h2>{founder.name}</h2>
          <p className="muted">{founder.role}</p>
        </div>
        <div className="content-stack">
          <article>
            <h3>{t.founder.backgroundTitle}</h3>
            {founderBio.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </article>
          <article>
            <h3>{t.founder.visionTitle}</h3>
            <p>{t.founder.vision}</p>
          </article>
          <article>
            <h3>{t.founder.productsTitle}</h3>
            <div className="chip-grid">
              {products.map((p) => (
                <span key={p.id} className="info-chip">
                  {p.name}
                </span>
              ))}
            </div>
          </article>
          <article>
            <h3>{t.founder.interestsTitle}</h3>
            <div className="chip-grid">
              {founder.interests.map((item) => (
                <span key={item} className="info-chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article>
            <h3>{t.founder.contactTitle}</h3>
            <div className="founder-links">
              <a href={`mailto:${contacts.email}`} className="btn-secondary">
                <Mail size={16} /> {contacts.email}
              </a>
              <a href={contacts.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={contacts.github} target="_blank" rel="noreferrer" className="btn-secondary">
                <Github size={16} /> GitHub
              </a>
              <a href={whatsappUrl('Hello Willan, I visited the WGF Founder page.')} target="_blank" rel="noreferrer" className="btn-secondary">
                <MessageSquare size={16} /> WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
