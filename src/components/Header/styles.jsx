// Header.styles.js
import styled from "styled-components";


export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 4rem;
  padding-block: 1rem;
`;

export const NavBar = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const NavLink = styled.a`
  color: #000;
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;

  /* Efeito “hover” para parecer um botão */
  &:hover {
    background-color: #c2c2c2;
  }
`;
