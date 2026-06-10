# Guia de Integração 3D: Spline & Theatre.js

Este manual serve como guia de engenharia para continuar a expandir os recursos 3D do seu website, explicando como integrar cenas completas do **Spline** e criar animações complexas controladas por scroll usando o **Theatre.js**.

---

## 1. Integração com o Spline

O [Spline](https://spline.design/) permite desenhar cenas interativas em 3D no navegador e exportá-las diretamente para a Web. Existem duas formas recomendadas de integração:

### Opção A: Usando o `@splinetool/react-spline` (Recomendado para React)

Esta opção instala o wrapper oficial de React do Spline.

#### Passo 1: Instalar o pacote
```bash
npm install @splinetool/react-spline @splinetool/runtime
```

#### Passo 2: Criar e Renderizar o Componente
Exporte a sua cena no Spline e selecione a opção **"Code" -> "React"**. Obterá um link `.splinecode` (ex: `https://prod.spline.design/.../scene.splinecode`).

Crie um componente, por exemplo, `SplineHero.jsx`:
```jsx
import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <div className="spline-container" style={{ width: '100%', height: '500px' }}>
      <Suspense fallback={<div className="loading">A carregar holograma 3D...</div>}>
        <Spline scene="https://prod.spline.design/seu-id-da-cena/scene.splinecode" />
      </Suspense>
    </div>
  );
}
```

---

### Opção B: Usando o `<spline-viewer>` (Mais Leve)

Se preferir não adicionar mais dependências de React ao bundle principal, pode usar o Web Component oficial do Spline, que carrega via CDN de forma assíncrona.

#### Passo 1: Adicionar o script no `index.html`
Adicione esta tag na secção `<head>` do seu `index.html`:
```html
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js"></script>
```

#### Passo 2: Utilizar no JSX
Pode colocar a tag diretamente nos seus ficheiros `.jsx`:
```jsx
export default function SplineViewerObject() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <spline-viewer 
        url="https://prod.spline.design/seu-id-da-cena/scene.splinecode"
        loading-as-hover="true"
      ></spline-viewer>
    </div>
  );
}
```

*Nota: No React 18, para evitar avisos de TypeScript/Lint sobre tags desconhecidas, pode ser necessário declarar o elemento ou apenas ignorar o aviso de validação da tag.*

---

## 2. Animação Avançada com o Theatre.js

O [Theatre.js](https://www.theatrejs.com/) é um estúdio de animação completo integrado no navegador. Permite animar posições, rotações, cores e luzes de componentes Three.js (ou elementos HTML normais) usando uma timeline de frames-chave (keyframes), muito parecido com o After Effects ou Blender.

### Passo 1: Instalar dependências
```bash
npm install @theatre/core @theatre/studio
```

### Passo 2: Inicializar o Estúdio de Animação
No seu ficheiro de entrada principal (`src/main.jsx`), ative o estúdio visual apenas em ambiente de desenvolvimento:
```javascript
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension'; // se usar react-three-fiber

if (process.env.NODE_ENV === 'development') {
  studio.initialize();
  studio.extend(extension); // Permite interface gráfica no browser para mover objetos
}
```

### Passo 3: Criar um Projeto e uma Planilha (Sheet)
No componente onde tem o seu objeto Three.js:
```javascript
import { getProject, types } from '@theatre/core';

// Inicializa o projeto da animação
const project = getProject('WGF 3D Project');
const sheet = project.sheet('Hero Animation');

// Cria um objeto animável com propriedades editáveis
const cameraObj = sheet.object('Camera', {
  position: types.compound({
    x: types.number(0, { range: [-100, 100] }),
    y: types.number(0, { range: [-100, 100] }),
    z: types.number(8, { range: [-100, 100] }),
  }),
  rotation: types.compound({
    y: types.number(0, { range: [-Math.PI, Math.PI] }),
  })
});
```

### Passo 4: Sincronizar as Propriedades com o Three.js
Atualize os elementos 3D no render loop sempre que a timeline mudar:
```javascript
// O Theatre.js avisa quando os valores mudam na timeline
cameraObj.onValuesChange((values) => {
  camera.position.set(values.position.x, values.position.y, values.position.z);
  camera.rotation.y = values.rotation.y;
});
```

### Passo 5: Sincronizar Animação com o Scroll da Página
Para conseguir o efeito cinemático estilo `peachweb.io`, onde o scroll controla a reprodução da timeline 3D:

1. **Obter a duração total da sequência:**
   ```javascript
   let sequenceDuration = 0;
   project.ready.then(() => {
     sequenceDuration = sheet.sequence.length;
   });
   ```

2. **Mapear a percentagem do scroll da página para o tempo da sequência:**
   ```javascript
   window.addEventListener('scroll', () => {
     const scrollTop = window.scrollY;
     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
     const scrollFraction = scrollTop / docHeight; // Valor entre 0 e 1
     
     if (sequenceDuration > 0) {
       // Move o indicador da timeline para a posição exata baseada no scroll
       const targetTime = scrollFraction * sequenceDuration;
       sheet.sequence.position = targetTime;
     }
   });
   ```

3. **Exportar a Animação:**
   Quando estiver satisfeito com o movimento criado na interface gráfica do Theatre.js Studio, clique em **"Export"** no painel do estúdio. Isto gerará um ficheiro JSON (ex: `state.json`). Importe-o no seu código de produção:
   ```javascript
   import projectState from './state.json';
   
   const project = getProject('WGF 3D Project', { state: projectState });
   ```

Combinando o **Three.js** (para renderizar), o **Spline** (para importar modelos texturizados e complexos) e o **Theatre.js** (para animar trajetórias com scroll), conseguirá criar experiências Web 3D extraordinárias.
