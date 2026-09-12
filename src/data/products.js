/**
 * Product publication rule:
 * Shown publicly only when public === true AND ready === true
 * AND status is one of: live | beta | mvp
 *
 * Incomplete products stay public:false / ready:false until ready to launch.
 */

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

export function isPublicProduct(product) {
  const publishable = new Set([STATUS.LIVE, STATUS.BETA, STATUS.MVP]);
  return product.public === true && product.ready === true && publishable.has(product.status);
}

export function getPublicProducts() {
  return products.filter(isPublicProduct);
}

export function getProductBySlug(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product || !isPublicProduct(product)) return null;
  return product;
}
