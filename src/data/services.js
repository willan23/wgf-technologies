/**
 * Software development & technology services catalog for WGF Technologies.
 * Structured with EN base and PT (pt-PT) / FR localizations, compatible with localize() / localizeList().
 */

export const SERVICE_TYPES = [
  {
    id: 'custom-software',
    label: {
      PT: 'Software à medida',
      EN: 'Custom Software',
      FR: 'Logiciel sur mesure',
    },
  },
  {
    id: 'saas-platform',
    label: {
      PT: 'Plataforma SaaS',
      EN: 'SaaS Platform',
      FR: 'Plateforme SaaS',
    },
  },
  {
    id: 'website',
    label: {
      PT: 'Website',
      EN: 'Website',
      FR: 'Site web',
    },
  },
  {
    id: 'mobile-app',
    label: {
      PT: 'Aplicação Mobile',
      EN: 'Mobile Application',
      FR: 'Application mobile',
    },
  },
  {
    id: 'ai-automation',
    label: {
      PT: 'Inteligência Artificial',
      EN: 'Artificial Intelligence',
      FR: 'Intelligence Artificielle',
    },
  },
  {
    id: 'system-integration',
    label: {
      PT: 'Integração de Sistemas',
      EN: 'System Integration',
      FR: 'Intégration de systèmes',
    },
  },
  {
    id: 'maintenance',
    label: {
      PT: 'Manutenção',
      EN: 'Maintenance',
      FR: 'Maintenance',
    },
  },
  {
    id: 'other',
    label: {
      PT: 'Outro projeto tecnológico',
      EN: 'Other technology project',
      FR: 'Autre projet technologique',
    },
  },
];

