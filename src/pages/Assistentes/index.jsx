// Assistentes.jsx
import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { RiAttachmentLine } from "react-icons/ri";
import { PiWaveformBold } from "react-icons/pi";

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
  ContainerLogoNome,
  Title,
  TxtSm,
} from "./styles";

import { LogoImg } from "../../styles";

import Logo from "../../assets/img/logo.webp";

export default function Assistentes() {
  const [text, setText] = useState("");

  // Array de itens para o menu
  const menuItems = [
    "Função 1",
    "Função 2",
    "Função 3",
    "Função 4",
    "Função 5",
    "Função 6",
    "Função 7",
    "Função 8",
    "Função 9",
  ];

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Para o auto-resize do textarea:
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <Container>
      <Sidebar>
        <ContainerLogoNome>
          <LogoImg src={Logo} alt="Logo ContratAI" />
          <SidebarHeader>
            <Title>ContratAI</Title>
          </SidebarHeader>
        </ContainerLogoNome>

        <SidebarMenu>
          {menuItems.map((item) => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>

      <MainContent>
        <TopBar>
          <TopBarTitle>Como Posso Ajudar?</TopBarTitle>
        </TopBar>

        <ContainerTextArea>
          <SearchBox>
            <SearchTextArea
              autoFocus
              placeholder="Pergunte alguma coisa"
              value={text}
              onChange={handleTextChange}
            />
            <ActionsInTextArea>
              <SmallButton>
                <RiAttachmentLine color="white" size={19} />
              </SmallButton>
              <SmallButton>
                < PiWaveformBold color="white" size={19} />
              </SmallButton>
            </ActionsInTextArea>
          </SearchBox>
        </ContainerTextArea>

        <TxtSm>
          Para obter uma resposta mais precisa, elabore cuidadosamente a sua pergunta.
        </TxtSm>
      </MainContent>
    </Container>
  );
}
