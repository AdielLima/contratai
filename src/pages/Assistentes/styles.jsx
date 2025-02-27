import styled from "styled-components";

/* CONTAINER PRINCIPAL */
export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

/* SIDEBAR */
export const Sidebar = styled.div`
  width: 25%;
  background-color: #f4f4f4;
`;

/* Cabeçalho opcional na Sidebar (Logo ou título) */
export const SidebarHeader = styled.div`
  padding: 16px;
  font-size: 2rem;
`;

export const SidebarMenu = styled.div`
  padding-left: 1.5rem;
`;

export const MenuItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #e2e2e2;
  }
`;

/* CONTEÚDO PRINCIPAL */
export const MainContent = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  margin: auto;
`;

/* Barra superior com o título "ChatGPT o1" */
export const TopBar = styled.div`
  margin: 2rem;
`;

export const TopBarTitle = styled.span`
    font-size: 1.875rem;
    font-weight: 600;
`;

/* Título principal "Como posso ajudar?" */
export const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 20px 0;
`;

export const SearchButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-left: none;
  background-color: #eee;
  cursor: pointer;
  border-radius: 0 4px 4px 0;

  &:hover {
    background-color: #ddd;
  }
`;

/* Contêiner principal só para demonstrar */
export const ContainerTextArea = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

/* Esse é o contêiner que terá borda, sombra e cantos arredondados */
export const SearchBox = styled.div`
  position: relative;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 1rem;
  display: flex;
`;

/* O text-area fica transparente para parecer “parte do contêiner”, sem a sua própria borda */
export const SearchTextArea = styled.textarea`
  flex: 1;
  min-height: 7rem; /* altura mínima do campo */
  border: none;
  outline: none;
  resize: none;
  background-color: transparent;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #333;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  /* Para garantir quebra de linha */
  white-space: pre-wrap;
  word-wrap: break-word;
`;

/* Contêiner absoluto para agrupar os botões no canto superior/direito */
export const ActionsInTextArea = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
`;

/* Botões pequenos “circulares” */
export const SmallButton = styled.button`
  width: 2.3rem;
  height: 2.3rem;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background-color: #eee;
  }
`;


export const ContainerLogoNome = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

`