export const developmentServices = [
  {
    id: 'custom-software',
    serviceType: 'custom-software',
    icon: 'Code2',
    title: 'Custom Software Development',
    description:
      'We design and develop tailored software solutions for companies, startups and entrepreneurs.',
    items: [
      'Business management software',
      'Custom ERP and CRM systems',
      'Internal management applications',
      'Operational automation software',
      'Financial and administrative management systems',
      'Integrated enterprise platforms',
      'Desktop and web solutions',
    ],
    i18n: {
      PT: {
        title: 'Desenvolvimento de Software à Medida',
        description:
          'Concebemos e desenvolvemos soluções de software personalizadas para empresas, startups e empreendedores.',
        items: [
          'Software de gestão empresarial',
          'Sistemas ERP e CRM personalizados',
          'Aplicações de gestão interna',
          'Software de automação operacional',
          'Sistemas de gestão financeira e administrativa',
          'Plataformas empresariais integradas',
          'Soluções desktop e web',
        ],
      },
      FR: {
        title: 'Développement de Logiciels sur Mesure',
        description:
          'Nous concevons et développons des solutions logicielles personnalisées pour les entreprises, startups et entrepreneurs.',
        items: [
          'Logiciels de gestion d’entreprise',
          'Systèmes ERP et CRM personnalisés',
          'Applications de gestion interne',
          'Logiciels d’automatisation opérationnelle',
          'Systèmes de gestion financière et administrative',
          'Plateformes d’entreprise intégrées',
          'Solutions desktop et web',
        ],
      },
    },
  },
  {
    id: 'saas-platforms',
    serviceType: 'saas-platform',
    icon: 'Layers',
    title: 'SaaS Platform Development',
    description:
      'We build Software as a Service platforms, from initial conception through launch and product evolution.',
    items: [
      'B2B and B2C SaaS',
      'Multi-tenant platforms',
      'Subscription systems',
      'Payment gateway integration',
      'Customer and permission management',
      'Dashboards and analytics',
      'Scalable architectures and APIs',
    ],
    i18n: {
      PT: {
        title: 'Desenvolvimento de Plataformas SaaS',
        description:
          'Criamos plataformas Software as a Service, desde a conceção inicial até ao lançamento e evolução do produto.',
        items: [
          'SaaS B2B e B2C',
          'Plataformas multi-tenant',
          'Sistemas de subscrição',
          'Integração com gateways de pagamento',
          'Gestão de clientes e permissões',
          'Dashboards e analytics',
          'Arquiteturas escaláveis e APIs',
        ],
      },
      FR: {
        title: 'Développement de Plateformes SaaS',
        description:
          'Nous créons des plateformes Software as a Service, de la conception initiale au lancement et à l’évolution du produit.',
        items: [
          'SaaS B2B et B2C',
          'Plateformes multi-tenant',
          'Systèmes d’abonnement',
          'Intégration de passerelles de paiement',
          'Gestion des clients et des permissions',
          'Tableaux de bord et analytics',
          'Architectures scalables et APIs',
        ],
      },
    },
  },
  {
    id: 'websites',
    serviceType: 'website',
    icon: 'Globe',
    title: 'Website Development',
    description:
      'Development of professional, fast, responsive websites built for commercial growth.',
    items: [
      'Corporate websites',
      'Business websites',
      'Landing pages',
      'Client portals',
      'E-commerce',
      'Custom web platforms',
      'Technical SEO and performance optimization',
    ],
    i18n: {
      PT: {
        title: 'Desenvolvimento de Websites',
        description:
          'Desenvolvimento de websites profissionais, rápidos, responsivos e preparados para crescimento comercial.',
        items: [
          'Websites institucionais',
          'Websites empresariais',
          'Landing pages',
          'Portais de clientes',
          'Comércio eletrónico',
          'Plataformas web personalizadas',
          'SEO técnico e otimização de desempenho',
        ],
      },
      FR: {
        title: 'Développement de Sites Web',
        description:
          'Développement de sites web professionnels, rapides, responsives et préparés pour la croissance commerciale.',
        items: [
          'Sites institutionnels',
          'Sites d’entreprise',
          'Landing pages',
          'Portails clients',
          'Commerce électronique',
          'Plateformes web personnalisées',
          'SEO technique et optimisation des performances',
        ],
      },
    },
  },
  {
    id: 'mobile-webapps',
    serviceType: 'mobile-app',
    icon: 'Smartphone',
    title: 'Mobile Applications & Web Apps',
    description:
      'Development of digital applications for Android, iOS and modern web browsers.',
    items: [
      'Mobile applications',
      'Progressive Web Apps',
      'Enterprise applications',
      'Authentication systems',
      'Notifications and communication',
      'External API integrations',
      'Administrative dashboards',
    ],
    i18n: {
      PT: {
        title: 'Aplicações Mobile e Web Apps',
        description:
          'Desenvolvimento de aplicações digitais para Android, iOS e navegadores.',
        items: [
          'Aplicações móveis',
          'Progressive Web Apps',
          'Aplicações empresariais',
          'Sistemas de autenticação',
          'Notificações e comunicação',
          'Integrações com APIs externas',
          'Painéis administrativos',
        ],
      },
      FR: {
        title: 'Applications Mobiles et Web Apps',
        description:
          'Développement d’applications numériques pour Android, iOS et navigateurs web.',
        items: [
          'Applications mobiles',
          'Progressive Web Apps',
          'Applications d’entreprise',
          'Systèmes d’authentification',
          'Notifications et communication',
          'Intégrations avec des APIs externes',
          'Panneaux d’administration',
        ],
      },
    },
  },
  {
    id: 'ai-automation',
    serviceType: 'ai-automation',
    icon: 'Bot',
    title: 'Artificial Intelligence & Automation',
    description:
      'We build solutions focused on process automation and business intelligence.',
    items: [
      'Custom chatbots',
      'AI agents',
      'Task automation',
      'Large language model integration',
      'Intelligent document analysis',
      'Enterprise virtual assistants',
      'Integration with existing systems',
    ],
    i18n: {
      PT: {
        title: 'Inteligência Artificial e Automação',
        description:
          'Criamos soluções orientadas para automatização e inteligência empresarial.',
        items: [
          'Chatbots personalizados',
          'Agentes de IA',
          'Automação de tarefas',
          'Integração de modelos de linguagem',
          'Análise inteligente de documentos',
          'Assistentes virtuais empresariais',
          'Integrações com sistemas existentes',
        ],
      },
      FR: {
        title: 'Intelligence Artificielle et Automatisation',
        description:
          'Nous créons des solutions orientées vers l’automatisation et l’intelligence d’entreprise.',
        items: [
          'Chatbots personnalisés',
          'Agents d’IA',
          'Automatisation des tâches',
          'Intégration de modèles de langage',
          'Analyse intelligente de documents',
          'Assistants virtuels d’entreprise',
          'Intégrations avec les systèmes existants',
        ],
      },
    },
  },
  {
    id: 'apis-modernization',
    serviceType: 'system-integration',
    icon: 'Network',
    title: 'APIs, Integrations & Modernization',
    description:
      'Development, modernization and integration of technology systems.',
    items: [
      'REST and GraphQL APIs',
      'External system integrations',
      'Legacy application modernization',
      'Database migration and integration',
      'Payment integration',
      'Business workflow automation',
      'Performance and security optimization',
    ],
    i18n: {
      PT: {
        title: 'APIs, Integrações e Modernização',
        description:
          'Desenvolvimento e integração de sistemas tecnológicos.',
        items: [
          'APIs REST e GraphQL',
          'Integrações com sistemas externos',
          'Modernização de aplicações existentes',
          'Migração e integração de bases de dados',
          'Integração de pagamentos',
          'Automação de fluxos empresariais',
          'Otimização de desempenho e segurança',
        ],
      },
      FR: {
        title: 'APIs, Intégrations et Modernisation',
        description:
          'Développement et intégration de systèmes technologiques.',
        items: [
          'APIs REST et GraphQL',
          'Intégrations avec des systèmes externes',
          'Modernisation d’applications existantes',
          'Migration et intégration de bases de données',
          'Intégration de paiements',
          'Automatisation des flux métiers',
          'Optimisation des performances et de la sécurité',
        ],
      },
    },
  },
  {
    id: 'maintenance-evolution',
    serviceType: 'maintenance',
    icon: 'Wrench',
    title: 'Maintenance & Technological Evolution',
    description:
      'Ongoing technical support and evolution services, available under contract.',
    items: [
      'Bug fixing',
      'Application updates',
      'Technical monitoring',
      'Infrastructure optimization',
      'Security improvements',
      'Feature evolution',
      'Maintenance plans',
    ],
    i18n: {
      PT: {
        title: 'Manutenção e Evolução Tecnológica',
        description:
          'Disponibilizamos serviços de suporte contínuo, mediante contrato.',
        items: [
          'Correção de bugs',
          'Atualizações de aplicações',
          'Monitorização técnica',
          'Otimização de infraestrutura',
          'Melhorias de segurança',
          'Evolução de funcionalidades',
          'Planos de manutenção',
        ],
      },
      FR: {
        title: 'Maintenance et Évolution Technologique',
        description:
          'Services de support continu et d’évolution applicative, sur contrat.',
        items: [
          'Correction de bugs',
          'Mises à jour d’applications',
          'Surveillance technique',
          'Optimisation de l’infrastructure',
          'Améliorations de sécurité',
          'Évolution des fonctionnalités',
          'Plans de maintenance',
        ],
      },
    },
  },
];

