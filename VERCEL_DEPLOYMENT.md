# 🚀 Manual de Alojamento (Deploy) e Domínio — Vercel

Este guia explica como colocar o portfólio da **WGF Technologies** online de forma gratuita e associar um domínio personalizado (ex: `wgftechnologies.com`).

---

## Passo 1: Alojamento Gratuito na Vercel

Existem duas formas principais de publicar o seu site na Vercel:

### Método A: Ligação Direta ao GitHub (Recomendado)
Este método configura uma conduta de entrega contínua (CI/CD). Sempre que fizer `git push` no seu repositório, o site é atualizado automaticamente!

1.  Crie uma conta gratuita em [vercel.com](https://vercel.com) (pode fazer login diretamente com a sua conta GitHub).
2.  No painel da Vercel, clique em **Add New...** e depois em **Project**.
3.  Importe o seu repositório GitHub (`wgf-technologies-portfolio` ou o nome que der ao repositório).
4.  A Vercel deteta automaticamente que o projeto usa **Vite**. As configurações padrão estão corretas:
    *   **Framework Preset**: `Vite`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  Clique em **Deploy**. O seu site estará online em menos de 1 minuto sob um subdomínio gratuito (ex: `wgf-technologies.vercel.app`).

### Método B: Utilizando a Vercel CLI (Sem GitHub)
Se preferir fazer deploy diretamente do seu terminal local:

1.  Abra o terminal na pasta do projeto e instale a CLI globalmente:
    ```bash
    npm install -g vercel
    ```
2.  Faça login na sua conta:
    ```bash
    vercel login
    ```
3.  Inicie o deploy executando:
    ```bash
    vercel
    ```
    *Responda às perguntas padrão (carregue em Enter para a maioria).*
4.  Para promover a produção final:
    ```bash
    vercel --prod
    ```

---

## Passo 2: Comprar e Configurar um Domínio Personalizado

Depois de o site estar publicado, pode associar um domínio próprio.

### Opção 1: Comprar diretamente pela Vercel (Mais Fácil)
Esta é a forma mais simples, pois a Vercel configura todos os servidores de DNS e certificados SSL automaticamente para si.

1.  No painel do seu projeto na Vercel, vá a **Settings** (Definições) -> **Domains** (Domínios).
2.  Na caixa de texto, escreva o domínio desejado (ex: `wgftechnologies.com` ou `willanfernandes.dev`) e clique em **Add**.
3.  Se o domínio estiver disponível, a Vercel apresentará a opção de o comprar diretamente.
4.  Siga os passos de pagamento e registo. O domínio ficará ativo e ligado ao seu site de imediato.

### Opção 2: Comprar num registador externo (ex: Cloudflare, GoDaddy, Namecheap)
Se preferir comprar noutro fornecedor por questões de preço ou gestão centralizada:

1.  Compre o domínio no registador da sua escolha.
2.  Vá a **Settings** -> **Domains** no painel do projeto na Vercel.
3.  Introduza o domínio comprado e clique em **Add**.
4.  A Vercel indicará que o domínio necessita de configuração e apresentará duas alternativas:
    *   **Configuração por Name Servers (Recomendado)**: Substitua os servidores de nome (DNS) no painel do seu registador pelos da Vercel:
        *   `ns1.vercel-dns.com`
        *   `ns2.vercel-dns.com`
    *   **Configuração por Registos A / CNAME**: Se tiver e-mails corporativos ativos no domínio e não quiser mudar os Name Servers, adicione estes dois registos na zona DNS do seu registador:
        *   Registo tipo `A` para `@` a apontar para `76.76.21.21`
        *   Registo tipo `CNAME` para `www` a apontar para `cname.vercel-dns.com`
5.  Aguarde a propagação do DNS (geralmente demora de 10 minutos a algumas horas). A Vercel ativará automaticamente um certificado de segurança **SSL (HTTPS)** gratuito.
