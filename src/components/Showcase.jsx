import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X, ExternalLink, Cpu, Shield, Smartphone, Globe, BarChart } from 'lucide-react';
import './Showcase.css';

const projects = [
  {
    id: 1,
    title: "Sistema NGAV & EDR Enterprise",
    category: "Cibersegurança",
    desc: "Plataforma avançada de segurança endpoint. Agente Linux eBPF em Rust, painel SOC e telemetria Windows via Driver Ring-0.",
    tech: ["Rust", "eBPF", "C", "Kernel Driver", "AI Engine"],
    color: "#3b82f6",
    icon: Shield,
    challenge: "Monitorizar atividades suspeitas ao nível do Kernel do sistema operativo em tempo real, sem prejudicar o desempenho de CPU e consumo de memória.",
    solution: "Criação de sondas eBPF no Linux e um driver personalizado de Ring-0 no Windows que capturam telemetria bruta em tempo de execução. As assinaturas comportamentais são processadas localmente por um motor leve de inteligência artificial.",
    results: "Latência de deteção de ameaças inferior a 1 milissegundo, com um consumo de memória fixado abaixo dos 20MB por endpoint.",
    demoMessage: "Olá William, gostaria de ver uma demonstração do teu Sistema NGAV e EDR Enterprise."
  },
  {
    id: 2,
    title: "AI Site Shield",
    category: "Cibersegurança",
    desc: "SaaS MVP para revisão defensiva e varredura automática de segurança em sites e pequenos aplicativos gerados por inteligência artificial.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Dramatiq"],
    color: "#00f2fe",
    icon: Shield,
    challenge: "Validar em segundos se código gerado por ferramentas de IA não contém segredos expostos, CORS inseguro, injeção de prompts ou falhas de supply chain.",
    solution: "Desenvolvimento de uma arquitetura baseada em microserviços assíncronos. A API FastAPI recebe pacotes ZIP ou links do GitHub, insere as tarefas numa fila do Redis gerida pelo Dramatiq e executa uma suite de regras estáticas personalizadas.",
    results: "Scans concluídos em menos de 10s com relatórios completos HTML/JSON e integrações automatizadas para correção imediata do código.",
    demoMessage: "Olá William, gostaria de conversar sobre a arquitetura e testes do SaaS AI Site Shield."
  },
  {
    id: 3,
    title: "WGF SenseOS",
    category: "Sistemas & IoT",
    desc: "SaaS inovador de monitoramento ambiental e indoor localization usando sinais Wi-Fi. 100% livre de câmaras ou vestíveis.",
    tech: ["Wi-Fi Sensing", "FastAPI", "ZKP", "Gait Analysis", "Firebase"],
    color: "#10b981",
    icon: Cpu,
    challenge: "Efetuar contagem e localização tridimensional (eixo vertical Z) de pessoas e queda de idosos com total garantia de privacidade corporal.",
    solution: "Captura de dados de rádio CSI (Channel State Information) de roteadores mesh comuns. Aplicámos filtros de frequência respiratória biológica (0.1-0.5 Hz) e classificação baseada em inteligência artificial local, enviando apenas provas matemáticas de conhecimento zero (ZKP) para a nuvem.",
    results: "Precisão na deteção de quedas de 98.4% e redução de custos energéticos em até 35% ao integrar com sistemas prediais HVAC de climatização.",
    demoMessage: "Olá William, achei o WGF SenseOS fantástico. Podes dar-me mais detalhes técnicos?"
  },
  {
    id: 4,
    title: "WGF Note",
    category: "Sistemas & IoT",
    desc: "Editor de código local-first híbrido desktop de alta performance com assistente de IA offline integrado via Ollama.",
    tech: ["Electron", "Expo", "React Native", "Ollama", "Hermes AI"],
    color: "#f59e0b",
    icon: Cpu,
    challenge: "Construir uma IDE extremamente veloz com sincronização em nuvem segura, paleta de comandos offline e chat de IA de grande contexto na máquina local do programador.",
    solution: "Criação de um app multiplataforma usando React Native compilado para desktop (Electron) e mobile (Expo). O assistente de código integra-se localmente com o Ollama e executa um sidecar do agente de IA Hermes em ambiente WSL2.",
    results: "Funciona de forma 100% offline, processando contextos de código de até 64K tokens e garantindo produtividade total sem partilha de dados sensíveis externa.",
    demoMessage: "Olá William, gostava de saber mais sobre a integração da IA local e o WGF Note."
  },
  {
    id: 5,
    title: "Connect CPLP & STPway",
    category: "Mobile",
    desc: "Aplicações de pagamentos digitais móveis com dupla autenticação de segurança para o mercado de São Tomé e Príncipe.",
    tech: ["React Native", "Firebase Auth", "reCAPTCHA", "OTP Delivery"],
    color: "#a855f7",
    icon: Smartphone,
    challenge: "Garantir a total fiabilidade e integridade das transações financeiras em ambientes com redes móveis de largura de banda muito instável.",
    solution: "Implementação de enfileiramento offline com transações assinadas localmente, autenticação Firebase fortalecida com reCAPTCHA Enterprise e canais redundantes de entrega de código OTP via SMS e e-mail.",
    results: "Lançamento bem-sucedido de micropagamentos móveis integrados diretamente ao gateway bancário institucional STPway.",
    demoMessage: "Olá William, tenho interesse no teu portfólio mobile FinTech e na integração da STPway."
  },
  {
    id: 6,
    title: "SUPER CKDO",
    category: "Web Apps",
    desc: "Plataforma web de comércio eletrónico premium para o supermercado de referência em São Tomé e Príncipe.",
    tech: ["Next.js 16", "TypeScript", "TailwindCSS", "shadcn/ui"],
    color: "#ec4899",
    icon: Globe,
    challenge: "Disponibilizar uma interface moderna com carregamento instantâneo (LCP otimizado) em redes móveis de baixa velocidade.",
    solution: "Uso do Next.js App Router com geração estática incremental (ISR). Otimização agressiva de assets na CDN e componentes acessíveis com Radix UI para uma experiência fluida de compra.",
    results: "Atingiu uma pontuação de 99/100 no Google Lighthouse Mobile, com tempo de carregamento inicial menor que 0.8 segundos.",
    demoMessage: "Olá William, gostaria de saber mais sobre a plataforma e-commerce do SUPER CKDO."
  },
  {
    id: 7,
    title: "CLMA - Engenharia",
    category: "Web Apps",
    desc: "Website institucional premium de alta fidelidade visual com micro-interações elegantes para construtora renomada.",
    tech: ["React", "Vite", "Framer Motion", "Radix UI"],
    color: "#6366f1",
    icon: Globe,
    challenge: "Refletir a robustez, precisão técnica e sofisticação de grandes obras de engenharia civil num design web interativo e acessível.",
    solution: "Construção de componentes base com Radix UI, estilizados com Vanilla CSS responsivo avançado e físicas de animação fluidas criadas no Framer Motion.",
    results: "Redução de 40% na taxa de rejeição e aumento significativo nas conversões e pedidos de cotação corporativos.",
    demoMessage: "Olá William, vi o site da CLMA e gostei muito das animações. Podemos falar?"
  },
  {
    id: 8,
    title: "EcoSEO Acquisition",
    category: "Digital Growth",
    desc: "Checklist operacional, automação de testes de tráfego com Playwright e painel analítico para crescimento orgânico.",
    tech: ["Playwright", "SEO Strategy", "Digital Marketing", "Analytics"],
    color: "#22c55e",
    icon: BarChart,
    challenge: "Automatizar e monitorizar campanhas de SEO e aquisição de leads a fim de otimizar conversões com orçamentos previsíveis.",
    solution: "Criação de scripts em Playwright que rastreiam concorrentes e posições de pesquisa orgânica. Desenvolvimento de checklists de conteúdo otimizados por IA e um dashboard analítico integrado.",
    results: "Estruturou a arquitetura de marketing digital para atingir taxas elevadas de receita e apoiou os lançamentos de produtos SaaS no Product Hunt.",
    demoMessage: "Olá William, gostava de falar sobre estratégias de crescimento e SEO para os meus produtos."
  }
];