export const commercialProcess = [
  {
    id: 'step-01',
    number: '01',
    title: 'Tell us your idea',
    description:
      'You share the objective, challenge or project you want to develop.',
    i18n: {
      PT: {
        title: 'Conte-nos a sua ideia',
        description:
          'O cliente apresenta o objetivo, problema ou projeto que pretende desenvolver.',
      },
      FR: {
        title: 'Parlez-nous de votre idée',
        description:
          'Le client présente l’objectif, le problème ou le projet qu’il souhaite développer.',
      },
    },
  },
  {
    id: 'step-02',
    number: '02',
    title: 'Analysis & Planning',
    description:
      'We evaluate requirements, technical feasibility, architecture and operational needs.',
    i18n: {
      PT: {
        title: 'Análise e Planeamento',
        description:
          'Avaliamos requisitos, viabilidade técnica, arquitetura e necessidades.',
      },
      FR: {
        title: 'Analyse et Planification',
        description:
          'Nous évaluons les besoins, la faisabilité technique, l’architecture et les exigences.',
      },
    },
  },
  {
    id: 'step-03',
    number: '03',
    title: 'Tailored Proposal',
    description:
      'We present a proposal defining scope, deliverables, cost estimate and timeline.',
    i18n: {
      PT: {
        title: 'Proposta Personalizada',
        description:
          'Apresentamos uma proposta com âmbito, entregáveis, estimativa de custos e cronograma.',
      },
      FR: {
        title: 'Proposition Personnalisée',
        description:
          'Nous présentons une proposition détaillant le périmètre, les livrables, l’estimation des coûts et le calendrier.',
      },
    },
  },
  {
    id: 'step-04',
    number: '04',
    title: 'Development & Validation',
    description:
      'We implement the solution with testing, structured reviews and ongoing alignment.',
    i18n: {
      PT: {
        title: 'Desenvolvimento e Validação',
        description:
          'Implementamos a solução com testes, revisões e acompanhamento.',
      },
      FR: {
        title: 'Développement et Validation',
        description:
          'Nous implémentons la solution avec des tests, des revues et un suivi régulier.',
      },
    },
  },
  {
    id: 'step-05',
    number: '05',
    title: 'Delivery & Evolution',
    description:
      'We deploy the solution and, when contracted, provide support and evolutionary maintenance.',
    i18n: {
      PT: {
        title: 'Entrega e Evolução',
        description:
          'Disponibilizamos a solução e, quando contratado, suporte e manutenção evolutiva.',
      },
      FR: {
        title: 'Livraison et Évolution',
        description:
          'Nous mettons la solution en service et, sur contrat, assurons le support et la maintenance évolutive.',
      },
    },
  },
];

