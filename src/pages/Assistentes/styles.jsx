import styled, { keyframes } from "styled-components";

/* Animação para os pontinhos de carregamento */
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

/* Container e estilização dos pontinhos de loading */
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

/* Layout Principal */
export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Barra Lateral */
export const Sidebar = styled.div`
  width: 19%;
  background-color: #f7f7f8;
  padding: 0.5rem;
  height: 100vh;
  overflow-y: auto;

  .sidebar-logo-nome {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
    padding: 0.3rem;
    cursor: pointer;
    transition: background 0.2s;

    .leftContent {
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
    font-size: 0.7rem;
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
    list-style: none;
  }

  .historico-item {
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #333;
    font-family: Roboto, sans-serif;
    font-weight: 300;
  }

  .botao-minha-conta {
    text-align: center;
    background-color: #ffe950;
    color: #333;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 1rem;
    font-weight: bold;

    a {
      text-decoration: none;
      color: inherit; /* para herdar a cor definida em .botao-minha-conta */
    }

    &:hover {
      background-color: #f0c000;
    }

  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    overflow-y: visible;
  }
`;

/* Conteúdo Principal */
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

/* Top Bar */
export const TopBar = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

export const TopBarTitle = styled.span`
  font-size: 1.875rem;
  font-weight: 300;
  font-family: Roboto, sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* Mensagem do Usuário (em azul) */
export const UserMessage = styled.div`
  max-width: 50%;
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

/* Wrapper para envolver as mensagens do Assistente (margin) */
export const MessageWrapper = styled.div`
  /* margin: 16px 0; */
`;

/* Mensagem do Assistente */
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

/* Container para a área do TextArea */
export const ContainerTextArea = styled.div`
  padding: 0 20px;
  margin-top: 10px;

  @media (max-width: 768px) {
    padding: 0;
    margin-top: 8px;
  }
`;

/* SearchBox e TextArea */
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
  font-weight: 300;
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

/* Modal */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* para ficar acima de tudo */
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

/* Dicas abaixo do TextArea */
export const TipContainer = styled.div`
  margin-top: 8px;
  text-align: center;
`;

export const TipText = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  margin: 0;
`;
