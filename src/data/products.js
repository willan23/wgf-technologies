/**
 * Product publication rule:
 * Shown publicly only when public === true AND ready === true
 * AND status is one of: live | beta | mvp
 *
 * Incomplete products stay public:false / ready:false until ready to launch.
 */

import { localize } from './localize.js';

export const STATUS = {
  LIVE: 'live',
  BETA: 'beta',
  MVP: 'mvp',
  DEVELOPMENT: 'development',
  PRIVATE: 'private',
  ARCHIVED: 'archived',
};

export const products = [
  {
    id: 'connect-cplp',
    slug: 'connect-cplp',
    name: 'Connect-CPLP',
    url: 'https://connect-cplp.com',
    category: 'Digital Infrastructure / CPLP / Ecosystem',
    status: STATUS.LIVE,
    public: true,
    ready: true,
    markets: ['Lusophone Markets', 'Emerging Markets', 'Digital Economy'],
    businessModel: ['Marketplace', 'Transaction fees', 'B2C', 'B2B'],
    shortDescription:
      'A digital platform designed to connect people, businesses, opportunities and services across the Portuguese-speaking world.',
    valueProposition: 'Transfers and digital connections across the CPLP / PALOP space.',
    problem:
      'People and businesses across Portuguese-speaking countries need simpler ways to move value, discover opportunities and stay connected across borders.',
    solution:
      'Connect-CPLP provides a digital platform focused on transfers and connectivity for the PALOP / CPLP ecosystem, with a product experience designed for real users in those markets.',
    technology: [
      'Web application architecture',
      'Cloud-hosted delivery',
      'Secure authentication flows',
      'Payment / transfer integrations where enabled',
    ],
    targetMarket: {
      geography: ['CPLP / PALOP countries', 'Lusophone diaspora'],
      segments: ['Individuals', 'Small businesses', 'Cross-border users'],
      opportunity: 'Growing demand for digital services across Portuguese-speaking markets.',
    },
    roadmap: {
      completed: ['Public product website', 'Core transfer-oriented experience'],
      current: ['Product iteration based on real usage'],
      next: ['Broader ecosystem features', 'Partnership expansion'],
      future: ['Deeper regional coverage and service layers'],
    },
    disclaimer: null,
  },
  {
    id: 'mnemosyne-one',
    slug: 'mnemosyne-one',
    name: 'Mnemosyne One',
    url: 'https://mnemosyne-one.com',
    category: 'AI / Knowledge / Intelligence',
    status: STATUS.BETA,
    public: true,
    ready: true,
    markets: ['Artificial Intelligence', 'SaaS', 'Knowledge Work'],
    businessModel: ['SaaS', 'Subscription', 'B2C'],
    shortDescription:
      'An AI-oriented platform focused on intelligent knowledge, memory and digital interaction.',
    valueProposition: 'Capture thoughts, connect ideas and explore private knowledge in a living cognitive space.',
    problem:
      'Personal knowledge is fragmented across notes, chats and files, making it hard to reconnect ideas over time.',
    solution:
      'Mnemosyne One helps users store thoughts, link ideas and explore memory in a private cognitive workspace — currently available as a founder preview.',
    technology: [
      'AI-assisted knowledge interaction',
      'Private cognitive workspace',
      'Web application delivery',
      'Zero-knowledge oriented product positioning',
    ],
    targetMarket: {
      geography: ['Global', 'Europe', 'Lusophone Markets'],
      segments: ['Knowledge workers', 'Founders', 'Researchers', 'Creators'],
      opportunity: 'Demand for private, AI-assisted personal knowledge systems.',
    },
    roadmap: {
      completed: ['Founder preview launch', 'Core memory / knowledge experience'],
      current: ['Beta iteration with early users'],
      next: ['Deeper linking and retrieval capabilities'],
      future: ['Expanded intelligence layers and product tiers'],
    },
    disclaimer: null,
  },
  {
    id: 'memecoin-os',
    slug: 'memecoin-os',
    name: 'Memecoin OS',
    url: 'https://memecoin-os.web.app',
    category: 'Web3 / AI / Crypto Intelligence',
    status: STATUS.MVP,
    public: true,
    ready: true,
    markets: ['Web3', 'Artificial Intelligence', 'Digital Economy'],
    businessModel: ['SaaS', 'B2B', 'API'],
    shortDescription:
      'An intelligence and operating layer designed to help memecoin ecosystems understand, monitor and manage their digital environment.',
    valueProposition: 'Observable quality scores and intelligence for memecoin ecosystems — not financial advice.',
    problem:
      'Memecoin ecosystems move quickly and lack structured intelligence to understand quality signals beyond hype and price chatter.',
    solution:
      'Memecoin OS provides an intelligence layer with observable quality scoring and monitoring-oriented tooling. Execution trading features are disabled; scores are descriptive, not forecasts.',
    technology: [
      'Web3 intelligence layer',
      'Observable quality scoring',
      'Analytics-oriented interface',
      'Cloud-hosted web application',
    ],
    targetMarket: {
      geography: ['Global'],
      segments: ['Token teams', 'Community operators', 'Researchers'],
      opportunity: 'Need for structured monitoring tools around crypto community ecosystems.',
    },
    roadmap: {
      completed: ['Public MVP interface', 'Quality scoring presentation'],
      current: ['Intelligence layer refinement'],
      next: ['Deeper monitoring and analytics modules'],
      future: ['Broader ecosystem tooling'],
    },
    disclaimer:
      'Memecoin OS provides informational and observational tools only. It does not provide financial, investment or trading advice. Scores describe observable quality and are not price forecasts. No content on this site constitutes an invitation to buy or sell any digital asset.',
  },
  {
    id: 'stpway',
    slug: 'stpway',
    name: 'STPway',
    url: 'https://stpway.st',
    category: 'Digital Platform / Mobility / Services / São Tomé e Príncipe',
    status: STATUS.LIVE,
    public: true,
    ready: true,
    markets: ['Mobility', 'Emerging Markets', 'Digital Economy', 'Lusophone Markets'],
    businessModel: ['Transaction fees', 'B2C', 'Marketplace'],
    shortDescription:
      'A digital platform designed to connect people, services, mobility and opportunities through a unified digital ecosystem.',
    valueProposition: 'Mobile payments and digital services for São Tomé e Príncipe.',
    problem:
      'Local users need practical digital rails for payments and services in markets where connectivity and banking access can be uneven.',
    solution:
      'STPway delivers a mobile-oriented payments experience for São Tomé e Príncipe, connecting people to digital payment flows through a unified product interface.',
    technology: [
      'Progressive Web App (PWA)',
      'Mobile-first payment flows',
      'Cloud-backed application delivery',
      'Service worker enabled client',
    ],
    targetMarket: {
      geography: ['São Tomé e Príncipe'],
      segments: ['Consumers', 'Local service users', 'Merchants'],
      opportunity: 'Digital payment adoption in an emerging market context.',
    },
    roadmap: {
      completed: ['Public PWA presence', 'Core mobile payments experience'],
      current: ['Reliability and local-market iteration'],
      next: ['Broader service connections'],
      future: ['Expanded ecosystem services'],
    },
    disclaimer: null,
  },
  {
    id: 'wgf-ai-security',
    slug: 'wgf-ai-security',
    name: 'WGF AI Security',
    url: null,
    category: 'AI Cybersecurity',
    status: STATUS.DEVELOPMENT,
    public: false,
    ready: false,
    markets: ['Cybersecurity', 'Artificial Intelligence', 'SaaS'],
    businessModel: ['SaaS', 'B2B', 'Subscription'],
    shortDescription:
      'An AI-native cybersecurity platform combining endpoint protection, behavioral analysis, automated response and explainable security intelligence.',
    valueProposition: 'AI-assisted defensive security intelligence for endpoints and operations.',
    problem:
      'Modern threats require faster detection and clearer reasoning than signature-only tools can provide.',
    solution:
      'WGF AI Security is being developed as an AI-native defensive platform. Public feature claims will be published only when modules are production-ready.',
    technology: ['AI analysis', 'Endpoint telemetry concepts', 'Security operations interfaces'],
    targetMarket: {
      geography: ['Europe', 'Global'],
      segments: ['Security teams', 'SMBs', 'Technology companies'],
      opportunity: 'Demand for explainable, AI-assisted defensive tooling.',
    },
    roadmap: {
      completed: ['Core research and prototyping'],
      current: ['Private development'],
      next: ['Controlled technical demos'],
      future: ['Public product disclosure when ready'],
    },
    disclaimer: null,
  },
  {
    id: 'ecoseo-ai',
    slug: 'ecoseo-ai',
    name: 'EcoSEO AI',
    url: null,
    category: 'AI / E-commerce / Autonomous Sourcing',
    status: STATUS.DEVELOPMENT,
    public: false,
    ready: false,
    markets: ['E-commerce', 'Artificial Intelligence', 'SaaS'],
    businessModel: ['SaaS', 'B2B', 'Subscription'],
    shortDescription:
      'An AI-powered platform designed to automate product discovery, sourcing intelligence and e-commerce workflows.',
    valueProposition: 'Automate discovery and sourcing intelligence for e-commerce workflows.',
    problem:
      'E-commerce operators spend excessive time on manual product discovery and sourcing research.',
    solution:
      'EcoSEO AI is under development to automate parts of product discovery and sourcing intelligence. Capabilities will be listed publicly only when implemented and ready.',
    technology: ['Automation workflows', 'AI-assisted analysis', 'E-commerce tooling'],
    targetMarket: {
      geography: ['Global', 'Emerging Markets'],
      segments: ['E-commerce operators', 'Sourcing teams'],
      opportunity: 'Automation of repetitive e-commerce research workflows.',
    },
    roadmap: {
      completed: ['Internal prototyping'],
      current: ['Private development'],
      next: ['MVP hardening'],
      future: ['Public launch when ready'],
    },
    disclaimer: null,
  },
];

