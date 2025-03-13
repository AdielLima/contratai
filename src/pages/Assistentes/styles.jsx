import styled, { keyframes } from "styled-components";
import { FaSearch, FaArrowUp, FaTimes } from "react-icons/fa";

/* ====================================================
   Animações
==================================================== */
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

/* ====================================================
   Loading Indicators
==================================================== */
export const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color || "#55BFFF"};
  border-radius: 50%;
  margin-right: 8px;
  animation: ${bounce} 1s ${(props) => props.delay}s infinite ease-in-out;
`;

/* ====================================================
   Layout Containers
==================================================== */
export const Container = styled.div`
  display: flex;
  height: 100vh;

  color: #333;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  width: 19%;
  background-color: #f7f7f8;
  padding: 0.5rem;
  height: 100vh;
  overflow-y: auto;

    /* Estilização para navegadores WebKit (Chrome, Safari) */
    &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0; /* cor do fundo da barra de rolagem */
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc; /* cor do "polegar" da barra de rolagem */
  }

  /* Estilização para Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ccc #e0e0e0;


  /* Logo e Nome */
  .sidebar-logo-nome {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }

  /* Menu de Assistentes */
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    /* font-weight: 400;
    font-size: 1rem; */
    padding: 0.3rem;
    cursor: pointer;
    transition: background 0.2s;

    .leftContent {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: sans-serif;
      font-family: "Inter", sans-serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
        
      
    }

    .rightButton {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      color: #757575;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    &:hover {
      background-color: #e2e2e2;
      .rightButton {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  /* Histórico de Conversas */
  .historico-container {
    margin-top: 0.5rem;
    padding: 0.3rem;
  }

  .historico-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .fonteHistorico {
    font-size: 0.85rem;
  }

  .search-icon {
    cursor: pointer;
    color: #757575;
    &:hover {
      opacity: 0.8;
      color: #000;
    }
  }

  .historico-list {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0.5rem 0;
    font-family: sans-serif;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-size: 0.85rem;
  }

  .historico-item {
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #333;
    font-family: Roboto, sans-serif;
    font-weight: 300;
  }

  /* Botão Minha Conta */
  .botao-minha-conta {
    text-align: center;
    margin-top: 4rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    overflow-y: visible;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 0.5rem;

  .area-chat {
    flex: 1;
    overflow-y: auto;
    margin: 1rem;
  }

  .chat-pergunta-div-1 {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ContainerTextArea = styled.div`
  padding: 0 20px;
  margin-top: 10px;

  @media (max-width: 768px) {
    padding: 0;
    margin-top: 8px;
  }
`;

/* ====================================================
   Top Bar
==================================================== */
export const TopBar = styled.div`
  margin-top: 0.5rem;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
`;


/* ====================================================
   Mensagens de Chat
==================================================== */
export const UserMessage = styled.div`
  max-width: 30%;
  margin-right: 1rem;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #cce5ff;
  color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  line-height: 1.4;
  font-family: Roboto, sans-serif;
  font-weight: 300;
`;

export const MessageWrapper = styled.div`
  /* Espaçamento extra para as mensagens, se necessário */
`;

export const AssistantMessage = styled.div`
  max-width: 80%;
  margin: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: Roboto, sans-serif;
  font-weight: 300;
`;

/* ====================================================
   Área de Input do Chat
==================================================== */
export const SearchBox = styled.div`
  position: relative;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.8rem;
  }
`;

export const SearchTextArea = styled.textarea`
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  color: #333;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  overflow-y: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 3rem;
  max-height: 9rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
`;

export const ActionsInTextArea = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    bottom: 0.8rem;
    left: 0.8rem;
    right: 0.8rem;
  }
`;

export const SmallButton = styled.button`
  width: 2.3rem;
  height: 2.3rem;
  border: 1px solid #000;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background-color: #756868;
    border: 1px solid #000;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

/* ====================================================
   Modal
==================================================== */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #ccc;

    h2 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 300;
      font-family: Roboto, sans-serif;
    }

    .close-button {
      background: transparent;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      color: #333;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .modal-body {
    padding: 1rem;

    .modal-input {
      width: 100%;
      padding: 0.6rem 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #999;
      }
    }

    .historico-list {
      list-style: none;
      padding: 0;
      margin: 0;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;

      .historico-item {
        padding: 0.5rem 0;
        font-size: 0.9rem;
        color: #333;
      }
    }
  }
`;

/* ====================================================
   Dicas/Informações Adicionais
==================================================== */
export const TipContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;


// Container que envolve o preview do arquivo
export const FilePreviewContainer = styled.div`
  display: flex;
  gap: 10px;            /* Espaço entre os itens */
  overflow-x: auto;     /* Barra de rolagem horizontal se exceder a largura */
  width: 100%;
  padding-bottom: 1.5rem;         /* Espaço interno opcional */
  padding-top: 0.7rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
`;

// Wrapper interno com position relative para posicionar o ícone
export const PreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// Imagem com bordas arredondadas
export const StyledImage = styled.img`
  border-radius: 12px;
`;

// Container para exibir o nome do arquivo (quando não é imagem)
export const FileNameContainer = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 15px;
  word-break: break-word;
  margin-bottom: 10px;
`;

// Ícone de fechar, posicionado no canto superior direito
export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  cursor: pointer;
  color: #fff;
  background-color: #000;
  border-radius: 50%;
  font-size: 12px;
  padding: 2px;
`;


