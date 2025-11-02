# Carousel de Reviews KaBuM! (UIkit, JS Puro & Performance Otimizada)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![UIkit](https://img.shields.io/badge/UIkit-2396F3?style=for-the-badge&logo=uikit&logoColor=white)
![Performance](https://img.shields.io/badge/Performance-Otimizado-brightgreen?style=for-the-badge&logo=googlechrome&logoColor=white)

Componente de carrossel de reviews em vídeo, projetado para integração em PDPs (Páginas de Produto) do KaBuM!. O projeto demonstra domínio de JavaScript "vanilla", otimização de performance em e-commerce e gerenciamento de estado da UI.

O foco principal é a **experiência do usuário (UX)** e a **performance de carregamento (Core Web Vitals)**, implementados através de um "efeito gaveta" (accordion) e do padrão de design "Video Facade" (Fachada de Vídeo).

---

## 🚀 Deploy (Demonstração)

**Acesse a versão live do projeto:**

> <a href="https://mateusfgc.github.io/Carousel-KaBuM/" target="_blank"><strong>Clique aqui para ver a LP no ar</strong></a>

---

## ✨ Destaques e Habilidades Técnicas

Este projeto foi construído analisando os *trade-offs* de diferentes implementações para alcançar a melhor performance e UX.

### 1. Otimização de Performance: O Padrão "Video Facade"
Para solucionar o alto custo de `iframes` do YouTube em uma PDP (que prejudica o Lighthouse), implementei o padrão "Video Facade":
* **Lógica "Click-to-Load":** O carrossel carrega apenas `<img>` (thumbnails) leves. O `iframe` de cada vídeo já existe no DOM, mas está oculto (`display: none`).
* **Ação do `kabum-script.js`:** A função `showVideo` escuta o clique na thumbnail, esconde a `<img>` (adicionando `.kabum-hidden`) e exibe o `iframe` (`style.display = 'block'`).
* **Resultado:** O pesado player do YouTube só é carregado **após a interação** do usuário, garantindo um *Time to Interactive (TTI)* e *Largest Contentful Paint (LCP)* muito mais rápidos para a página.

### 2. Decisão de Arquitetura: `iframe` no HTML vs. `createElement()`
A escolha de manter o `iframe` no HTML (oculto) em vez de criá-lo dinamicamente via JS (`document.createElement`) foi uma decisão de arquitetura intencional:
* **Fundamento:** Embora criar o elemento com JS seja uma opção, manter o `iframe` no DOM (mesmo que oculto) **evita o *Cumulative Layout Shift (CLS)* (Mudança de Layout Cumulativa)**. O espaço para o vídeo já está "reservado" no layout, impedindo que a página "salte" quando o vídeo for carregado, o que é uma métrica crucial do Core Web Vitals.
* **Performance Garantida:** A otimização de *carregamento* não é perdida, pois é garantida por duas camadas: a lógica JS "Click-to-Load" e o **atributo nativo `loading="lazy"`**, que instrui o navegador a adiar o download do `iframe` até que seja necessário.

### 3. "Efeito Gaveta" (Accordion) com Gerenciamento de Estado
Para melhorar a UX e permitir que o usuário organize a página, o componente possui um "efeito gaveta":
* **Gerenciamento de Estado (JS):** A função `selectHidden` no `kabum-script.js` atua como um controlador de estado. Ela não apenas alterna a classe `.kabum-hidden` no carrossel, mas também atualiza o atributo `data-state` no ícone da seta.
* **Separação de Preocupações (CSS):** O `kabum-css.css` é responsável *apenas* pela apresentação. Ele usa `transition: max-height` para a animação suave da gaveta e `transform: rotate` baseado no seletor de atributo `[data-state="open"]`, demonstrando uma separação limpa entre lógica e estilo.

---

## 🛠️ Stack Tecnológica

* **HTML5:** Estrutura semântica e atributos de performance (`loading="lazy"`).
* **CSS3 (`kabum-css.css`):** Transições (`max-height`, `transform`) e seletores de atributo (`data-state`) para animação.
* **JavaScript (`kabum-script.js`):** Manipulação de DOM, gerenciamento de estado (`data-state`) e lógica de "Video Facade" (click-to-load).
* **UIkit:** Framework base para a funcionalidade do carrossel.

---

## 📂 Como Executar o Projeto Localmente

Nenhuma instalação é necessária.

```bash
# 1. Clone o repositório
git clone [https://github.com/MateusFGC/Carousel-KaBuM.git](https://github.com/MateusFGC/Carousel-KaBuM.git)

# 2. Entre na pasta do projeto
cd Carousel-KaBuM

# 3. Abra o arquivo `index.html` no seu navegador de preferência.
