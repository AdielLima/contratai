import React, { useState } from "react";
import { RiAttachmentLine } from "react-icons/ri";
import { PiWaveformBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";

import {
  Container,
  Sidebar,
  MainContent,
  SearchBox,
  SearchTextArea,
  ActionsInTextArea,
  SmallButton,
  ModalOverlay,
  ModalContent,
} from "./styles";

import { LogoImg } from "../../styles"; // Se você já tinha um styled para a imagem, pode manter ou substituir
import Logo from "../../assets/img/logo.webp";

export default function Assistentes() {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Botão acima dos itens do menu:
  const minhaContaLabel = "Minha Conta";

  // Array de itens para o menu
  const menuItems = [
    ["Assistente Geral", <MdOutlineMoreVert size={18} />],
    ["DFD", <MdOutlineMoreVert size={18} />],
    ["ETP", <MdOutlineMoreVert size={18} />],
    ["TR", <MdOutlineMoreVert size={18} />],
    ["Mapa de Risco", <MdOutlineMoreVert size={18} />],
  ];

  const historicoItems = [
    "Contrato 01",
    "Contrato 02",
    "Contrato 03",
    "Contrato 04",
    "Contrato 05",
    "Contrato 06",
    "Contrato 07",
  ];

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Para o auto-resize do textarea:
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Abre e fecha o modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Container>
        {/* SIDEBAR */}
        <Sidebar>
          {/* Logo e Nome */}
          <div className="sidebar-logo-nome">
            <LogoImg
              src={Logo}
              width="40px"
              height="40px"
              alt="Logo ContratAI"
              style={{ marginRight: "8px" }}
            />
            <h1>ContratAI</h1>
          </div>

          {/* Minha Conta */}
          <div className="menu-item">
            <div className="leftContent">
              <p>{minhaContaLabel}</p>
            </div>
            {/* Ícone opcional à direita se desejar */}
          </div>

          {/* Itens de menu */}
          {menuItems.map(([label, iconBtn], index) => (
            <div className="menu-item" key={index}>
              <div className="leftContent">
                <p>{label}</p>
              </div>
              <button className="rightButton">{iconBtn}</button>
            </div>
          ))}

          {/* Histórico */}
          <div className="historico-container">
            <div className="historico-header">
              <h2>Histórico</h2>
              <div className="search-icon" onClick={handleOpenModal}>
                <FaSearch size={16} />
              </div>
            </div>

            <ul className="historico-list">
              {historicoItems.map((item, i) => (
                <li className="historico-item" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Sidebar>

        {/* CONTEÚDO PRINCIPAL */}
        <MainContent>
          <div className="top-bar">
            <span className="top-bar-title">Como Posso Ajudar?</span>
          </div>

          <div className="container-text-area">
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
                  <PiWaveformBold color="white" size={19} />
                </SmallButton>
              </ActionsInTextArea>
            </SearchBox>
          </div>

          <div className="txt-sm">
            <p>
              Para obter uma resposta mais precisa, elabore cuidadosamente a sua pergunta.
            </p>
          </div>
        </MainContent>
      </Container>

      {/* MODAL DE PESQUISA NO HISTÓRICO */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div className="modal-header">
              <h2>Pesquisar Histórico</h2>
              <button className="close-button" onClick={handleCloseModal}>
                X
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Busque algo no histórico..."
                className="modal-input"
              />
              <ul className="historico-list">
                {historicoItems.map((item, i) => (
                  <li className="historico-item" key={i}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
