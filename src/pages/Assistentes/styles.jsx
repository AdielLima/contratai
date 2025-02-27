// styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

export const Sidebar = styled.div`
  width: 20%;
  background-color: #f4f4f4;
`;

export const ContainerLogoNome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

export const SidebarHeader = styled.div`
  padding: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
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

export const MainContent = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  margin: auto;
`;

export const TopBar = styled.div`
  margin: 2rem;
`;

export const TopBarTitle = styled.span`
  font-size: 1.875rem;
  font-weight: 600;
`;



export const ContainerTextArea = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
`;

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
`;

/* Textarea com auto-resize */
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
  /* Caso queira limitar a altura máxima (mantém interface) */
  max-height: 9rem;
`;

export const ActionsInTextArea = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
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
`;

export const TxtSm = styled.p`
  font-size: 0.7rem;
`;
