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
    id: 'wgf-ip-shield',
    slug: 'wgf-ip-shield',
    name: 'WGF IP Shield',
    url: 'https://wgfipshield.online/',
    category: 'SaaS / IP Protection / Code Timestamping',
    status: STATUS.LIVE,
    public: true,
    ready: true,
    featured: true,
    markets: ['SaaS', 'Cybersecurity', 'Digital Economy', 'Artificial Intelligence'],
    businessModel: ['SaaS', 'Subscription', 'B2B', 'Freemium'],
    shortDescription:
      'Timestamped record that your code existed (SHA-256, verifiable certificate), without uploading your code.',
    valueProposition: 'Your code — timestamped, fingerprinted, owned.',
    problem:
      'Developers and companies struggle to document when their code and its versions existed without exposing proprietary source code.',
    solution:
      'WGF IP Shield fingerprints projects in the browser (SHA-256), issues verifiable timestamped certificates, keeps version history, offers public verification, README badges, CI/CD registration API and AI protection reports. Only fingerprints leave the machine — not the source code.',
    technology: [
      'Client-side SHA-256 fingerprinting',
      'Timestamped certificates with version provenance chain',
      'Public verification (/verify)',
      'AI protection reports (licenses, secrets, copying/scraping risks)',
      'CI/CD API with hashed API keys',
      'Stripe subscription billing',
      'Supabase-backed cloud delivery',
    ],
    targetMarket: {
      geography: ['Europe', 'Global', 'Lusophone Markets'],
      segments: ['Software developers', 'Startups', 'Agencies', 'Technology companies'],
      opportunity:
        'Growing need for timestamped records of code, IP documentation and version integrity without sacrificing code privacy.',
    },
    roadmap: {
      completed: [
        'Live product at wgfipshield.online',
        'Auth, projects, versions and certificates',
        'Public verification and SVG badges',
        'Stripe payments (monthly/yearly)',
        'AI protection reports',
        'CI/CD public API',
      ],
      current: ['Commercialization and market acquisition'],
      next: ['Transactional email flows', 'Stronger independent time-anchoring'],
      future: ['Signed certificates, verified holder identity, selective disclosure tooling'],
    },
    disclaimer:
      'WGF IP Shield provides evidence of existence, integrity and recorded provenance. No system stops copying entirely. Certificates are a timestamped record of existence and integrity; they are not legal proof of authorship and are not a substitute for legal counsel or registered intellectual-property filings where required.',
  },
  {
    id: 'connect-cplp',
    slug: 'connect-cplp',
    name: 'Connect-CPLP',
    url: 'https://connect-cplp.com',
    category: 'Digital Infrastructure / CPLP / Ecosystem',
    status: STATUS.BETA,
    public: true,
    ready: true,
    markets: ['Lusophone Markets', 'Emerging Markets', 'Digital Economy'],
    businessModel: ['Marketplace', 'B2C', 'B2B'],
    shortDescription:
      'Digital platform for the CPLP community, in development.',
    valueProposition: 'Digital connections for people and businesses across the CPLP / PALOP space.',
    problem:
      'People and businesses across Portuguese-speaking countries need simpler ways to discover opportunities and stay connected across borders.',
    solution:
      'Connect-CPLP is a digital platform for the CPLP / PALOP community, currently in beta and in development, with a product experience designed for real users in those markets.',
    technology: [
      'Web application architecture',
      'Cloud-hosted delivery',
      'Secure authentication flows',
    ],
    targetMarket: {
      geography: ['CPLP / PALOP countries', 'Lusophone diaspora'],
      segments: ['Individuals', 'Small businesses', 'Cross-border users'],
      opportunity: 'Growing demand for digital services across Portuguese-speaking markets.',
    },
    roadmap: {
      completed: ['Public product website'],
      current: ['Beta iteration and product development'],
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
    status: STATUS.BETA,
    public: true,
    ready: true,
    markets: ['Mobility', 'Emerging Markets', 'Digital Economy', 'Lusophone Markets'],
    businessModel: ['B2C', 'Marketplace'],
    shortDescription:
      'Digital platform for São Tomé and Príncipe, in development.',
    valueProposition: 'Digital services for São Tomé and Príncipe.',
    problem:
      'Local users need practical digital access to services in markets where connectivity can be uneven.',
    solution:
      'STPway is a mobile-first digital platform for São Tomé and Príncipe, currently in beta and in development, bringing local digital services together in a unified product interface.',
    technology: [
      'Progressive Web App (PWA)',
      'Mobile-first interface',
      'Cloud-backed application delivery',
      'Service worker enabled client',
    ],
    targetMarket: {
      geography: ['São Tomé e Príncipe'],
      segments: ['Consumers', 'Local service users', 'Local businesses'],
      opportunity: 'Digital service adoption in an emerging market context.',
    },
    roadmap: {
      completed: ['Public PWA presence'],
      current: ['Beta iteration in the local market'],
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
    id: 'ecoseo',
    slug: 'ecoseo',
    name: 'EcoSEO',
    url: 'https://ecoseoai.one',
    category: 'AI / E-commerce / SEO content',
    status: STATUS.LIVE,
    public: true,
    ready: true,
    markets: ['E-commerce', 'Artificial Intelligence', 'SaaS'],
    businessModel: ['SaaS', 'Subscription', 'B2B'],
    shortDescription:
      'An AI tool that writes SEO titles, product descriptions and meta descriptions for online stores, in the format of each e-commerce platform.',
    valueProposition: 'SEO-ready copy for every product page, reviewed by the seller before publishing.',
    problem:
      'Online sellers spend hours writing product titles and descriptions, or reuse supplier text that many other stores also publish, which rarely ranks in search.',
    solution:
      'EcoSEO generates a title, description and meta description from the product facts the seller provides, for Shopify and WooCommerce stores, in six languages. Sellers review and edit before publishing. Pro adds bulk generation from CSV; Enterprise adds team approvals, an audit log and API access.',
    technology: [
      'Web application (React and Node.js)',
      'LLM content generation restricted to the facts provided',
      'Google Cloud Run and Cloud SQL',
      'Stripe subscriptions and Firebase Authentication',
    ],
    targetMarket: {
      geography: ['Portugal', 'Europe', 'Global'],
      segments: ['Online store owners', 'Marketplace sellers', 'E-commerce agencies'],
      opportunity: 'Product content at catalogue scale for small and mid-size online stores.',
    },
    roadmap: {
      completed: ['Public launch with Free, Pro and Enterprise plans', 'Bulk generation from CSV', 'Team approvals and audit log'],
      current: ['Search visibility and first customers'],
      next: ['More store connectors with verified publishing'],
      future: ['Wider catalogue automation'],
    },
    disclaimer: null,
  },
];

/**
 * PT / FR copy for public products, keyed by slug. English above stays the source of truth;
 * any field missing here falls back to it. Translate faithfully — no new claims.
 */
const productTranslations = {
  'wgf-ip-shield': {
    PT: {
      category: 'SaaS / Proteção de IP / Registo datado de código',
      shortDescription:
        'Registo datado de que o seu código existia (SHA-256, certificado verificável), sem enviar o código.',
      valueProposition: 'O seu código — com carimbo temporal, impressão digital e titularidade registada.',
      problem:
        'Programadores e empresas têm dificuldade em documentar quando o seu código e as suas versões existiam sem expor código-fonte proprietário.',
      solution:
        'O WGF IP Shield gera impressões digitais de projetos no navegador (SHA-256), emite certificados verificáveis com carimbo temporal, mantém o histórico de versões, oferece verificação pública, badges para README, API de registo para CI/CD e relatórios de proteção com IA. Apenas as impressões digitais saem da máquina — nunca o código-fonte.',
      technology: [
        'Geração local de impressões digitais SHA-256 no navegador',
        'Certificados com carimbo temporal e cadeia de proveniência de versões',
        'Verificação pública (/verify)',
        'Relatórios de proteção com IA (licenças, segredos, riscos de cópia/scraping)',
        'API de CI/CD com chaves de API com hash',
        'Faturação por subscrição via Stripe',
        'Infraestrutura cloud suportada por Supabase',
      ],
      targetMarket: {
        geography: ['Europa', 'Global', 'Mercados lusófonos'],
        segments: ['Programadores de software', 'Startups', 'Agências', 'Empresas tecnológicas'],
        opportunity:
          'Necessidade crescente de registos datados de código, documentação de propriedade intelectual e integridade de versões sem sacrificar a privacidade do código.',
      },
      roadmap: {
        completed: [
          'Produto ativo em wgfipshield.online',
          'Autenticação, projetos, versões e certificados',
          'Verificação pública e badges SVG',
          'Pagamentos Stripe (mensal/anual)',
          'Relatórios de proteção com IA',
          'API pública para CI/CD',
        ],
        current: ['Comercialização e aquisição de clientes'],
        next: ['Fluxos de email transacional', 'Ancoragem temporal independente reforçada'],
        future: ['Certificados assinados, identidade verificada do titular e ferramentas de divulgação seletiva'],
      },
      disclaimer:
        'O WGF IP Shield fornece evidência de existência, integridade e proveniência registada. Nenhum sistema impede totalmente a cópia. Os certificados são um registo datado de existência e integridade; não são prova legal de autoria nem substituem aconselhamento jurídico nem registos formais de propriedade intelectual quando exigidos.',
    },
    FR: {
      category: 'SaaS / Protection PI / Horodatage de code',
      shortDescription:
        'Enregistrement horodaté attestant que votre code existait (SHA-256, certificat vérifiable), sans envoyer votre code.',
      valueProposition: 'Votre code — horodaté, signé par empreinte et protégé.',
      problem:
        'Les développeurs et les entreprises peinent à documenter quand leur code et ses versions existaient sans exposer leur code source propriétaire.',
      solution:
        'WGF IP Shield calcule les empreintes des projets dans le navigateur (SHA-256), émet des certificats vérifiables et horodatés, conserve l’historique des versions, propose une vérification publique, des badges README, une API CI/CD et des rapports de protection par IA. Seules les empreintes quittent la machine — jamais le code source.',
      technology: [
        'Calcul d’empreintes SHA-256 côté client',
        'Certificats horodatés avec chaîne de provenance des versions',
        'Vérification publique (/verify)',
        'Rapports de protection par IA (licences, secrets, risques de copie/scraping)',
        'API CI/CD avec clés d’API hachées',
        'Facturation par abonnement Stripe',
        'Infrastructure cloud propulsée par Supabase',
      ],
      targetMarket: {
        geography: ['Europe', 'Monde', 'Marchés lusophones'],
        segments: ['Développeurs logiciels', 'Startups', 'Agences', 'Entreprises technologiques'],
        opportunity:
          'Besoin croissant d’enregistrements horodatés du code, de documentation PI et d’intégrité des versions sans compromettre la confidentialité du code.',
      },
      roadmap: {
        completed: [
          'Produit en ligne sur wgfipshield.online',
          'Authentification, projets, versions et certificats',
          'Vérification publique et badges SVG',
          'Paiements Stripe (mensuel/annuel)',
          'Rapports de protection par IA',
          'API publique CI/CD',
        ],
        current: ['Commercialisation et acquisition de clients'],
        next: ['Flux d’e-mails transactionnels', 'Ancrage temporel indépendant renforcé'],
        future: ['Certificats signés, identité vérifiée du titulaire et outils de divulgation sélective'],
      },
      disclaimer:
        'WGF IP Shield fournit des preuves d’existence, d’intégrité et de provenance enregistrée. Aucun système n’empêche totalement la copie. Les certificats sont un enregistrement horodaté d’existence et d’intégrité ; ils ne constituent pas une preuve légale de paternité et ne remplacent pas un avis juridique ni un dépôt officiel de propriété intellectuelle lorsque requis.',
    },
  },
  ecoseo: {
    PT: {
      category: 'IA / E-commerce / Conteúdo SEO',
      shortDescription:
        'Uma ferramenta de IA que escreve títulos SEO, descrições de produto e meta descriptions para lojas online, no formato de cada plataforma de e-commerce.',
      valueProposition: 'Texto pronto para SEO em cada página de produto, revisto pelo lojista antes de publicar.',
      problem:
        'Quem vende online passa horas a escrever títulos e descrições de produto, ou reutiliza o texto do fornecedor que muitas outras lojas também publicam, o que raramente aparece nas pesquisas.',
      solution:
        'O EcoSEO gera o título, a descrição e a meta description a partir dos factos do produto indicados pelo lojista, para lojas Shopify e WooCommerce, em seis idiomas. O lojista revê e edita antes de publicar. O plano Pro acrescenta geração em massa por CSV; o Enterprise acrescenta aprovações em equipa, registo de auditoria e acesso por API.',
      technology: [
        'Aplicação web (React e Node.js)',
        'Geração de conteúdo com LLM restrita aos factos fornecidos',
        'Google Cloud Run e Cloud SQL',
        'Subscrições Stripe e Firebase Authentication',
      ],
      targetMarket: {
        geography: ['Portugal', 'Europa', 'Global'],
        segments: ['Donos de lojas online', 'Vendedores em marketplaces', 'Agências de e-commerce'],
        opportunity: 'Conteúdo de produto à escala do catálogo para lojas online de pequena e média dimensão.',
      },
      roadmap: {
        completed: ['Lançamento público com planos Grátis, Pro e Enterprise', 'Geração em massa por CSV', 'Aprovações em equipa e registo de auditoria'],
        current: ['Visibilidade nas pesquisas e primeiros clientes'],
        next: ['Mais conectores de loja com publicação verificada'],
        future: ['Automação mais ampla do catálogo'],
      },
    },
    FR: {
      category: 'IA / E-commerce / Contenu SEO',
      shortDescription:
        'Un outil d’IA qui rédige les titres SEO, les descriptions de produits et les méta-descriptions des boutiques en ligne, au format de chaque plateforme e-commerce.',
      valueProposition: 'Des textes optimisés pour le SEO sur chaque fiche produit, relus par le vendeur avant publication.',
      problem:
        'Les vendeurs en ligne passent des heures à rédiger titres et descriptions de produits, ou réutilisent le texte du fournisseur que de nombreuses autres boutiques publient aussi, ce qui ressort rarement dans les recherches.',
      solution:
        'EcoSEO génère le titre, la description et la méta-description à partir des informations produit fournies par le vendeur, pour les boutiques Shopify et WooCommerce, en six langues. Le vendeur relit et modifie avant de publier. L’offre Pro ajoute la génération en masse par CSV ; l’offre Enterprise ajoute les validations en équipe, un journal d’audit et l’accès API.',
      technology: [
        'Application web (React et Node.js)',
        'Génération de contenu par LLM limitée aux informations fournies',
        'Google Cloud Run et Cloud SQL',
        'Abonnements Stripe et Firebase Authentication',
      ],
      targetMarket: {
        geography: ['Portugal', 'Europe', 'Monde'],
        segments: ['Propriétaires de boutiques en ligne', 'Vendeurs sur marketplaces', 'Agences e-commerce'],
        opportunity: 'Du contenu produit à l’échelle du catalogue pour les boutiques en ligne de petite et moyenne taille.',
      },
      roadmap: {
        completed: ['Lancement public avec les offres Gratuite, Pro et Enterprise', 'Génération en masse par CSV', 'Validations en équipe et journal d’audit'],
        current: ['Visibilité dans les recherches et premiers clients'],
        next: ['Davantage de connecteurs de boutique avec publication vérifiée'],
        future: ['Automatisation plus large du catalogue'],
      },
    },
  },
  'connect-cplp': {
    PT: {
      category: 'Infraestrutura digital / CPLP / Ecossistema',
      shortDescription:
        'Plataforma digital para a comunidade CPLP, em desenvolvimento.',
      valueProposition: 'Ligações digitais entre pessoas e empresas no espaço CPLP / PALOP.',
      problem:
        'Pessoas e empresas nos países de língua portuguesa precisam de formas mais simples de descobrir oportunidades e manter-se ligadas além-fronteiras.',
      solution:
        'A Connect-CPLP é uma plataforma digital para a comunidade CPLP / PALOP, atualmente em beta e em desenvolvimento, com uma experiência de produto pensada para utilizadores reais nesses mercados.',
      technology: [
        'Arquitetura de aplicação web',
        'Entrega alojada na cloud',
        'Fluxos de autenticação seguros',
      ],
      targetMarket: {
        geography: ['Países CPLP / PALOP', 'Diáspora lusófona'],
        segments: ['Particulares', 'Pequenas empresas', 'Utilizadores transfronteiriços'],
        opportunity: 'Procura crescente de serviços digitais nos mercados de língua portuguesa.',
      },
      roadmap: {
        completed: ['Website público do produto'],
        current: ['Iteração em beta e desenvolvimento do produto'],
        next: ['Funcionalidades de ecossistema mais amplas', 'Expansão de parcerias'],
        future: ['Maior cobertura regional e novas camadas de serviço'],
      },
    },
    FR: {
      category: 'Infrastructure numérique / CPLP / Écosystème',
      shortDescription:
        'Plateforme numérique pour la communauté CPLP, en développement.',
      valueProposition: 'Connexions numériques entre personnes et entreprises dans l’espace CPLP / PALOP.',
      problem:
        'Les personnes et les entreprises des pays lusophones ont besoin de moyens plus simples pour découvrir des opportunités et rester connectées au-delà des frontières.',
      solution:
        'Connect-CPLP est une plateforme numérique pour la communauté CPLP / PALOP, actuellement en bêta et en développement, avec une expérience produit conçue pour de vrais utilisateurs sur ces marchés.',
      technology: [
        'Architecture d’application web',
        'Hébergement cloud',
        'Flux d’authentification sécurisés',
      ],
      targetMarket: {
        geography: ['Pays CPLP / PALOP', 'Diaspora lusophone'],
        segments: ['Particuliers', 'Petites entreprises', 'Utilisateurs transfrontaliers'],
        opportunity: 'Demande croissante de services numériques sur les marchés lusophones.',
      },
      roadmap: {
        completed: ['Site public du produit'],
        current: ['Itération bêta et développement du produit'],
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
        'Plataforma digital para São Tomé e Príncipe, em desenvolvimento.',
      valueProposition: 'Serviços digitais para São Tomé e Príncipe.',
      problem:
        'Os utilizadores locais precisam de acesso digital prático a serviços em mercados onde a conectividade pode ser desigual.',
      solution:
        'O STPway é uma plataforma digital mobile-first para São Tomé e Príncipe, atualmente em beta e em desenvolvimento, que reúne serviços digitais locais numa interface de produto unificada.',
      technology: [
        'Progressive Web App (PWA)',
        'Interface mobile-first',
        'Entrega suportada por cloud',
        'Cliente com service worker',
      ],
      targetMarket: {
        geography: ['São Tomé e Príncipe'],
        segments: ['Consumidores', 'Utilizadores de serviços locais', 'Negócios locais'],
        opportunity: 'Adoção de serviços digitais num contexto de mercado emergente.',
      },
      roadmap: {
        completed: ['Presença pública como PWA'],
        current: ['Iteração em beta no mercado local'],
        next: ['Ligação a mais serviços'],
        future: ['Serviços de ecossistema alargados'],
      },
    },
    FR: {
      category: 'Plateforme numérique / Mobilité / Services / Sao Tomé-et-Principe',
      shortDescription:
        'Plateforme numérique pour Sao Tomé-et-Principe, en développement.',
      valueProposition: 'Services numériques pour Sao Tomé-et-Principe.',
      problem:
        'Les utilisateurs locaux ont besoin d’un accès numérique pratique aux services sur des marchés où la connectivité peut être inégale.',
      solution:
        'STPway est une plateforme numérique mobile-first pour Sao Tomé-et-Principe, actuellement en bêta et en développement, qui réunit des services numériques locaux dans une interface produit unifiée.',
      technology: [
        'Progressive Web App (PWA)',
        'Interface mobile-first',
        'Hébergement adossé au cloud',
        'Client avec service worker',
      ],
      targetMarket: {
        geography: ['Sao Tomé-et-Principe'],
        segments: ['Consommateurs', 'Utilisateurs de services locaux', 'Entreprises locales'],
        opportunity: 'Adoption des services numériques dans un contexte de marché émergent.',
      },
      roadmap: {
        completed: ['Présence publique en PWA'],
        current: ['Itération bêta sur le marché local'],
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