export const serviceDifferentiators = [
  {
    id: 'custom-dev',
    title: 'Tailored development',
    description: 'Software designed around your operational workflows and business model rather than generic templates.',
    i18n: {
      PT: {
        title: 'Desenvolvimento personalizado',
        description: 'Software desenhado à medida dos processos e objetivos da sua organização, sem soluções genéricas.',
      },
      FR: {
        title: 'Développement personnalisé',
        description: 'Logiciels conçus autour des processus et objectifs de votre organisation, sans modèles génériques.',
      },
    },
  },
  {
    id: 'scalable-arch',
    title: 'Modern & scalable architectures',
    description: 'Modular codebases, clean APIs and cloud-ready foundations prepared to grow with demand.',
    i18n: {
      PT: {
        title: 'Arquiteturas modernas e escaláveis',
        description: 'Bases de código modulares, APIs bem definidas e fundações preparadas para crescer com o negócio.',
      },
      FR: {
        title: 'Architectures modernes et scalables',
        description: 'Bases de code modulaires, APIs claires et fondations prêtes à évoluer avec votre activité.',
      },
    },
  },
  {
    id: 'security-by-design',
    title: 'Security by design',
    description: 'Authentication, access control, input validation and data protection considered from initial architecture.',
    i18n: {
      PT: {
        title: 'Segurança desde a conceção',
        description: 'Autenticação, controlo de acessos, validação rigorosa e proteção de dados integrados desde a arquitetura inicial.',
      },
      FR: {
        title: 'Sécurité dès la conception',
        description: 'Authentification, contrôle d’accès, validation des données et protection intégrés dès l’architecture initiale.',
      },
    },
  },
  {
    id: 'system-integration',
    title: 'Integration with existing systems',
    description: 'Connection with ERPs, CRMs, payment gateways, databases and third-party APIs already used by your team.',
    i18n: {
      PT: {
        title: 'Integração com sistemas existentes',
        description: 'Ligação fluida com ERPs, CRMs, gateways de pagamento, bases de dados e serviços externos já utilizados.',
      },
      FR: {
        title: 'Intégration avec les systèmes existants',
        description: 'Connexion fluide avec vos ERP, CRM, passerelles de paiement, bases de données et services tiers.',
      },
    },
  },
  {
    id: 'ai-automation',
    title: 'Artificial intelligence & automation',
    description: 'Practical AI agents, LLM workflows and process automation where they generate measurable operational efficiency.',
    i18n: {
      PT: {
        title: 'Inteligência artificial e automação',
        description: 'Agentes de IA, modelos de linguagem e automação aplicados de forma prática para reduzir tarefas manuais.',
      },
      FR: {
        title: 'Intelligence artificielle et automatisation',
        description: 'Agents d’IA, modèles de langage et automatisation appliqués concrètement pour réduire les tâches manuelles.',
      },
    },
  },
  {
    id: 'transparent-comms',
    title: 'Transparent communication',
    description: 'Direct technical communication, clear scope definitions and regular progress checkpoints.',
    i18n: {
      PT: {
        title: 'Comunicação transparente',
        description: 'Alinhamento direto, definição clara de âmbito e pontos de situação regulares ao longo do projeto.',
      },
      FR: {
        title: 'Communication transparente',
        description: 'Échanges directs, définition claire du périmètre et points d’étape réguliers tout au long du projet.',
      },
    },
  },
  {
    id: 'continuous-evolution',
    title: 'Continuous evolution capability',
    description: 'Systems structured so new features, integrations and maintenance can be added sustainably over time.',
    i18n: {
      PT: {
        title: 'Possibilidade de evolução contínua',
        description: 'Sistemas estruturados para receber novas funcionalidades, melhorias e manutenção evolutiva a longo prazo.',
      },
      FR: {
        title: 'Possibilité d’évolution continue',
        description: 'Systèmes structurés pour accueillir de nouvelles fonctionnalités et une maintenance évolutive sur le long terme.',
      },
    },
  },
  {
    id: 'goal-aligned',
    title: 'Solutions adapted to client objectives',
    description: 'Technical decisions guided by the concrete commercial, operational and budget context of each project.',
    i18n: {
      PT: {
        title: 'Soluções adaptadas aos objetivos do cliente',
        description: 'Decisões técnicas orientadas pelo contexto comercial, operacional e funcional de cada projeto.',
      },
      FR: {
        title: 'Solutions adaptées aux objectifs du client',
        description: 'Décisions techniques guidées par le contexte commercial, opérationnel et fonctionnel de chaque projet.',
      },
    },
  },
];

