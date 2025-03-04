// styles.jsx
import styled, { createGlobalStyle, keyframes } from "styled-components";

/** Animação do gradiente */
export const vibrateGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

/** Declaração dos estilos globais */
export const GlobalStyle = createGlobalStyle`
  :root {
    /* Variáveis globais*/
    --e-global-color-primary: #FFFFFF;
    --e-global-color-secondary: #000000;
    --e-global-color-text: #000000;
    --e-global-color-accent: #000000;
    --e-global-color-azul: #55BFFF;
    --e-global-color-amarelo: #FFE950;
    --e-global-color-verde: #8EC63F;
    --e-global-typography-primary-font-family: "Roboto";
    --e-global-typography-primary-font-weight: 600;
    --e-global-typography-secondary-font-family: "Roboto Slab";
    --e-global-typography-secondary-font-weight: 400;
    --e-global-typography-text-font-family: "Roboto";
    --e-global-typography-text-font-weight: 400;
    --e-global-typography-accent-font-family: "Roboto";
    --e-global-typography-accent-font-weight: 500;
  }

  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Roboto", sans-serif;
    background: #fff;
    color: #000;
    overflow-x: hidden;
  }

  /* ---------- Estilos do container dos "pontinhos" ---------- */
  .dots-container {
    width: 90%;
    max-width: 1200px;
    height: 200px;
    background: transparent;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  .dot {
    opacity: 0;
    position: absolute;
    border-radius: 50%;
    animation-fill-mode: forwards;
  }
  @keyframes moveDot {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 0;
    }
    10% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    90% {
      transform: translate(var(--mx), var(--my)) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--mx), var(--my)) scale(0);
      opacity: 0;
    }
  }

  /* ---------- Slideshow + Modal ---------- */
  .slideshow-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    background: #fff;
  }
  .slide {
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .slide.active {
    opacity: 1;
    pointer-events: auto;
    position: relative;
  }
  .slide img {
    width: 100%;
    height: auto;
    display: block;
    cursor: zoom-in;
  }
  .arrow-next {
    position: absolute;
    top: 50%;
    right: -80px;
    transform: translateY(-50%);
    width: 80px; 
    height: 80px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .arrow-icon {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .modal-lightbox {
    display: none; 
    position: fixed;
    z-index: 9999;
    left: 0; 
    top: 0;
    width: 100%; 
    height: 100%;
    background-color: rgba(0,0,0,0.8);
  }
  .modal-content {
    display: block;
    margin: 5% auto; 
    max-width: 90%;
    max-height: 80%;
    border: 3px solid #fff;
    border-radius: 8px;
  }
  .close-modal {
    position: absolute;
    top: 20px; 
    right: 40px;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s;
  }
  .close-modal:hover {
    color: #ccc;
  }
  @media (max-width: 600px) {
    .arrow-next {
      width: 90px; 
      height: 90px;
      right: -90px;
    }
    .close-modal {
      font-size: 32px;
      right: 20px;
    }
  }
`;

/** 
 * Containers e elementos básicos 
 */
export const PageWrapper = styled.div`
  /* container principal da página */
`;

export const Container = styled.div`
  width: 100%;
  text-align: center;

  .tag {
    white-space: normal; /* permite quebra de linha */
    height: auto;        /* ajusta altura automaticamente */
    max-width: 80%;      /* ajusta largura máxima */
    display: inline-block; /* permite a expansão correta */
    line-height: 1.5;      /* melhora o espaçamento vertical do texto */
    padding: 1rem;         /* aumenta o espaçamento interno, se desejar */
}

`;



export const CtaButton = styled.a`
  display: block;
  width: fit-content;/* Mantém a largura de acordo com o conteúdo */
  margin: 2rem auto;/* Centraliza horizontalmente e adiciona espaçamento vertical */
  padding: 0.75rem 1.5rem;
  background: #000;
  color: #fff;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`;

//imagem centralizada
export const CenteredImage = styled.img`
  display: block;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;         /* Centraliza horizontalmente */
`;

/** Títulos menores (benefícios ou funcionalidades) */
export const TitleBenefits = styled.h2`
  font-family: "Roboto", Sans-serif;
  font-size: 21px;
  font-weight: 100;
  line-height: 37px;
  letter-spacing: 0px;
  word-spacing: 1px;
  text-align: center;
`;

/** Título principal */
export const Title = styled.h2`
  color: #000000;
  font-family: "Roboto Flex", Sans-serif;
  font-size: 65px;
  font-weight: 400;
  text-align: center;

  &.titulo-gradiente-vibrante {
    font-size: 2rem;
    font-weight: 400;
    -webkit-text-fill-color: transparent;
    color: transparent;
    background-image: linear-gradient(
      135deg,
      var(--e-global-color-amarelo) 0%,
      var(--e-global-color-azul) 25%,
      var(--e-global-color-verde) 50%,
      var(--e-global-color-azul) 75%,
      var(--e-global-color-amarelo) 100%
    );
    
    background-size: 400% 400%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${vibrateGradient} 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Spacer = styled.div`
  height: ${({ size }) => (size ? size : "2rem")};
`;

/**
 * Caixa do “Assistentes Inteligentes”
 */
export const AssistenteInteligenteBox = styled.div`
  max-width: 1600px; 
  margin: 1rem auto;
  padding: 1rem;
  text-align: center;
  line-height: 1.4;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    animation: spin 6s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .price {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  .btn {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0.5rem;
    background: #000;
    color: #fff;
    padding: 0.9rem 1.8rem;
    border-radius: 32px;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.3s ease;
  }
  .btn:hover {
    background: #333;
  }

  ul {
    list-style: disc outside;
    display: inline-block;
    margin: 1rem auto 0;
    text-align: left;
  }
  ul li {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1rem;
    h1 {
      font-size: 1.6rem;
    }
    .price {
      font-size: 1.4rem;
    }
    img {
      width: 100px;
      height: 100px;
    }
    ul li {
      font-size: 0.85rem;
    }
  }
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.75rem;
    h1 {
      font-size: 1.4rem;
    }
    .price {
      font-size: 1.2rem;
    }
    .btn {
      padding: 0.6rem 1rem;
      border-radius: 24px;
    }
    img {
      width: 80px;
      height: 80px;
    }
    ul li {
      font-size: 0.8rem;
      margin-bottom: 0.4rem;
    }
  }
`;

/**
 * Caixa “Personalizado para o usuário”
 * (herda estilos da AssistenteInteligenteBox, mas pode sobrescrever)
 */
export const PersonalizadoBox = styled(AssistenteInteligenteBox)`
  p {
    max-width: 600px;
    margin: 0.75rem auto 1.5rem auto;
    line-height: 1.6;
    color: #333;
    font-size: 1rem;
  }
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const LogoImg = styled.img`
  width: ${({ width = '50px' }) => width};
  height: ${({ height = '50px' }) => height};
  animation: ${spinAnimation} 6s linear infinite;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* cor de fundo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* para ficar acima de todos os elementos */
`;

// Container do modal (card)
export const ModalContent = styled.div`
  position: relative;
  background: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Botão de fechar
export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;