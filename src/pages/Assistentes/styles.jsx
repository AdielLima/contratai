import styled from "styled-components";

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

export const Sidebar = styled.div`
  width: 19%;
  background-color: #f7f7f8;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;

  /* Exemplo de classes internas que você acessa no JSX */
  .sidebar-logo-nome {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .menu-item {
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    font-weight: 400;
    font-size: 1rem;
    padding: 8px 10px;
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
    margin-top: 1rem;
  }

  .historico-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
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
    margin: 0;
  }

  .historico-item {
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #333;
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
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  position: relative; /* para posicionar o txt-sm */
  overflow: hidden;   /* caso precise cortar algo extra */

  .top-bar {
    margin: 2rem;
    .top-bar-title {
      font-size: 1.875rem;
      font-weight: 600;
    }
  }

  .container-text-area {
    display: flex;
    justify-content: center;
  }

  .txt-sm {
    font-size: 0.7rem;
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    padding-bottom: 5px; /* para dar um espaço do final da tela */
  }

  @media (max-width: 768px) {
    padding: 1rem;
    .top-bar {
      margin: 1rem 0;
      .top-bar-title {
        font-size: 1rem;
      }
    }
    .txt-sm {
      font-size: 0.65rem;
    }
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
  margin: 0 9rem; /* Ajuste se necessário */

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.8rem;
    margin: 0;
  }
`;

export const SearchTextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  background-color: transparent;
  font-size: 1.1rem;
  color: #333;
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
