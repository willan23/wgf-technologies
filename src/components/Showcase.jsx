import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Cpu, Smartphone, Globe, BarChart, Layers, X, ExternalLink, 
  Lock, Server, Zap, Bot, FileText, Wifi, Activity, CreditCard, Cloud, 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import './Showcase.css';
import TiltCard from './TiltCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const projects = [
  {
    id: 1,
    title: "ZETE — Zero-Trust Edge Telemetry Engine",
    category: "Cibersegurança & Kernel",
    metric: "eBPF & Rust Kernel",
    desc: "Motor de telemetria eBPF e análise de anomalias em tempo real com streaming em Rust, Grafana e alertas proativos.",
    tech: ["Rust", "eBPF", "Linux Kernel", "Prometheus", "Grafana", "Docker"],
    color: "#3b82f6",
    icon: Shield,
    challenge: "Capturar métricas e eventos comportamentais em nível de Kernel Linux com consumo mínimo de CPU e zero interrupção no espaço de utilizador.",
    solution: "Desenvolvimento de sondas eBPF otimizadas em C/Rust para intercetar syscalls, combinadas com um pipeline de streaming em Rust que envia séries temporais para Prometheus e dashboards Grafana.",
    results: "Monitorização de frota com latência sub-milissegundo, zero overhead percetível e proteção proativa contra exploração de vulnerabilidades zero-day.",
    demoMessage: "Olá William, gostaria de ver uma demonstração do motor ZETE Zero-Trust eBPF."
  },
  {
    id: 2,
    title: "Sistema NGAV & EDR Enterprise",
    category: "Cibersegurança & Kernel",
    metric: "< 1ms Latência",
    desc: "Plataforma avançada de segurança endpoint. Agente Linux eBPF em Rust, painel SOC e telemetria Windows via Driver Ring-0.",
    tech: ["Rust", "eBPF", "C", "Kernel Driver", "AI Engine", "Windows Ring-0"],
    color: "#00f2fe",
    icon: Lock,
    challenge: "Monitorizar atividades suspeitas ao nível do Kernel do sistema operativo em tempo real, sem prejudicar o desempenho de CPU e consumo de memória.",
    solution: "Criação de sondas eBPF no Linux e um driver personalizado de Ring-0 no Windows que capturam telemetria bruta em tempo de execução. As assinaturas comportamentais são processadas localmente por um motor leve de inteligência artificial.",
    results: "Latência de deteção de ameaças inferior a 1 milissegundo, com um consumo de memória fixado abaixo dos 20MB por endpoint.",
    demoMessage: "Olá William, gostaria de ver uma demonstração do teu Sistema NGAV e EDR Enterprise."
  },
  {
    id: 3,
    title: "WGF Protocol Mesh Network",
    category: "Cibersegurança & Kernel",
    metric: "Zero-Trust Mesh",
    desc: "Protocolo criptográfico e rede mesh descentralizada em Rust com túneis VPN seguros, roteamento dinâmico e NOC Dashboard.",
    tech: ["Rust", "Cryptography", "Mesh Network", "Zero-Trust", "Docker", "NOC Dashboard"],
    color: "#6366f1",
    icon: Server,
    challenge: "Garantir comunicações cifradas P2P entre nós distribuídos com roteamento dinâmico resiliente a falhas de conectividade e ataques de rede.",
    solution: "Construção de um daemon em Rust com primitivas criptográficas modernas, protocolo de descoberta de nós Mesh e painel NOC em tempo real para monitorização e gestão gráfica de tráfego.",
    results: "Túneis de comunicação Zero-Trust extremamente rápidos com suporte a nós móveis, resiliência a partições de rede e cifragem ponto a ponto.",
    demoMessage: "Olá William, tenho interesse em conhecer a arquitetura do WGF Protocol Mesh Network."
  },
  {
    id: 4,
    title: "AI Site Shield",
    category: "Cibersegurança & Kernel",
    metric: "Scan em < 10s",
    desc: "SaaS MVP para auditoria defensiva e varredura automática de segurança em sites e pequenos aplicativos gerados por inteligência artificial.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Dramatiq", "Python"],
    color: "#38bdf8",
    icon: Shield,
    challenge: "Validar em segundos se código gerado por ferramentas de IA não contém segredos expostos, CORS inseguro, injeção de prompts ou falhas de supply chain.",
    solution: "Desenvolvimento de uma arquitetura baseada em microserviços assíncronos. A API FastAPI recebe pacotes ZIP ou links do GitHub, insere as tarefas numa fila do Redis gerida pelo Dramatiq e executa uma suite de regras estáticas personalizadas.",
    results: "Scans concluídos em menos de 10s com relatórios completos HTML/JSON e integrações automatizadas para correção imediata do código.",
    demoMessage: "Olá William, gostaria de conversar sobre a arquitetura e testes do SaaS AI Site Shield."
  },
  {
    id: 5,
    title: "BTC Puzzle & Security Solver",
    category: "Cibersegurança & Kernel",
    metric: "High-Perf Key Engine",
    desc: "Motor de busca e auditoria de segurança criptográfica para verificação de chaves e resolução de puzzles de curvas elípticas.",
    tech: ["C++", "OpenCL", "Secp256k1", "Cryptography", "Multithreading", "GPU Acceleration"],
    color: "#f59e0b",
    icon: Zap,
    challenge: "Otimizar a computação paralela de pontos na curva elíptica Secp256k1 para testes de estresse e auditoria de vetores criptográficos.",
    solution: "Desenvolvimento de algoritmos de aceleração via GPU/OpenCL e multithreading C++ com gestão de memória de baixo nível sem contenção de locks.",
    results: "Milhões de operações de verificação criptográfica por segundo com alocação zero-copy e máxima eficiência computacional.",
    demoMessage: "Olá William, gostaria de saber mais sobre o motor criptográfico C++ do BTC Puzzle Solver."
  },
  {
    id: 6,
    title: "Hermes AI Agent System",
    category: "IA & Agentes Autónomos",
    metric: "Multi-Provider AI",
    desc: "Sistema de orquestração de agentes de inteligência artificial com gestão de contextos longos, runtime dinâmico e prompt assembly.",
    tech: ["Python", "LangChain", "Ollama", "FastAPI", "VectorDB", "Hermes Core"],
    color: "#a855f7",
    icon: Bot,
    challenge: "Coordenar múltiplos agentes de IA especialistas em tarefas complexas mantendo consistência de estado, rastreabilidade e uso eficiente de contexto.",
    solution: "Arquitetura modular de montagem de prompts, compressão de contexto automática, armazenamento persistente de sessões e roteador de LLMs local (Ollama) ou cloud.",
    results: "Automação end-to-end de tarefas complexas de análise de código, pesquisa técnica e geração de relatórios executivos com zero contaminação de contexto.",
    demoMessage: "Olá William, incrível a arquitetura do Hermes AI Agent System. Podemos agendar uma demonstração?"
  },
  {
    id: 7,
    title: "WGF Note (Offline AI Editor)",
    category: "IA & Agentes Autónomos",
    metric: "100% Offline AI",
    desc: "Editor de código e notas local-first híbrido desktop/mobile de alta performance com assistente de IA offline integrado via Ollama & Hermes AI.",
    tech: ["Electron", "Expo", "React Native", "Ollama", "Hermes AI", "TypeScript"],
    color: "#eab308",
    icon: FileText,
    challenge: "Construir uma IDE extremamente veloz com sincronização em nuvem segura, paleta de comandos offline e chat de IA de grande contexto na máquina local do programador.",
    solution: "Criação de um app multiplataforma usando React Native compilado para desktop (Electron) e mobile (Expo). O assistente de código integra-se localmente com o Ollama e executa um sidecar do agente de IA Hermes em ambiente local.",
    results: "Funciona de forma 100% offline, processando contextos de código de até 64K tokens e garantindo produtividade total sem partilha de dados sensíveis externa.",
    demoMessage: "Olá William, gostava de saber mais sobre a integração da IA local e o WGF Note."
  },
  {
    id: 8,
    title: "Control Hub Enterprise",
    category: "IA & Agentes Autónomos",
    metric: "AI Risk & Audit Hub",
    desc: "Plataforma centralizada de gestão de risco, auditorias automatizadas por IA, acompanhamento de projetos e inteligência documental.",
    tech: ["Django", "FastAPI", "React", "PostgreSQL", "Docker", "AI Auditing"],
    color: "#ec4899",
    icon: Layers,
    challenge: "Consolidar relatórios de conformidade, auditorias de segurança e gestão documental de equipas numa única interface intuitiva e automatizada.",
    solution: "Hub integrado com processamento de PDFs/documentos via IA, dashboards interativos de maturidade de risco e exportação de relatórios auditáveis em formato Excel e PDF.",
    results: "Redução de 60% no tempo de elaboração de auditorias corporativas e visibilidade em tempo real sobre conformidade e riscos.",
    demoMessage: "Olá William, gostaria de ver os detalhes do Control Hub Enterprise e módulos de IA."
  },
  {
    id: 9,
    title: "DCIP — Digital Campus Intelligence",
    category: "IA & Agentes Autónomos",
    metric: "Campus AI Analytics",
    desc: "Plataforma de inteligência preditiva para campus universitários e corporativos com análise de utilização e fluxos inteligentes.",
    tech: ["React", "Node.js", "Python AI", "GraphQL", "Docker", "Enterprise Architecture"],
    color: "#06b6d4",
    icon: Globe,
    challenge: "Processar volumes massivos de telemetria de campus e otimizar alocação de recursos físicos e digitais em tempo real.",
    solution: "Modelos de machine learning preditivo alimentados por APIs REST/GraphQL com dashboards executivos em tempo real e relatórios de fluxo de pessoas.",
    results: "Otimização de até 30% na ocupação de instalações e automação proativa de alertas operacionais para equipas de gestão.",
    demoMessage: "Olá William, tenho interesse no projeto DCIP - Digital Campus Intelligence Platform."
  },
  {
    id: 10,
    title: "WGF SenseOS",
    category: "Sistemas & IoT",
    metric: "98.4% Precisão Wi-Fi",
    desc: "SaaS inovador de monitoramento ambiental e indoor localization usando sinais Wi-Fi. 100% livre de câmaras ou vestíveis.",
    tech: ["Wi-Fi Sensing", "FastAPI", "ZKP", "Gait Analysis", "Firebase", "Signal Processing"],
    color: "#10b981",
    icon: Wifi,
    challenge: "Efetuar contagem e localização tridimensional (eixo vertical Z) de pessoas e queda de idosos com total garantia de privacidade corporal.",
    solution: "Captura de dados de rádio CSI (Channel State Information) de roteadores mesh comuns. Aplicámos filtros de frequência respiratória biológica (0.1-0.5 Hz) e classificação baseada em IA local com Provas de Conhecimento Zero (ZKP).",
    results: "Precisão na deteção de quedas de 98.4% e redução de custos energéticos em até 35% ao integrar com sistemas prediais HVAC de climatização.",
    demoMessage: "Olá William, achei o WGF SenseOS fantástico. Podes dar-me mais detalhes técnicos?"
  },
  {
    id: 11,
    title: "NetGene OS",
    category: "Sistemas & IoT",
    metric: "Cisco Network Auto",
    desc: "Sistema de automação e orquestração de infraestruturas de rede Cisco com monitorização de pacotes e diagnósticos avançados.",
    tech: ["Python", "Cisco APIs", "Packet Tracer", "Netflow", "Bash", "Network Security"],
    color: "#8b5cf6",
    icon: Activity,
    challenge: "Automatizar a configuração, validação e auditoria de topologias de rede complexas eliminando erros manuais de comandos CLI.",
    solution: "Scripts de orquestração com verificação proativa de estado de interfaces, tabelas de encaminhamento e análises de pacotes e tráfego em tempo real.",
    results: "Implementações de rede 80% mais rápidas e visibilidade instantânea sobre gargalos e anomalias na infraestrutura.",
    demoMessage: "Olá William, vi a tua especialização em Redes Cisco e NetGene OS. Gostaria de conversar."
  },
  {
    id: 12,
    title: "Sistema Emergente",
    category: "Sistemas & IoT",
    metric: "Real-Time Incident Sync",
    desc: "Plataforma de gestão e resposta rápida a incidentes de segurança e emergência com triagem e despachos automáticos.",
    tech: ["FastAPI", "React", "PostgreSQL", "WebSockets", "Docker", "GIS Maps"],
    color: "#ef4444",
    icon: Activity,
    challenge: "Transmitir alertas de emergência críticos com tempo de resposta instantâneo e coordenação eficiente de equipas no terreno.",
    solution: "Arquitetura orientada a eventos via WebSockets com mapa interativo de ocorrências e distribuição automatizada de tarefas por geolocalização.",
    results: "Tempo de despacho reduzido para segundos com histórico completo auditável de cada intervenção e alerta.",
    demoMessage: "Olá William, gostaria de conversar sobre a arquitetura do Sistema Emergente."
  },
  {
    id: 13,
    title: "Connect CPLP — Remessas & Wallet CPLP",
    category: "FinTech & Mobile",
    metric: "Stripe & Multi-Currency",
    desc: "Plataforma FinTech transfronteiriça de carteiras digitais, remessas instantâneas app-to-app, conversão multi-moeda e pagamentos Stripe no espaço CPLP.",
    tech: ["Next.js", "Firebase", "Stripe Live", "Twilio OTP", "Cloud Functions", "KYC Auth"],
    color: "#a855f7",
    icon: CreditCard,
    challenge: "Garantir transações transfronteiriças seguras com conversão dinâmica de divisas (EUR, Kz, MT, STN) e verificação rigorosa de KYC em redes com latência variável.",
    solution: "Arquitetura Serverless em Firebase Cloud Functions integrada com Stripe Checkout, autenticação OTP via Twilio e carteira multi-moeda com regras rígidas de segurança no Firestore.",
    results: "Sistema em produção para operações on-network com liquidação instantânea e total rastreabilidade financeira no espaço lusófono.",
    demoMessage: "Olá William, gostaria de ver uma demonstração da plataforma FinTech Connect CPLP."
  },
  {
    id: 14,
    title: "STPway Mobile Payment Application",
    category: "FinTech & Mobile",
    metric: "Gateway Bancário Nacional",
    desc: "Aplicação móvel de micropagamentos digitais e gateway bancário para São Tomé e Príncipe com enfileiramento offline e autenticação 2FA.",
    tech: ["React Native", "Firebase Auth", "reCAPTCHA Enterprise", "Offline Queue", "Banking APIs"],
    color: "#8b5cf6",
    icon: Smartphone,
    challenge: "Permitir micropagamentos e transferências bancárias seguras em ambientes com redes móveis de largura de banda muito instável.",
    solution: "Enfileiramento offline no cliente com transações assinadas localmente, integração com o gateway de pagamentos STPway e autenticação multinível com reCAPTCHA e OTP.",
    results: "Disponibilização do primeiro ecossistema de micropagamentos móveis integrados diretamente à rede bancária institucional de São Tomé e Príncipe.",
    demoMessage: "Olá William, gostaria de conversar sobre o aplicativo STPway Mobile e integração bancária."
  },
  {
    id: 15,
    title: "CST Mobile PWA & Billing",
    category: "FinTech & Mobile",
    metric: "PWA Carrier Integration",
    desc: "Solução PWA mobile e arquitetura de segurança para telecomunicações com aprovisionamento e gateway de pagamentos STPway.",
    tech: ["PWA", "Firebase Auth", "Firestore Rules", "STPway API", "REST", "Mobile Web"],
    color: "#14b8a6",
    icon: Smartphone,
    challenge: "Oferecer uma experiência de carregamento móvel instantânea para gestão de conta e pagamento de faturas de telecomunicações com máxima segurança de dados.",
    solution: "PWA otimizado com cache inteligente de recursos, autenticação multinível com Firebase e regras rígidas de segurança no Firestore.",
    results: "Aumento significativo na adoção digital de pagamentos e redução nas chamadas presenciais ao centro de atendimento.",
    demoMessage: "Olá William, gostaria de conhecer a arquitetura PWA e segurança da CST Mobile."
  },
  {
    id: 16,
    title: "EMAE Mobile Utility Platform",
    category: "FinTech & Mobile",
    metric: "Smart Utility Metering",
    desc: "Aplicação móvel institucional para gestão de consumo de energia e água, consulta de contadores e pagamentos de serviços públicos.",
    tech: ["React Native", "Expo", "REST API", "PDF Invoicing", "Push Notifications"],
    color: "#f97316",
    icon: Smartphone,
    challenge: "Digitalizar o acesso a faturas e histórico de consumos para milhares de clientes com uma interface simples e altamente acessível.",
    solution: "Desenvolvimento de app móvel intuitivo com geração estática de faturas em PDF, consulta de leitura de contadores e notificações push automatizadas.",
    results: "Redução das filas presenciais de atendimento e maior transparência nos consumos dos utilizadores.",
    demoMessage: "Olá William, gostaria de saber mais sobre a app EMAE Mobile Utility Platform."
  },
  {
    id: 17,
    title: "Vrum Mobility Platform",
    category: "FinTech & Mobile",
    metric: "Instant Booking App",
    desc: "Plataforma móvel de aluguer e gestão de frota de veículos com geolocalização em tempo real e reservas automatizadas.",
    tech: ["React Native", "TypeScript", "Expo", "Maps API", "Node.js", "Payment Gateway"],
    color: "#0284c7",
    icon: Smartphone,
    challenge: "Disponibilizar um fluxo de reserva de veículos fluido com verificação de documentos e acompanhamento GPS em tempo real.",
    solution: "Aplicação móvel nativa com mapas vetoriais interativos, agendamento em 3 passos e pagamentos digitais integrados.",
    results: "Aumento de 45% nas reservas efetuadas via dispositivos móveis e otimização total na gestão da frota.",
    demoMessage: "Olá William, vi a app Vrum Mobility e gostaria de discutir uma parceria."
  },
  {
    id: 18,
    title: "CLMA - Engenharia & Construção",
    category: "Web Apps & Retalho",
    metric: "-40% Taxa de Rejeição",
    desc: "Website institucional premium de alta fidelidade visual com micro-interações elegantes para construtora renomada.",
    tech: ["React", "Vite", "Framer Motion", "Radix UI", "CSS Modules"],
    color: "#6366f1",
    icon: Globe,
    challenge: "Refletir a robustez, precisão técnica e sofisticação de grandes obras de engenharia civil num design web interativo e acessível.",
    solution: "Construção de componentes base com Radix UI, estilizados com Vanilla CSS responsivo avançado e físicas de animação fluidas criadas no Framer Motion.",
    results: "Redução de 40% na taxa de rejeição e aumento significativo nas conversões e pedidos de cotação corporativos.",
    demoMessage: "Olá William, vi o site da CLMA e gostei muito das animações. Podemos falar?"
  },
  {
    id: 19,
    title: "Massagem & Spa Booking Platform",
    category: "Web Apps & Retalho",
    metric: "Online Booking System",
    desc: "Plataforma web de agendamento online de tratamentos de bem-estar com gestão de horários e integração de pagamentos.",
    tech: ["React", "Vite", "CSS3", "Booking Engine", "WhatsApp API"],
    color: "#ec4899",
    icon: Globe,
    challenge: "Oferecer uma experiência de reserva relaxante e sem fricção com confirmação direta pelo WhatsApp.",
    solution: "Design minimalista e fluido, calendário interativo em tempo real e integração direta de lembretes instantâneos no WhatsApp.",
    results: "Otimização da agenda dos terapeutas com conversão imediata de visitantes em marcações efetuadas.",
    demoMessage: "Olá William, tenho interesse no sistema de agendamentos web para Spa & Massagens."
  },
  {
    id: 20,
    title: "Varejo Retail OS & POS",
    category: "Web Apps & Retalho",
    metric: "Multi-Tenant POS",
    desc: "Sistema de gestão de pontos de venda (POS), inventário e faturação para estabelecimentos de retalho e comércio.",
    tech: ["Next.js", "Firebase", "Firestore", "TailwindCSS", "Cloud Functions"],
    color: "#10b981",
    icon: Globe,
    challenge: "Registar vendas e atualizar inventários em múltiplos terminais em tempo real com funcionamento garantido mesmo com instabilidade de rede.",
    solution: "Arquitetura Serverless em Firebase com sincronização offline no cliente e regras avançadas de acesso aos dados.",
    results: "Tempo de registo de caixas 50% mais rápido com dados consolidados de vendas em dashboards em tempo real.",
    demoMessage: "Olá William, gostaria de conversar sobre a plataforma Varejo Retail OS."
  },
  {
    id: 21,
    title: "EcoSEO Acquisition Engine",
    category: "Cloud & Growth",
    metric: "Playwright Automation",
    desc: "Checklist operacional, automação de testes de tráfego com Playwright e painel analítico para crescimento orgânico.",
    tech: ["Playwright", "SEO Strategy", "Digital Marketing", "Analytics", "Node.js"],
    color: "#22c55e",
    icon: BarChart,
    challenge: "Automatizar e monitorizar campanhas de SEO e aquisição de leads a fim de otimizar conversões com orçamentos previsíveis.",
    solution: "Criação de scripts em Playwright que rastreiam concorrentes e posições de pesquisa orgânica. Desenvolvimento de checklists de conteúdo otimizados por IA e um dashboard analítico integrado.",
    results: "Estruturou a arquitetura de marketing digital para atingir taxas elevadas de receita e apoiou os lançamentos de produtos SaaS no Product Hunt.",
    demoMessage: "Olá William, gostava de falar sobre estratégias de crescimento e SEO para os meus produtos."
  },
  {
    id: 22,
    title: "WGF SaaS Infrastructure Monorepo",
    category: "Cloud & Growth",
    metric: "Multi-Tenant Monorepo",
    desc: "Arquitetura de infraestrutura SaaS escalável em monorepo com Docker Compose, CI/CD pipelines e scripts de proteção automatizada.",
    tech: ["Docker", "Turborepo", "CI/CD GitHub Actions", "Nginx", "Linux", "DevOps"],
    color: "#64748b",
    icon: Cloud,
    challenge: "Orquestrar múltiplos serviços e pacotes partilhados de uma plataforma SaaS multi-tenant garantindo pipelines limpos de deploy e segurança.",
    solution: "Estrutura monorepo com configurações reutilizáveis de Docker, scripts de hardening de segurança e implantação contínua automatizada.",
    results: "Facilidade de manutenção de múltiplos microsserviços com tempos de deploy reduzidos a minutos e isolamento estrito de ambientes.",
    demoMessage: "Olá William, gostaria de saber mais sobre a tua arquitetura de Monorepo SaaS em Docker."
  }
];

