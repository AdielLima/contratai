// Header.jsx
import React from "react";
import Logo from "../../assets/img/logo.webp";

// Importa os componentes estilizados
import {
  HeaderContainer,
  LogoImg,
  NavBar,
  NavLink
} from "./styles";

function Header() {
  return (
    <HeaderContainer>
      <LogoImg src={Logo} alt="Logo ContratAI" />
      <NavBar>
        <NavLink href="/">Início</NavLink>
        <NavLink href="https://contratai.org/sair/">Sair</NavLink>
      </NavBar>
    </HeaderContainer>
  );
}

export default Header;