export const servicesFaq = [
  {
    id: 'faq-pricing',
    question: 'How is project pricing determined?',
    answer:
      'Costs depend on technical requirements, functional scope, integrations and complexity. We do not publish fixed prices without prior technical evaluation: after analyzing your requirements, we present a tailored proposal detailing scope, deliverables and estimated investment.',
    i18n: {
      PT: {
        question: 'Como são calculados os preços de um projeto?',
        answer:
          'Os custos dependem dos requisitos técnicos, do âmbito funcional, das integrações necessárias e da complexidade da solução. Não apresentamos preços fechados sem avaliação técnica prévia: após análise dos requisitos, elaboramos uma proposta personalizada com âmbito, entregáveis e estimativa de custos.',
      },
      FR: {
        question: 'Comment les coûts d’un projet sont-ils déterminés ?',
        answer:
          'Les coûts dépendent des exigences techniques, du périmètre fonctionnel, des intégrations et de la complexité. Nous ne fixons pas de tarifs sans évaluation technique préalable : après analyse de vos besoins, nous présentons une proposition personnalisée.',
      },
    },
  },
  {
    id: 'faq-timelines',
    question: 'What are the typical delivery timelines?',
    answer:
      'Delivery timelines depend on project scope, technical complexity and validation phases. Every proposal includes a realistic schedule organized by milestones, defined after technical assessment of the requirements.',
    i18n: {
      PT: {
        question: 'Quais são os prazos habituais de desenvolvimento?',
        answer:
          'Os prazos dependem da dimensão, dos requisitos técnicos e das fases de validação de cada projeto. Cada proposta inclui um cronograma realista estruturado por etapas, definido após a análise técnica dos requisitos.',
      },
      FR: {
        question: 'Quels sont les délais de livraison habituels ?',
        answer:
          'Les délais dépendent de l’ampleur du projet, des exigences techniques et des phases de validation. Chaque proposition inclut un calendrier structuré par étapes, défini après l’évaluation technique.',
      },
    },
  },
  {
    id: 'faq-ip',
    question: 'Who owns the source code and intellectual property?',
    answer:
      'Intellectual property and source code ownership are defined contractually according to the agreed project model. For custom software commissioned by the client, the contract sets out the assignment or licensing terms clearly before development begins.',
    i18n: {
      PT: {
        question: 'A quem pertence o código-fonte e a propriedade intelectual?',
        answer:
          'A titularidade do código-fonte e da propriedade intelectual é definida contratualmente em função do modelo de projeto acordado. Nos projetos desenvolvidos à medida, os termos de titularidade, entrega de código ou licenciamento ficam expressamente estabelecidos na proposta e no contrato.',
      },
      FR: {
        question: 'À qui appartiennent le code source et la propriété intellectuelle ?',
        answer:
          'La propriété intellectuelle et la titularité du code source sont définies contractuellement selon le modèle de projet convenu. Les conditions de cession ou de licence sont établies clairement avant le début du développement.',
      },
    },
  },
  {
    id: 'faq-maintenance',
    question: 'Do you provide maintenance and support after launch?',
    answer:
      'Yes. We offer ongoing maintenance and technological evolution services under contract, covering bug fixes, security updates, technical monitoring, infrastructure optimization and new feature development.',
    i18n: {
      PT: {
        question: 'Disponibilizam manutenção e suporte após a entrega?',
        answer:
          'Sim. Disponibilizamos serviços de manutenção e evolução tecnológica mediante contrato, incluindo correção de bugs, atualizações de segurança, monitorização técnica, otimização de infraestrutura e evolução de funcionalidades.',
      },
      FR: {
        question: 'Proposez-vous la maintenance et le support après la mise en ligne ?',
        answer:
          'Oui. Nous proposons des services de maintenance et d’évolution technologique sur contrat, incluant correction de bugs, mises à jour de sécurité, surveillance technique et développement de nouvelles fonctionnalités.',
      },
    },
  },
  {
    id: 'faq-technologies',
    question: 'What technologies and architectures do you use?',
    answer:
      'We select the technology stack according to the project requirements — including modern web applications (React, Next.js, TypeScript, Node.js, Python), mobile apps, relational and cloud databases, REST and GraphQL APIs, payment integrations (such as Stripe) and AI/LLM automation.',
    i18n: {
      PT: {
        question: 'Que tecnologias são utilizadas nos projetos?',
        answer:
          'Selecionamos a stack tecnológica de acordo com os requisitos de cada solução — incluindo aplicações web modernas (React, Next.js, TypeScript, Node.js, Python), aplicações móveis, bases de dados relacionais e cloud, APIs REST e GraphQL, integração de pagamentos e soluções de IA e automação.',
      },
      FR: {
        question: 'Quelles technologies utilisez-vous ?',
        answer:
          'Nous sélectionnons la stack technologique selon les besoins du projet — applications web modernes (React, Next.js, TypeScript, Node.js, Python), applications mobiles, bases de données cloud, APIs REST/GraphQL, paiements et IA.',
      },
    },
  },
];

export function serviceTypeLabel(id, lang = 'PT') {
  const found = SERVICE_TYPES.find((s) => s.id === id);
  if (!found) return id;
  return found.label[lang] || found.label.PT;
}
