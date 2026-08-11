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
    timeline: {
      badge: "Rigor & Evolução Contínua",
      titleStart: "A Trajetória",
      titleGrad: "\"Zero-Fault Journey\"",
      desc: "Da precisão física da aviação ao desenvolvimento de sistemas críticos e cibersegurança avançada.",
      events: [
        {
          year: "2018 - 2021",
          title: "Engenharia Informática & Fundamentos de Sistemas",
          location: "São Tomé e Príncipe",
          badge: "Formação de Base",
          desc: "Desenvolvimento de uma base sólida em arquitetura de computadores, redes de comunicação, programação estruturada e engenharia de software.",
          highlights: ["Arquitetura de Sistemas", "Redes & Protocolos", "Programação Orientada a Objetos"]
        },
        {
          year: "2022 - 2024",
          title: "Técnico de Produção Aeronáutica (Nível 4)",
          location: "Porto, Portugal",
          badge: "Rigor Aeronáutico Zero-Fault",
          desc: "Produção de compósitos de fibra de carbono e vidro para transportes públicos de alta exigência. Aplicação de padrões industriais aeroespaciais onde o erro não é uma opção.",
          highlights: ["Processos Zero-Fault", "Engenharia de Compósitos", "Qualidade & Latência Zero"]
        },
        {
          year: "2024 - 2026",
          title: "Redes, Sistemas Informáticos & Cibersegurança Cisco",
          location: "Porto, Portugal",
          badge: "Certificação Cisco",
          desc: "Especialização em Gestão de Redes e Cibersegurança pela Cisco Networking Academy. Foco defensivo em segurança de infraestruturas críticas e eBPF no Kernel Linux.",
          highlights: ["Cisco Cybersecurity Certified", "Telemetria eBPF & Kernel Rust", "Análise de Tráfego Packet Tracer"]
        },
        {
          year: "2026+",
          title: "Fundador WGF Technologies & Ecossistema de Software",
          location: "Porto, Portugal & Global",
          badge: "Fundador & Inovação",
          desc: "Lançamento e consolidação de produtos proprietários de alta performance em Cibersegurança (NGAV/EDR), IoT/Sensoriamento Wi-Fi (SenseOS) e FinTech Mobile (STPway).",
          highlights: ["EDR Enterprise Rust", "SenseOS Wi-Fi Sensing ZKP", "FinTech STPway & SUPER CKDO"]
        }
      ]
    },
    skills: {
      badge: "Matriz de Especialização",
      titleStart: "Stack Tecnológico &",
      titleGrad: "Competências Clave",
      desc: "Combinando o rigor de linguagens compiladas de baixo nível com o dinamismo do ecossistema web moderno."
    },
    about: {
      badge: "Sobre o Fundador",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Engenheiro & Especialista",
      lead: "A minha jornada é definida por uma transição constante entre o rigor da engenharia física e a inovação em cibersegurança e sistemas digitais.",
      p1: "Nasci em São Tomé e Príncipe em 18 de março de 1997. Iniciei o meu percurso académico em Engenharia Informática (2018-2021), onde desenvolvi uma base sólida em arquitetura de sistemas e redes computacionais.",
      p2: "Em dezembro de 2022, mudei-me para Portugal para expandir as minhas capacidades técnicas. Formei-me como Técnico de Produção Aeronáutica (Nível 4) e assumi a responsabilidade pela produção de compósitos de fibra para a indústria de transporte público. Esta experiência no setor aeroespacial ensinou-me o valor prático da latência zero, precisão extrema e gestão de processos complexos.",
      p3: "Como autodidata focado em infraestrutura crítica, especializei-me em Gestão de Redes e Sistemas Computacionais, com certificações avançadas pela Cisco Networking Academy em Cybersecurity e Packet Tracer obtidas em 2026.",
      p4: "Atualmente, estou focado no crescimento da WGF Technologies. Se algum dos 22 projetos ou tecnologias desenvolvidas chamou a sua atenção, entre em contacto para adquirir a solução (código-fonte / licença), contratar consultoria ou propor uma parceria estratégica de investimento.",
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
      copiedText: "Copiado! ✓",
      formTitle: "Enviar Mensagem Direta",
      namePlaceholder: "Seu Nome Completo",
      emailPlaceholder: "Seu E-mail Profissional",
      msgPlaceholder: "Como posso ajudar no seu projeto ou parceria?",
      sendBtn: "Enviar Mensagem",
      successMsg: "Mensagem enviada com sucesso! Responderei em breve."
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
    timeline: {
      badge: "Rigor & Continuous Growth",
      titleStart: "The Track Record",
      titleGrad: "\"Zero-Fault Journey\"",
      desc: "From physical aviation precision to critical systems development and advanced cybersecurity.",
      events: [
        {
          year: "2018 - 2021",
          title: "Computer Engineering & Systems Foundations",
          location: "São Tomé and Príncipe",
          badge: "Foundational Education",
          desc: "Built a solid foundation in computer architecture, networking protocols, structured programming, and software engineering.",
          highlights: ["Systems Architecture", "Networks & Protocols", "Object-Oriented Programming"]
        },
        {
          year: "2022 - 2024",
          title: "Aeronautical Production Specialist (Level 4)",
          location: "Porto, Portugal",
          badge: "Zero-Fault Aviation Rigor",
          desc: "Manufactured carbon and glass fiber composites for high-demand public transit fleets. Enforced aerospace industrial standards where errors are not an option.",
          highlights: ["Zero-Fault Workflows", "Composites Engineering", "Zero-Latency Quality Standards"]
        },
        {
          year: "2024 - 2026",
          title: "Networks, Systems & Cisco Cybersecurity",
          location: "Porto, Portugal",
          badge: "Cisco Certified",
          desc: "Specialization in Network Management and Cybersecurity at Cisco Networking Academy. Defensively focused on critical infrastructure security and Linux Kernel eBPF.",
          highlights: ["Cisco Cybersecurity Certified", "eBPF Telemetry & Rust Kernel", "Packet Tracer Network Analysis"]
        },
        {
          year: "2026+",
          title: "Founder WGF Technologies & Software Ecosystem",
          location: "Porto, Portugal & Global",
          badge: "Founder & Innovation",
          desc: "Launch and expansion of high-performance proprietary software in Cybersecurity (NGAV/EDR), IoT/Wi-Fi Sensing (SenseOS), and FinTech Mobile (STPway).",
          highlights: ["EDR Enterprise Rust", "SenseOS Wi-Fi Sensing ZKP", "FinTech STPway & SUPER CKDO"]
        }
      ]
    },
    skills: {
      badge: "Specialization Matrix",
      titleStart: "Tech Stack &",
      titleGrad: "Core Competencies",
      desc: "Combining the rigor of low-level compiled languages with the speed and flexibility of modern web engineering."
    },
    about: {
      badge: "About the Founder",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Engineer & Specialist",
      lead: "My journey is defined by a continuous transition between physical engineering precision and digital systems & cybersecurity innovation.",
      p1: "Born in São Tomé and Príncipe on March 18, 1997. I started my academic path in Computer Engineering (2018-2021), developing deep skills in computer systems architecture and networking.",
      p2: "In December 2022, I relocated to Portugal to expand my engineering capabilities. I earned my certification as an Aeronautical Production Specialist (Level 4) and managed fiber composite production for the public transportation sector. This aerospace experience instilled the practical values of zero latency, extreme precision, and rigorous workflow control.",
      p3: "As a self-driven engineer focused on critical infrastructure, I specialized in Network Systems Management, obtaining advanced certifications from Cisco Networking Academy in Cybersecurity and Packet Tracer in 2026.",
      p4: "Currently, I lead product growth at WGF Technologies. If any of our 22 products or technologies caught your attention, feel free to reach out to acquire the code/license, hire engineering consulting, or propose a strategic investment partnership.",
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
      copiedText: "Copied! ✓",
      formTitle: "Send Direct Message",
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "Your Business Email",
      msgPlaceholder: "How can I assist with your project or partnership?",
      sendBtn: "Send Message",
      successMsg: "Message sent successfully! I will reply shortly."
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
    timeline: {
      badge: "Rigueur & Évolution Continue",
      titleStart: "Le Parcours",
      titleGrad: "\"Zero-Fault Journey\"",
      desc: "De la précision de l'aviation physique au développement de systèmes critiques et à la cybersécurité avancée.",
      events: [
        {
          year: "2018 - 2021",
          title: "Génie Informatique & Fondations des Systèmes",
          location: "São Tomé et Príncipe",
          badge: "Formation Fondamentale",
          desc: "Acquisition d'une solide base en architecture informatique, réseaux, programmation structurée et ingénierie logicielle.",
          highlights: ["Architecture Systèmes", "Réseaux & Protocoles", "Programmation Orientée Objet"]
        },
        {
          year: "2022 - 2024",
          title: "Spécialiste en Production Aéronautique (Niveau 4)",
          location: "Porto, Portugal",
          badge: "Rigueur Aéronautique Zero-Fault",
          desc: "Fabrication de composites carbone et verre pour le transport public à haute exigence. Application des normes aérospatiales où l'erreur n'est pas une option.",
          highlights: ["Processus Zero-Fault", "Ingénierie des Composites", "Qualité & Latence Zéro"]
        },
        {
          year: "2024 - 2026",
          title: "Réseaux, Systèmes Informatiques & Cybersécurité Cisco",
          location: "Porto, Portugal",
          badge: "Certification Cisco",
          desc: "Spécialisation en gestion de réseaux et cybersécurité à la Cisco Networking Academy. Focalisation sur la sécurité des infrastructures critiques et eBPF dans le noyau Linux.",
          highlights: ["Certifié Cisco Cybersecurity", "Télémétrie eBPF & Noyau Rust", "Analyse de Trafic Packet Tracer"]
        },
        {
          year: "2026+",
          title: "Fondateur WGF Technologies & Écosystème Logiciel",
          location: "Porto, Portugal & Global",
          badge: "Fondateur & Innovation",
          desc: "Lancement et développement de logiciels propriétaires haute performance en cybersécurité (NGAV/EDR), IoT/Sensoriement Wi-Fi (SenseOS) et FinTech Mobile (STPway).",
          highlights: ["EDR Enterprise Rust", "SenseOS Wi-Fi Sensing ZKP", "FinTech STPway & SUPER CKDO"]
        }
      ]
    },
    skills: {
      badge: "Matrice de Spécialisation",
      titleStart: "Stack Technique &",
      titleGrad: "Compétences Clés",
      desc: "Combinant la rigueur des langages compilés bas niveau avec l'agilité et la puissance de l'écosystème web moderne."
    },
    about: {
      badge: "À propos du Fondateur",
      titleStart: "Willan Da Graça Fernandes",
      titleGrad: "Ingénieur & Spécialiste",
      lead: "Mon parcours se définit par une transition continue entre la précision de l'ingénierie physique et l'innovation en cybersécurité et systèmes numériques.",
      p1: "Né à São Tomé et Príncipe le 18 mars 1997. J'ai débuté mon parcours académique en Génie Informatique (2018-2021), développant de solides compétences en architecture et réseaux.",
      p2: "En décembre 2022, je suis arrivé au Portugal pour développer mes capacités techniques. J'ai obtenu ma qualification de Spécialiste en Production Aéronautique (Niveau 4) et géré la production de composites pour les transports publics. Cette expérience aérospatiale m'a inculqué les valeurs de latence zéro, de précision extrême et de contrôle rigoureux des processus.",
      p3: "Ingénieur autodidacte axé sur les infrastructures critiques, je me suis spécialisé en gestion de réseaux informatiques, obtenant des certifications avancées de la Cisco Networking Academy en cybersécurité et Packet Tracer en 2026.",
      p4: "Actuellement, je dirige la croissance de WGF Technologies. Si l'un de nos 22 projets ou technologies a retenu votre attention, contactez-moi pour acquérir le code/licence, engager du conseil ou proposer un partenariat d'investissement.",
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
      copiedText: "Copié! ✓",
      formTitle: "Envoyer un Message Direct",
      namePlaceholder: "Votre Nom Complet",
      emailPlaceholder: "Votre E-mail Professionnel",
      msgPlaceholder: "Comment puis-je vous aider dans votre projet ou partenariat?",
      sendBtn: "Envoyer le Message",
      successMsg: "Message envoyé avec succès! Je vous répondrai sous peu."
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
