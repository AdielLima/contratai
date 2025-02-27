// Header.styles.js
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 4rem;
  padding-block: 1rem;
`;

export const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 6s linear infinite;
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
