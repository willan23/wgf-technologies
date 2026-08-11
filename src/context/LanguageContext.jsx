import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  PT: {
    nav: {
      home: "Início",
      about: "Sobre Mim",
      timeline: "Trajetória",
      skills: "Competências",
      projects: "Projetos",
      contact: "Contacto",
      talkBtn: "Fale Comigo"
    },
    hero: {
      badge: "Disponível para Projetos Globais & Consultoria",
      titleStart: "Segurança de Sistemas &",
      titleGrad: "Desenvolvimento Full-Stack",
      subtitle: "Aplico o rigor \"Zero-Fault\" da aviação no desenvolvimento de software de alta performance. De drivers de kernel eBPF em Rust a aplicações mobile FinTech e plataformas Web de grande escala.",
      btnProjects: "Ver Projetos",
      btnCV: "Ver Currículo (PDF)",
      btnWhatsApp: "WhatsApp",
      terminalTitle: "wgf-security-terminal.sh",
      terminalHint: "Dica: Experimenta digitar <span class=\"hint-code\">scan</span>, <span class=\"hint-code\">skills</span> ou <span class=\"hint-code\">cv</span> e pressiona Enter!"
    },
    showcase: {
      badge: "Eng. de Software & Cibersegurança",
      titleStart: "Projetos de",
      titleGrad: "Alta Engenharia & Inovação",
      desc: "Portfólio com 22 sistemas de grau industrial desenvolvidos com rigor aeronáutico \"Zero-Fault\", de Drivers Ring-0 a Inteligência Artificial e FinTech.",
      metric1: "Sistemas Deploiados",
      metric2: "Latência Kernel eBPF",
      metric3: "Segurança Proativa",
      metric4: "Áreas de Especialidade",
      categories: {
        all: "Todos",
        cyber: "Cibersegurança & Kernel",
        ai: "IA & Agentes Autónomos",
        iot: "Sistemas & IoT",
        fintech: "FinTech & Mobile",
        web: "Web Apps & Retalho",
        cloud: "Cloud & Growth"
      },
      cardButton: "Ver Caso de Estudo",
      modal: {
        challenge: "O Desafio Técnico",
        solution: "Arquitetura & Solução",
        results: "Resultados de Impacto",
        commercialTitle: "🤝 Aquisição de Projeto ou Parceria Estratégica",
        commercialDesc: "Interessado nesta solução? Este projeto está disponível para aquisição (código-fonte / licença comercial) ou para estabelecimento de parcerias de investimento e joint-venture.",
        btnBuy: "Comprar / Adquirir Projeto",
        btnPartner: "Propor Parceria",
        btnClose: "Fechar"
      }
    },
    skills: {
      badge: "Matriz de Especialização",
      titleStart: "Stack Tecnológico &",
      titleGrad: "Competências Clave"
    },
    about: {
      badge: "Sobre o Fundador",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Engenheiro & Especialista",
      lead: "A minha jornada é definida por uma transição constante entre o rigor da engenharia física e a inovação em cibersegurança e sistemas digitais.",
      btnCV: "Ver Currículo Completo (PDF)",
      btnContact: "Contacto WhatsApp"
    },
    contact: {
      titleStart: "Aquisição de Projetos &",
      titleGrad: "Parcerias Estratégicas",
      desc: "Se algum dos 22 projetos chamou a sua atenção, entre em contacto direto. Todos os sistemas estão disponíveis para compra de código-fonte, licenciamento comercial ou parcerias de investimento.",
      whatsappLabel: "WhatsApp Direto",
      emailLabel: "Email Profissional",
      linkedinLabel: "Conectar no LinkedIn",
      copyBtn: "Copiar",
      copiedText: "Copiado! ✓"
    },
    footer: {
      rights: "© 2026 WGF Technologies. William Fernandes. Todos os direitos reservados.",
      location: "Porto, Portugal"
    }
  },
  EN: {
    nav: {
      home: "Home",
      about: "About Me",
      timeline: "Journey",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      talkBtn: "Get in Touch"
    },
    hero: {
      badge: "Available for Global Projects & Consulting",
      titleStart: "Systems Security &",
      titleGrad: "Full-Stack Development",
      subtitle: "I apply aviation's \"Zero-Fault\" rigor to high-performance software development. From eBPF Rust kernel drivers to FinTech mobile apps and large-scale web platforms.",
      btnProjects: "View Projects",
      btnCV: "View Resume (PDF)",
      btnWhatsApp: "WhatsApp",
      terminalTitle: "wgf-security-terminal.sh",
      terminalHint: "Tip: Try typing <span class=\"hint-code\">scan</span>, <span class=\"hint-code\">skills</span> or <span class=\"hint-code\">cv</span> and press Enter!"
    },
    showcase: {
      badge: "Software Eng. & Cybersecurity",
      titleStart: "High Engineering &",
      titleGrad: "Innovation Projects",
      desc: "Portfolio featuring 22 industrial-grade systems engineered with aviation 'Zero-Fault' standards, from Ring-0 Drivers to AI & FinTech.",
      metric1: "Deployed Systems",
      metric2: "eBPF Kernel Latency",
      metric3: "Proactive Defense",
      metric4: "Core Specialties",
      categories: {
        all: "All",
        cyber: "Cybersecurity & Kernel",
        ai: "AI & Autonomous Agents",
        iot: "Systems & IoT",
        fintech: "FinTech & Mobile",
        web: "Web Apps & Retail",
        cloud: "Cloud & Growth"
      },
      cardButton: "View Case Study",
      modal: {
        challenge: "Technical Challenge",
        solution: "Architecture & Solution",
        results: "Impact Results",
        commercialTitle: "🤝 Project Acquisition or Strategic Partnership",
        commercialDesc: "Interested in this solution? This project is available for acquisition (source code / commercial license) or joint-venture investment partnerships.",
        btnBuy: "Purchase / Acquire Project",
        btnPartner: "Propose Partnership",
        btnClose: "Close"
      }
    },
    skills: {
      badge: "Specialization Matrix",
      titleStart: "Tech Stack &",
      titleGrad: "Core Competencies"
    },
    about: {
      badge: "About the Founder",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Engineer & Specialist",
      lead: "My journey is defined by a continuous transition between physical engineering precision and digital systems & cybersecurity innovation.",
      btnCV: "View Full Resume (PDF)",
      btnContact: "WhatsApp Contact"
    },
    contact: {
      titleStart: "Project Acquisition &",
      titleGrad: "Strategic Partnerships",
      desc: "If any of the 22 projects caught your attention, feel free to reach out directly. All systems are available for source code purchase, commercial licensing, or investment partnerships.",
      whatsappLabel: "Direct WhatsApp",
      emailLabel: "Professional Email",
      linkedinLabel: "Connect on LinkedIn",
      copyBtn: "Copy",
      copiedText: "Copied! ✓"
    },
    footer: {
      rights: "© 2026 WGF Technologies. William Fernandes. All rights reserved.",
      location: "Porto, Portugal"
    }
  },
  FR: {
    nav: {
      home: "Accueil",
      about: "À propos",
      timeline: "Parcours",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      talkBtn: "Me Contacter"
    },
    hero: {
      badge: "Disponible pour Projets Globaux & Conseil",
      titleStart: "Sécurité des Systèmes &",
      titleGrad: "Développement Full-Stack",
      subtitle: "J'applique la rigueur \"Zero-Fault\" de l'aviation au développement de logiciels haute performance. Des pilotes de noyau eBPF en Rust aux applications mobiles FinTech et plateformes Web à grande échelle.",
      btnProjects: "Voir les Projets",
      btnCV: "Consulter le CV (PDF)",
      btnWhatsApp: "WhatsApp",
      terminalTitle: "wgf-security-terminal.sh",
      terminalHint: "Conseil: Essayez de taper <span class=\"hint-code\">scan</span>, <span class=\"hint-code\">skills</span> ou <span class=\"hint-code\">cv</span> puis faites Entrée!"
    },
    showcase: {
      badge: "Génie Logiciel & Cybersécurité",
      titleStart: "Haute Ingénierie &",
      titleGrad: "Projets d'Innovation",
      desc: "Portfolio présentant 22 systèmes industriels conçus selon la norme aéronautique 'Zero-Fault', des pilotes Ring-0 à l'IA et aux FinTechs.",
      metric1: "Systèmes Déployés",
      metric2: "Latence Noyau eBPF",
      metric3: "Défense Proactive",
      metric4: "Domaines de Spécialité",
      categories: {
        all: "Tous",
        cyber: "Cybersécurité & Noyau",
        ai: "IA & Agents Autonomes",
        iot: "Systèmes & IoT",
        fintech: "FinTech & Mobile",
        web: "Apps Web & Vente",
        cloud: "Cloud & Croissance"
      },
      cardButton: "Voir l'Étude de Cas",
      modal: {
        challenge: "Le Défi Technique",
        solution: "Architecture & Solution",
        results: "Résultats d'Impact",
        commercialTitle: "🤝 Acquisition de Projet ou Partenariat Stratégique",
        commercialDesc: "Intéressé par cette solution? Ce projet est disponible à l'acquisition (code source / licence commerciale) ou pour des partenariats d'investissement.",
        btnBuy: "Acheter / Acquérir le Projet",
        btnPartner: "Proposer un Partenariat",
        btnClose: "Fermer"
      }
    },
    skills: {
      badge: "Matrice de Spécialisation",
      titleStart: "Stack Technique &",
      titleGrad: "Compétences Clés"
    },
    about: {
      badge: "À propos du Fondateur",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Ingénieur & Spécialiste",
      lead: "Mon parcours se définit par une transition continue entre la précision de l'ingénierie physique et l'innovation en cybersécurité et systèmes numériques.",
      btnCV: "Consulter le CV Complet (PDF)",
      btnContact: "Contact WhatsApp"
    },
    contact: {
      titleStart: "Acquisition de Projets &",
      titleGrad: "Partenariats Stratégiques",
      desc: "Si l'un des 22 projets a retenu votre attention, contactez-moi directement. Tous les systèmes sont disponibles pour l'achat de code source, licences commerciales ou partenariats d'investissement.",
      whatsappLabel: "WhatsApp Direct",
      emailLabel: "E-mail Professionnel",
      linkedinLabel: "Se connecter sur LinkedIn",
      copyBtn: "Copier",
      copiedText: "Copié! ✓"
    },
    footer: {
      rights: "© 2026 WGF Technologies. William Fernandes. Tous droits réservés.",
      location: "Porto, Portugal"
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('wgf-portfolio-lang');
    return savedLang && translations[savedLang] ? savedLang : 'PT';
  });

  useEffect(() => {
    localStorage.setItem('wgf-portfolio-lang', lang);
  }, [lang]);

  const t = translations[lang] || translations.PT;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