const categories = [
  "Todos", 
  "Cibersegurança & Kernel", 
  "IA & Agentes Autónomos", 
  "Sistemas & IoT", 
  "FinTech & Mobile", 
  "Web Apps & Retalho", 
  "Cloud & Growth"
];

function Showcase() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleMouseMove = (e, cardElem) => {
    const rect = cardElem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section id="projects" className="showcase-section">
      <div className="section-header">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-badge"
        >
          <Sparkles size={14} /> {t.showcase.badge}
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          {t.showcase.titleStart} <span className="text-gradient">{t.showcase.titleGrad}</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-desc"
        >
          {t.showcase.desc}
        </motion.p>

        {/* Counter Metrics Row */}
        <div className="metrics-counter-row">
          <div className="metric-box">
            <span className="metric-num">22</span>
            <span className="metric-label">{t.showcase.metric1}</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">&lt; 1ms</span>
            <span className="metric-label">{t.showcase.metric2}</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">100%</span>
            <span className="metric-label">{t.showcase.metric3}</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">6+</span>
            <span className="metric-label">{t.showcase.metric4}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-container">
        <div className="category-tabs glass-effect">
          {categories.map((cat, idx) => {
            const count = cat === "Todos" 
              ? projects.length 
              : projects.filter(p => p.category === cat).length;

            const categoryKeyMap = {
              "Todos": t.showcase.categories.all,
              "Cibersegurança & Kernel": t.showcase.categories.cyber,
              "IA & Agentes Autónomos": t.showcase.categories.ai,
              "Sistemas & IoT": t.showcase.categories.iot,
              "FinTech & Mobile": t.showcase.categories.fintech,
              "Web Apps & Retalho": t.showcase.categories.web,
              "Cloud & Growth": t.showcase.categories.cloud
            };

            return (
              <button
                key={idx}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{categoryKeyMap[cat] || cat}</span>
                <span className="category-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout 
        className="projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <TiltCard key={project.id} maxTilt={10}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="project-card spotlight-card"
                  onClick={() => setSelectedProject(project)}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  style={{ 
                    "--card-accent-color": project.color,
                    "--mouse-x": `${mousePos.x}px`,
                    "--mouse-y": `${mousePos.y}px`
                  }}
                >
                  <div className="spotlight-overlay" />
                  
                  <div className="project-top-row">
                    <div className="project-header-icon" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                      <IconComponent size={24} />
                    </div>
                    {project.metric && (
                      <span className="project-metric-pill" style={{ borderColor: `${project.color}40`, color: project.color, backgroundColor: `${project.color}10` }}>
                        ⚡ {project.metric}
                      </span>
                    )}
                  </div>
                  
                  <span className="project-category" style={{ color: project.color }}>{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-tech">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="tech-tag">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="tech-tag-more">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <div className="project-card-footer">
                    <button className="btn-read-more" style={{ color: project.color }}>
                      Ver Caso de Estudo <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-window glass-effect"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                <X size={20} />
              </button>

              <div className="modal-header">
                <span className="modal-category" style={{ color: selectedProject.color }}>
                  {selectedProject.category}
                </span>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <div className="modal-tech-stack">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="modal-tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-body-content">
                <div className="modal-section-block">
                  <h4 className="modal-section-title">
                    <CheckCircle2 size={18} style={{ color: selectedProject.color }} /> {t.showcase.modal.challenge}
                  </h4>
                  <p>{selectedProject.challenge}</p>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-section-title">
                    <Cpu size={18} style={{ color: selectedProject.color }} /> {t.showcase.modal.solution}
                  </h4>
                  <p>{selectedProject.solution}</p>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-section-title">
                    <BarChart size={18} style={{ color: selectedProject.color }} /> {t.showcase.modal.results}
                  </h4>
                  <p>{selectedProject.results}</p>
                </div>

                {/* Banner de Oportunidades Comerciais & Parcerias */}
                <div className="modal-commercial-banner glass-effect" style={{ borderColor: `${selectedProject.color}40`, background: `${selectedProject.color}08` }}>
                  <h5 style={{ color: selectedProject.color, margin: '0 0 0.4rem 0', fontWeight: 800 }}>
                    {t.showcase.modal.commercialTitle}
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {t.showcase.modal.commercialDesc}
                  </p>
                </div>
              </div>

              <div className="modal-footer-actions">
                <a 
                  href={`https://wa.me/351939060342?text=${encodeURIComponent(`Olá William, gostei do projeto ${selectedProject.title} e tenho interesse em adquirir / comprar o projeto ou ver uma demonstração.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ background: `linear-gradient(135deg, ${selectedProject.color}, #3b82f6)` }}
                >
                  <ExternalLink size={16} /> {t.showcase.modal.btnBuy}
                </a>

                <a 
                  href={`https://wa.me/351939060342?text=${encodeURIComponent(`Olá William, gostaria de propor uma parceria comercial ou investimento para o projeto ${selectedProject.title}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ borderColor: `${selectedProject.color}60` }}
                >
                  🤝 {t.showcase.modal.btnPartner}
                </a>

                <button className="btn-secondary" onClick={() => setSelectedProject(null)}>
                  {t.showcase.modal.btnClose}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Showcase;