/**
 * PT / FR copy for public products, keyed by slug. English above stays the source of truth;
 * any field missing here falls back to it. Translate faithfully — no new claims.
 */
const productTranslations = {
  'connect-cplp': {
    PT: {
      category: 'Infraestrutura digital / CPLP / Ecossistema',
      shortDescription:
        'Uma plataforma digital pensada para ligar pessoas, empresas, oportunidades e serviços em todo o mundo lusófono.',
      valueProposition: 'Transferências e ligações digitais no espaço CPLP / PALOP.',
      problem:
        'Pessoas e empresas nos países de língua portuguesa precisam de formas mais simples de movimentar valor, descobrir oportunidades e manter-se ligadas além-fronteiras.',
      solution:
        'A Connect-CPLP disponibiliza uma plataforma digital focada em transferências e conectividade para o ecossistema PALOP / CPLP, com uma experiência de produto pensada para utilizadores reais nesses mercados.',
      technology: [
        'Arquitetura de aplicação web',
        'Entrega alojada na cloud',
        'Fluxos de autenticação seguros',
        'Integrações de pagamento / transferência quando ativas',
      ],
      targetMarket: {
        geography: ['Países CPLP / PALOP', 'Diáspora lusófona'],
        segments: ['Particulares', 'Pequenas empresas', 'Utilizadores transfronteiriços'],
        opportunity: 'Procura crescente de serviços digitais nos mercados de língua portuguesa.',
      },
      roadmap: {
        completed: ['Website público do produto', 'Experiência principal orientada para transferências'],
        current: ['Iteração do produto com base em utilização real'],
        next: ['Funcionalidades de ecossistema mais amplas', 'Expansão de parcerias'],
        future: ['Maior cobertura regional e novas camadas de serviço'],
      },
    },
    FR: {
      category: 'Infrastructure numérique / CPLP / Écosystème',
      shortDescription:
        'Une plateforme numérique conçue pour connecter personnes, entreprises, opportunités et services dans tout le monde lusophone.',
      valueProposition: 'Transferts et connexions numériques dans l’espace CPLP / PALOP.',
      problem:
        'Les personnes et les entreprises des pays lusophones ont besoin de moyens plus simples pour transférer de la valeur, découvrir des opportunités et rester connectées au-delà des frontières.',
      solution:
        'Connect-CPLP propose une plateforme numérique axée sur les transferts et la connectivité pour l’écosystème PALOP / CPLP, avec une expérience produit conçue pour de vrais utilisateurs sur ces marchés.',
      technology: [
        'Architecture d’application web',
        'Hébergement cloud',
        'Flux d’authentification sécurisés',
        'Intégrations de paiement / transfert lorsqu’elles sont activées',
      ],
      targetMarket: {
        geography: ['Pays CPLP / PALOP', 'Diaspora lusophone'],
        segments: ['Particuliers', 'Petites entreprises', 'Utilisateurs transfrontaliers'],
        opportunity: 'Demande croissante de services numériques sur les marchés lusophones.',
      },
      roadmap: {
        completed: ['Site public du produit', 'Expérience principale orientée transferts'],
        current: ['Itération produit basée sur l’usage réel'],
        next: ['Fonctionnalités d’écosystème élargies', 'Développement des partenariats'],
        future: ['Couverture régionale plus large et nouvelles couches de services'],
      },
    },
  },
  'mnemosyne-one': {
    PT: {
      category: 'IA / Conhecimento / Inteligência',
      shortDescription: 'Uma plataforma orientada para IA, focada em conhecimento inteligente, memória e interação digital.',
      valueProposition: 'Capte pensamentos, ligue ideias e explore conhecimento privado num espaço cognitivo vivo.',
      problem:
        'O conhecimento pessoal está fragmentado entre notas, conversas e ficheiros, o que dificulta voltar a ligar ideias ao longo do tempo.',
      solution:
        'O Mnemosyne One ajuda os utilizadores a guardar pensamentos, ligar ideias e explorar a memória num espaço de trabalho cognitivo privado — atualmente disponível como founder preview.',
      technology: [
        'Interação com conhecimento assistida por IA',
        'Espaço de trabalho cognitivo privado',
        'Entrega como aplicação web',
        'Posicionamento orientado para zero-knowledge',
      ],
      targetMarket: {
        geography: ['Global', 'Europa', 'Mercados lusófonos'],
        segments: ['Profissionais do conhecimento', 'Fundadores', 'Investigadores', 'Criadores'],
        opportunity: 'Procura por sistemas de conhecimento pessoal privados e assistidos por IA.',
      },
      roadmap: {
        completed: ['Lançamento do founder preview', 'Experiência principal de memória / conhecimento'],
        current: ['Iteração em beta com os primeiros utilizadores'],
        next: ['Capacidades mais profundas de ligação e pesquisa'],
        future: ['Camadas de inteligência alargadas e novos planos de produto'],
      },
    },
    FR: {
      category: 'IA / Connaissance / Intelligence',
      shortDescription: 'Une plateforme orientée IA, centrée sur la connaissance intelligente, la mémoire et l’interaction numérique.',
      valueProposition:
        'Capturez vos pensées, reliez vos idées et explorez vos connaissances privées dans un espace cognitif vivant.',
      problem:
        'Les connaissances personnelles sont dispersées entre notes, conversations et fichiers, ce qui rend difficile de relier les idées dans le temps.',
      solution:
        'Mnemosyne One aide les utilisateurs à conserver leurs pensées, relier leurs idées et explorer leur mémoire dans un espace de travail cognitif privé — actuellement disponible en founder preview.',
      technology: [
        'Interaction avec la connaissance assistée par IA',
        'Espace de travail cognitif privé',
        'Application web',
        'Positionnement orienté zero-knowledge',
      ],
      targetMarket: {
        geography: ['Monde', 'Europe', 'Marchés lusophones'],
        segments: ['Travailleurs du savoir', 'Fondateurs', 'Chercheurs', 'Créateurs'],
        opportunity: 'Demande de systèmes de connaissance personnelle privés et assistés par IA.',
      },
      roadmap: {
        completed: ['Lancement du founder preview', 'Expérience principale de mémoire / connaissance'],
        current: ['Itération bêta avec les premiers utilisateurs'],
        next: ['Capacités de liaison et de recherche plus poussées'],
        future: ['Couches d’intelligence étendues et nouvelles offres'],
      },
    },
  },
  'memecoin-os': {
    PT: {
      category: 'Web3 / IA / Inteligência cripto',
      shortDescription:
        'Uma camada de inteligência e operação pensada para ajudar ecossistemas de memecoins a compreender, monitorizar e gerir o seu ambiente digital.',
      valueProposition:
        'Pontuações de qualidade observáveis e inteligência para ecossistemas de memecoins — não é aconselhamento financeiro.',
      problem:
        'Os ecossistemas de memecoins mudam depressa e falta-lhes inteligência estruturada para perceber sinais de qualidade para além do hype e da conversa sobre preço.',
      solution:
        'O Memecoin OS fornece uma camada de inteligência com pontuação de qualidade observável e ferramentas orientadas para monitorização. As funcionalidades de execução de trading estão desativadas; as pontuações são descritivas, não previsões.',
      technology: [
        'Camada de inteligência Web3',
        'Pontuação de qualidade observável',
        'Interface orientada para analytics',
        'Aplicação web alojada na cloud',
      ],
      targetMarket: {
        geography: ['Global'],
        segments: ['Equipas de tokens', 'Gestores de comunidades', 'Investigadores'],
        opportunity: 'Necessidade de ferramentas de monitorização estruturadas para ecossistemas de comunidades cripto.',
      },
      roadmap: {
        completed: ['Interface MVP pública', 'Apresentação da pontuação de qualidade'],
        current: ['Refinamento da camada de inteligência'],
        next: ['Módulos mais profundos de monitorização e analytics'],
        future: ['Ferramentas de ecossistema mais amplas'],
      },
      disclaimer:
        'O Memecoin OS fornece apenas ferramentas informativas e de observação. Não presta aconselhamento financeiro, de investimento ou de trading. As pontuações descrevem qualidade observável e não são previsões de preço. Nenhum conteúdo deste site constitui um convite à compra ou venda de qualquer ativo digital.',
    },
    FR: {
      category: 'Web3 / IA / Intelligence crypto',
      shortDescription:
        'Une couche d’intelligence et d’exploitation conçue pour aider les écosystèmes de memecoins à comprendre, surveiller et gérer leur environnement numérique.',
      valueProposition:
        'Scores de qualité observables et intelligence pour les écosystèmes de memecoins — ce n’est pas un conseil financier.',
      problem:
        'Les écosystèmes de memecoins évoluent vite et manquent d’intelligence structurée pour comprendre les signaux de qualité au-delà du battage et des discussions de prix.',
      solution:
        'Memecoin OS fournit une couche d’intelligence avec un score de qualité observable et des outils orientés surveillance. Les fonctions d’exécution de trading sont désactivées ; les scores sont descriptifs, pas des prévisions.',
      technology: [
        'Couche d’intelligence Web3',
        'Score de qualité observable',
        'Interface orientée analytics',
        'Application web hébergée dans le cloud',
      ],
      targetMarket: {
        geography: ['Monde'],
        segments: ['Équipes de tokens', 'Animateurs de communautés', 'Chercheurs'],
        opportunity: 'Besoin d’outils de surveillance structurés pour les écosystèmes communautaires crypto.',
      },
      roadmap: {
        completed: ['Interface MVP publique', 'Présentation du score de qualité'],
        current: ['Affinage de la couche d’intelligence'],
        next: ['Modules de surveillance et d’analytics plus poussés'],
        future: ['Outils d’écosystème plus larges'],
      },
      disclaimer:
        'Memecoin OS fournit uniquement des outils d’information et d’observation. Il ne fournit aucun conseil financier, d’investissement ou de trading. Les scores décrivent une qualité observable et ne sont pas des prévisions de prix. Aucun contenu de ce site ne constitue une invitation à acheter ou vendre un actif numérique.',
    },
  },
  stpway: {
    PT: {
      category: 'Plataforma digital / Mobilidade / Serviços / São Tomé e Príncipe',
      shortDescription:
        'Uma plataforma digital pensada para ligar pessoas, serviços, mobilidade e oportunidades através de um ecossistema digital unificado.',
      valueProposition: 'Pagamentos móveis e serviços digitais para São Tomé e Príncipe.',
      problem:
        'Os utilizadores locais precisam de soluções digitais práticas para pagamentos e serviços em mercados onde a conectividade e o acesso bancário podem ser desiguais.',
      solution:
        'O STPway oferece uma experiência de pagamentos orientada para mobile em São Tomé e Príncipe, ligando as pessoas a fluxos de pagamento digitais através de uma interface de produto unificada.',
      technology: [
        'Progressive Web App (PWA)',
        'Fluxos de pagamento mobile-first',
        'Entrega suportada por cloud',
        'Cliente com service worker',
      ],
      targetMarket: {
        geography: ['São Tomé e Príncipe'],
        segments: ['Consumidores', 'Utilizadores de serviços locais', 'Comerciantes'],
        opportunity: 'Adoção de pagamentos digitais num contexto de mercado emergente.',
      },
      roadmap: {
        completed: ['Presença pública como PWA', 'Experiência principal de pagamentos móveis'],
        current: ['Fiabilidade e iteração no mercado local'],
        next: ['Ligação a mais serviços'],
        future: ['Serviços de ecossistema alargados'],
      },
    },
    FR: {
      category: 'Plateforme numérique / Mobilité / Services / Sao Tomé-et-Principe',
      shortDescription:
        'Une plateforme numérique conçue pour connecter personnes, services, mobilité et opportunités au sein d’un écosystème numérique unifié.',
      valueProposition: 'Paiements mobiles et services numériques pour Sao Tomé-et-Principe.',
      problem:
        'Les utilisateurs locaux ont besoin de solutions numériques pratiques pour les paiements et les services sur des marchés où la connectivité et l’accès bancaire peuvent être inégaux.',
      solution:
        'STPway offre une expérience de paiement pensée pour le mobile à Sao Tomé-et-Principe, en connectant les personnes aux flux de paiement numériques via une interface produit unifiée.',
      technology: [
        'Progressive Web App (PWA)',
        'Flux de paiement mobile-first',
        'Hébergement adossé au cloud',
        'Client avec service worker',
      ],
      targetMarket: {
        geography: ['Sao Tomé-et-Principe'],
        segments: ['Consommateurs', 'Utilisateurs de services locaux', 'Commerçants'],
        opportunity: 'Adoption des paiements numériques dans un contexte de marché émergent.',
      },
      roadmap: {
        completed: ['Présence publique en PWA', 'Expérience principale de paiement mobile'],
        current: ['Fiabilité et itération sur le marché local'],
        next: ['Connexion à davantage de services'],
        future: ['Services d’écosystème élargis'],
      },
    },
  },
};