const categories = ["Todos", "Cibersegurança", "Sistemas & IoT", "Web Apps", "Mobile", "Digital Growth"];

function Showcase() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="showcase-section">
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Projetos de <span className="text-gradient">Engenharia e Inovação</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-desc"
        >
          Explore a seleção de soluções desenvolvidas sob o rigor e precisão da engenharia de software e cibersegurança.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-container">
        <div className="category-tabs glass-effect">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
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
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{ "--card-accent-color": project.color }}
              >
                <div className="project-header-icon" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                  <IconComponent size={28} />
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
                    Saber Mais <span className="arrow-icon">→</span>
                  </button>
                </div>
              </motion.div>
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
                  <h4 className="modal-section-title">O Desafio Técnico</h4>
                  <p>{selectedProject.challenge}</p>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-section-title">Arquitetura & Solução</h4>
                  <p>{selectedProject.solution}</p>
                </div>

                <div className="modal-section-block">
                  <h4 className="modal-section-title">Resultados de Impacto</h4>
                  <p>{selectedProject.results}</p>
                </div>
              </div>

              <div className="modal-footer-actions">
                <a 
                  href={`https://wa.me/351939060342?text=${encodeURIComponent(selectedProject.demoMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={16} /> Agendar Demonstração
                </a>
                <button className="btn-secondary" onClick={() => setSelectedProject(null)}>
                  Fechar
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
