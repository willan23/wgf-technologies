# Implementação da auditoria — outubro 2026

Referência: `WGF_AUDITORIA_CODIGO_E_PROMPT_2026.md` (20 out 2026). Este documento regista o que foi
implementado neste ramo, o que ficou por fazer e como validar. Âmbito: apenas o frontend (este
repositório não tem backend).

## Baseline (antes de alterar)

- `npm ci` + `npm run build`: passaram (Node 24, Vite 5.4).
- Não existiam testes nem script `test`.

## Alterações por constatação

| # | Constatação | Estado | O que mudou |
|---|---|---|---|
| 1 | Formulários mostravam "Mensagem enviada" após abrir o `mailto:` | **Corrigido** | Novo `useLeadForm` (`src/lib/useLeadForm.js`) com estados `submitted` (Formspree confirmou HTTP 2xx) e `email_client` (mailto aberto, **nada enviado ainda**). `FormResult.jsx` mostra um ecrã distinto para cada caso, com "Abrir email novamente" e WhatsApp. Timeout de 15 s no Formspree. O aviso "formulário não configurado" só aparece quando falta o ID. |
| 1 | Validação | **Melhorado** | `src/lib/validation.js`: obrigatórios, formato de email, limites de tamanho, consentimento explícito; mensagens PT/EN/FR. `PartnerForm` passou a exigir consentimento (antes não verificava) e a mostrar erros. Labels "Organization"/"Category"/"Privacy" traduzidas. |
| 2 | Leads/CRM sem backend | **Pendente (requer decisão)** | Ver "Risco residual". |
| 3 | Analytics apenas em `localStorage` | **Clarificado** | Comentário explícito de que não são métricas de negócio. Revogar consentimento apaga o buffer local. Eventos de formulário incluem `delivery` (`submitted` / `email_client`) para distinguir os funis. |
| 4 | Data room sem controlo de acesso | **Sem documentos — mantido** | A página não contém ficheiros, só títulos bloqueados. `noindex` via `usePageMeta` + `X-Robots-Tag`. Comentário no código: robots não é autenticação. **Não publicar documentos aqui sem autenticação server-side.** |
| 5 | SEO: canonical fixo na homepage | **Corrigido** | `src/lib/seo.js` → `usePageMeta()` em todas as páginas: `title`, `description`, `canonical`, `og:*`, `twitter:*`, `robots` por rota. Produto inexistente/privado → `noindex`. |
| 5 | Sitemap manual | **Automatizado** | `scripts/generate-sitemap.mjs` gera `public/sitemap.xml` a partir de `getPublicProducts()`; corre em `prebuild`. Produtos `public:false` nunca entram. |
| 5 | hreflang | **Não aplicado (intencional)** | O idioma é estado do cliente, sem URLs por idioma; `hreflang` apontaria para a mesma URL e seria incorreto. Requer rotas `/pt`, `/en`, `/fr` + prerender. |
| 7 | CSP com `unsafe-inline` em scripts | **Corrigido** | `script-src 'self'` (o build não tem scripts inline executáveis; o JSON-LD é bloco de dados). Adicionados `object-src 'none'`, `upgrade-insecure-requests` e HSTS. `style-src 'unsafe-inline'` mantém-se (estilos inline do React/Framer Motion). `vite preview` aplica agora os mesmos cabeçalhos do `vercel.json`. |
| 8 | Consentimento sem revogação | **Corrigido** | Botão "Definições de cookies" no rodapé e na página Cookies (mostra a escolha atual) reabre o banner. |
| 9 | Portefólio | **Protegido por testes** | Testes garantem que só `public && ready && live/beta/mvp` aparecem, slugs únicos e URLs https. Reconciliação com outros projetos requer informação do negócio. |
| 10 | `.git/` e `dist/` no ZIP | **OK no repositório** | `.gitignore` já exclui `dist/`, `.env*`. Não distribuir ZIPs com `.git/`. |
| 11 | Pagamentos | **Não implementado** | Fora do âmbito do frontend; ver risco residual. Nenhum segredo encontrado em `src/` ou `dist/` (`sk_live`, `sk_test`, `rk_live`, `whsec_`). |
| 12 | Acessibilidade / desempenho | **Melhorado** | `MotionConfig reducedMotion="user"` respeita "reduzir movimento" em todas as animações Framer Motion. Fundo Three.js só com WebGL disponível e fora de dispositivos de baixa potência; pausa com o separador oculto; o `requestAnimationFrame` passou a ser cancelado no unmount (antes continuava a correr). `aria-label` nos botões só com ícone, `aria-expanded` no menu, `role="alert"` nos erros. |
| — | Navegação mobile (encontrado durante testes) | **Corrigido** | A navegação desktop aparecia e transbordava em ecrãs < 1100 px porque `index.css` (`.main-nav {display:flex}`) sobrepunha `Layout.css`. |

## Fase 2 e 3 — identidade, UX e catálogo

