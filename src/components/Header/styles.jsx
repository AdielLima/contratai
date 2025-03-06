import styled from "styled-components";
import { vibrateGradient } from "../../styles";


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
  color: black;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, #55BFFF, #FFE950, #8EC63F);
  background-size: 300% 300%;
  animation: ${vibrateGradient} 4s ease infinite;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }
`;