// Display labels for the canonical (English) market / business-model values.
// The canonical values stay in URLs (?market=) so shared links work in every language.
const tagLabels = {
  PT: {
    'Lusophone Markets': 'Mercados lusófonos',
    'Emerging Markets': 'Mercados emergentes',
    'Digital Economy': 'Economia digital',
    'Artificial Intelligence': 'Inteligência artificial',
    'Knowledge Work': 'Trabalho do conhecimento',
    Mobility: 'Mobilidade',
    Cybersecurity: 'Cibersegurança',
    'Transaction fees': 'Comissões por transação',
    Subscription: 'Subscrição',
  },
  FR: {
    'Lusophone Markets': 'Marchés lusophones',
    'Emerging Markets': 'Marchés émergents',
    'Digital Economy': 'Économie numérique',
    'Artificial Intelligence': 'Intelligence artificielle',
    'Knowledge Work': 'Travail du savoir',
    Mobility: 'Mobilité',
    Cybersecurity: 'Cybersécurité',
    Marketplace: 'Place de marché',
    'Transaction fees': 'Frais de transaction',
    Subscription: 'Abonnement',
  },
};

export function tagLabel(value, lang) {
  return tagLabels[lang]?.[value] || value;
}

/** Product with PT/FR copy applied; canonical `markets` / `businessModel` values are kept. */
export function localizeProduct(product, lang) {
  const override = product && productTranslations[product.slug]?.[lang];
  return override ? localize({ ...product, i18n: { [lang]: override } }, lang) : product;
}

export { productTranslations };

export function isPublicProduct(product) {
  const publishable = new Set([STATUS.LIVE, STATUS.BETA, STATUS.MVP]);
  return product.public === true && product.ready === true && publishable.has(product.status);
}

export function getPublicProducts() {
  return products.filter(isPublicProduct);
}

/** Markets present in the given products, in first-seen order. */
export function getProductMarkets(list) {
  return [...new Set(list.flatMap((p) => p.markets || []))];
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Filters by free-text query (accent-insensitive), market and status. Empty values match all. */
export function filterProducts(list, { q = '', market = '', status = '' } = {}) {
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  return list.filter((p) => {
    if (market && !(p.markets || []).includes(market)) return false;
    if (status && p.status !== status) return false;
    if (!terms.length) return true;
    const haystack = normalize(
      [p.name, p.category, p.shortDescription, p.valueProposition, ...(p.markets || []), ...(p.technology || []), ...(p.businessModel || [])].join(' '),
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export function getProductBySlug(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product || !isPublicProduct(product)) return null;
  return product;
}
