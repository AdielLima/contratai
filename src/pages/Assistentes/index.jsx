import React from "react";

/* IMPORT DOS ÍCONES */
import { FaMicrophone } from "react-icons/fa";
import { RiAttachmentLine } from "react-icons/ri";

import {
  Container,
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  MenuItem,
  MainContent,
  TopBar,
  TopBarTitle,
  SmallButton,
  ContainerTextArea,
  SearchBox,
  SearchTextArea,
  ActionsInTextArea,
  ContainerLogoNome
} from "./styles";

import Logo from "../../assets/img/logo.webp";
import { LogoImg } from "../../styles";

export default function Assistentes() {
  return (
    <Container>
      {/* SIDEBAR */}
      <Sidebar>
        <ContainerLogoNome>
          <LogoImg src={Logo} alt="Logo ContratAI" />
          <SidebarHeader>ContratAI</SidebarHeader>
        </ContainerLogoNome>

        <SidebarMenu>
          <MenuItem>Função 1</MenuItem>
          <MenuItem>Função 2</MenuItem>
          <MenuItem>Função 3</MenuItem>
          <MenuItem>Função 4</MenuItem>
          <MenuItem>Função 5</MenuItem>
          <MenuItem>Função 6</MenuItem>
          <MenuItem>Função 7</MenuItem>
          <MenuItem>Função 8</MenuItem>
          <MenuItem>Função 9</MenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* MAIN CONTENT */}
      <MainContent>
        <TopBar>
          <TopBarTitle>Como Posso Ajudar?</TopBarTitle>
        </TopBar>

        {/* Campo de input + botões */}
        <ContainerTextArea>
          <SearchBox>
            <SearchTextArea placeholder="Pergunte alguma coisa" />
            <ActionsInTextArea>
              {/* Ícone de Enviar Documento */}
              <SmallButton>
                <RiAttachmentLine size={18} />
              </SmallButton>

              {/* Ícone de Enviar Áudio */}
              <SmallButton>
                <FaMicrophone size={18} />
              </SmallButton>
            </ActionsInTextArea>
          </SearchBox>
        </ContainerTextArea>
        
        <p>Para obter uma resposta mais precisa, elabore cuidadosamente a sua pergunta.</p>
      </MainContent>
    </Container>
  );
}