| Área | O que mudou |
|---|---|
| Hero | Faixa "Disponível agora" com links diretos para os produtos `live` (Connect-CPLP, STPway). |
| Prova factual | Faixa de números **derivados de `src/data/products.js`** (produtos públicos, em produção, em beta/MVP) — nenhum número inventado; atualiza-se sozinha. |
| CTAs por público | Secção "Um estúdio, três formas de trabalhar juntos": clientes (demo → `/contact?type=product`), parceiros, investidores. Substitui os dois painéis soltos de investidor/parceiro. |
| Como trabalhamos | Passos numerados com descrição, agora traduzidos (antes "We build." aparecia em inglês em PT/FR). |
| Cartões de produto | Cartão inteiro clicável, tags de mercado/modelo, link externo "Visitar site", hover/focus visíveis. |
| Portfólio | Pesquisa (ignora acentos), filtros por mercado e estado, contador de resultados, estado vazio; filtros no URL (`?q=&market=&status=`) para partilha. |
| 404 | Página "não encontrada" real com `noindex` (antes redirecionava para `/`, um soft-404). |
| Acessibilidade | Link "Saltar para o conteúdo", `sr-only`, `aria-pressed` nos filtros, `aria-live` no contador, hover sem movimento com "reduzir movimento". |
| Idioma | Títulos que estavam em inglês nas versões PT/FR traduzidos (portfólio, sobre, investidores, data room, rodapé, badge). Mantidos termos de uso corrente: Pitch Deck, Cap Table, Family Office. |

## Produção (21 out 2026)

- **Deep links 404** (PR #2): com `cleanUrls`, a rewrite SPA tem de apontar para `/`, não `/index.html`.
  Todas as rotas exceto `/` davam 404 ao abrir diretamente — erro anterior a esta auditoria.
- **Formulários**: `VITE_FORMSPREE_CONTACT_ID` / `_INVESTOR_ID` / `_PARTNER_ID` definidos no projeto Vercel
  `willan23-wgf-technologies` (o que serve `www.wgf-technologies.site`). Envio real testado e recebido.

## Conteúdo em PT/FR e prerender de SEO

| Área | O que mudou |
|---|---|
| Produtos | Textos dos 4 produtos públicos traduzidos (categoria, descrição, problema, solução, tecnologia, mercado, roadmap, aviso legal do Memecoin OS). `localizeProduct()` aplica PT/FR com fallback para EN. Mercados/modelos de negócio mostram rótulos traduzidos mas mantêm o valor canónico no URL (`?market=Mobility`). |
| Dados | Mercados, áreas de tecnologia, categorias de parceiros e aplicação de capital traduzidos (`i18n` por item, helper `src/data/localize.js`). |
| Legal | Privacidade, Termos e Cookies em PT/FR (`src/data/legal.js`). Tradução fiel do EN — **recomenda-se revisão jurídica**. |
| Metadados | `src/lib/routeMeta.js` é a fonte única de título/descrição/robots por rota, usada pelas páginas e pelo build. Um teste garante que todas as rotas do `App.jsx` têm metadados. |
| Prerender | `scripts/prerender.mjs` corre no fim de `npm run build` e escreve `dist/<rota>.html` com título, descrição, canonical, Open Graph/Twitter, robots e JSON-LD de produto. Com `cleanUrls`, a Vercel serve esses ficheiros; Google e pré-visualizações (LinkedIn, WhatsApp) veem metadados corretos sem JavaScript. O HTML estático está em inglês (o idioma do visitante só é conhecido no browser). |

Limites: o prerender cobre o `<head>`, não o conteúdo da página (o corpo continua a ser renderizado pelo
React). Por isso `hreflang` continua a não se aplicar — exigiria URLs por idioma (`/pt/...`).

## Como validar

```bash
npm ci
npm test          # 22 testes: leads, publicação, sitemap, filtros, vercel.json, i18n, metadados, prerender
npm run build     # sitemap + vite build + prerender
npx vite preview  # serve com os cabeçalhos de produção (CSP, HSTS…)
```

Verificado manualmente no browser (preview com CSP de produção): sem erros de consola; canonical/robots
corretos em `/contact`, `/portfolio/stpway`, `/portfolio/wgf-ai-security` (noindex) e
`/investor-data-room` (noindex); validação localizada; revogação de cookies apaga eventos locais;
cabeçalho mobile a 375 px. **Não testado**: envio real via Formspree (sem ID configurado) nem o ecrã
`email_client` clicando em enviar (abriria o cliente de email da máquina); Lighthouse não foi medido.

## Risco residual / próximos passos (requerem decisão)

1. **Backend de leads (P1)** — endpoint server-side (ex.: Vercel Function) com validação, rate limiting,
   idempotência, armazenamento e email transacional. Requer escolher armazenamento e fornecedor de email.
2. **Data room (P0 se houver documentos)** — autenticação + autorização server-side, links expiráveis e
   auditoria antes de qualquer ficheiro confidencial.
3. **Pagamentos (P0 antes de cobrar)** — checkout server-side, webhooks assinados e idempotentes, estado
   `pending` para Multibanco; testar em sandbox. Rodar qualquer chave partilhada com terceiros.
4. ~~Prerender de metadados~~ feito. SSR/SSG do conteúdo completo e URLs por idioma (`hreflang`) ficam
   como evolução opcional.
5. **Analytics consentidos (P1)** — integrar um fornecedor (atualizando a CSP `connect-src`) antes de
   reportar conversões.
6. ~~Soft-404~~ resolvido com página 404 + `noindex`; um 404 HTTP real exige prerender ou função de servidor.
7. Componentes legados não usados (`Hero.jsx`, `ThreeDHeroObject.jsx`, `About.jsx`, `Showcase.jsx`…)
   continuam no repositório; remover após confirmação.

## Deploy e rollback

- Deploy: igual ao atual (Vercel, `npm run build`). Definir `VITE_FORMSPREE_*` no projeto Vercel para
  envio confirmado.
- Rollback: "Promote" do deploy anterior no painel Vercel, ou `git revert` deste commit.
- Se a CSP bloquear algo novo em produção (ex.: um script de terceiros), adicionar o domínio
  específico em `vercel.json` — não reintroduzir `'unsafe-inline'` em `script-src`.
