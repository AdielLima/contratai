import React, { useState, useEffect, useRef } from "react";
import { RiAttachmentLine } from "react-icons/ri";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";

// Import das estilizações agora todas em styles.jsx
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
  DotsContainer,
  Dot,
  UserMessage,
  MessageWrapper,
  AssistantMessage,
  TipContainer,
  TipText,
  TopBar,
  TopBarTitle,
  ContainerTextArea,
} from "./styles";

import { LogoImg } from "../../styles"; // imagino que venha de algum global
import Logo from "../../assets/img/logo.webp";

/**
 * Componente que exibe os pontinhos de "carregando"
 */
function LoadingDots() {
  return (
    <DotsContainer>
      {/* Cada <Dot> recebe a cor e o delay como props */}
      <Dot color="#55BFFF" delay={0} />
      <Dot color="#FFE950" delay={0.2} />
      <Dot color="#8EC63F" delay={0.4} />
    </DotsContainer>
  );
}

export default function Assistentes() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para o assistente selecionado
  const [selectedAssistant, setSelectedAssistant] = useState("ContratAI");

  // Estado para o arquivo selecionado (PDF, Word)
  const [selectedFile, setSelectedFile] = useState(null);

  // Referências para auto-scroll e resetar altura do TextArea
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  // Para referenciar o input "file" que fica "escondido"
  const fileInputRef = useRef(null);

  // Ao atualizar messages, faz scroll automático para o fim
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Menu lateral
  const menuItems = [
    { label: "ContratAI", icon: <MdOutlineMoreVert size={18} />, value: "ContratAI" },
    { label: "DFD", icon: <MdOutlineMoreVert size={18} />, value: "DFD" },
    { label: "ETP", icon: <MdOutlineMoreVert size={18} />, value: "ETP" },
    { label: "TR", icon: <MdOutlineMoreVert size={18} />, value: "TR" },
    {
      label: "Mapa de Risco",
      icon: <MdOutlineMoreVert size={18} />,
      value: "Mapa de Risco",
    },
  ];

  // Histórico lateral
  const historicoItems = [
    "Dúvidas sobre Estudo Técnico...",
    "Alterações Contratuais na fase...",
    "Itens de um Termo de Referência...",
    "Qual a vigência de uma Ata de...",
    "Levantamento de Mercado para...",
  ];

  /**
   * Redimensiona dinamicamente o TextArea
   */
  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  /**
   * Abre/fecha modal de pesquisa no histórico
   */
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  /**
   * Dispara a abertura do seletor de arquivos
   */
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Quando o usuário seleciona um arquivo (pdf, doc, docx)
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /**
   * Envia a mensagem (e o arquivo, se houver) ao servidor
   */
  const handleSendMessage = async () => {
    // Se não há texto e também não há arquivo selecionado, não faz nada
    if (!text.trim() && !selectedFile) return;

    // Mensagem do Usuário
    if (text.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: text }]);
    }
    const userMessage = text.trim();

    // Limpa e reseta altura do textarea
    setText("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    try {
      setIsLoading(true);

      // Mostra loading
      setMessages((prev) => [
        ...prev,
        { role: "assistant-loading", content: <LoadingDots /> },
      ]);

      const webhookUrl = "https://contratai.app.n8n.cloud/webhook/123";

      // Usamos FormData para enviar texto + arquivo (se houver)
      const formData = new FormData();
      formData.append("assistant", selectedAssistant);

      // Se o usuário digitou algo
      if (userMessage) {
        formData.append("message", userMessage);
      }

      // Se há um arquivo selecionado
      if (selectedFile) {
        formData.append("data", selectedFile);
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Erro HTTP: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Resposta do n8n:", data);

      let botAnswer =
        data[0]?.json?.message ||
        data?.json?.message ||
        data?.message ||
        "Desculpe, não entendi...";

      setIsLoading(false);

      // Remove loading
      setMessages((prev) => prev.filter((m) => m.role !== "assistant-loading"));

      // Mensagem do Assistente
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botAnswer },
      ]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setIsLoading(false);

      // Remove loading
      setMessages((prev) => prev.filter((m) => m.role !== "assistant-loading"));

      // Mensagem de erro
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ops! Ocorreu um erro ao se comunicar com o servidor.",
        },
      ]);
    } finally {
      // Após enviar, limpamos o arquivo selecionado para evitar reenvio
      setSelectedFile(null);
    }
  };

  /**
   * Enter sem shift para enviar
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Se for ContratAI, exibe ContratAI; senão, exibe o nome do assistente selecionado
  const displayedAssistant =
    selectedAssistant === "ContratAI" ? "ContratAI" : selectedAssistant;

  return (
    <>
      <Container>
        {/* =========== SIDEBAR =========== */}
        <Sidebar>
          <div>
            {/* LOGO */}
            <div className="sidebar-logo-nome">
              <LogoImg
                src={Logo}
                width="50px"
                height="50px"
                alt="Logo ContratAI"
              />
            </div>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <div
                className="menu-item"
                key={index}
                onClick={() => setSelectedAssistant(item.value)}
              >
                <div className="leftContent">
                  <p>{item.label}</p>
                </div>
                <button className="rightButton">{item.icon}</button>
              </div>
            ))}

            {/* Histórico */}
            <div className="historico-container">
              <div className="historico-header">
                <h3 className="fonteHistorico">Histórico</h3>
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

            {/* Botão Minha Conta (amarelo arredondado) */}
            <div className="botao-minha-conta">
              <a href="#0">Minha Conta</a>
            </div>
          </div>
        </Sidebar>

        {/* =========== CONTEÚDO PRINCIPAL =========== */}
        <MainContent>
          <TopBar>
            <TopBarTitle>{displayedAssistant}</TopBarTitle>
          </TopBar>

          {/* Área de chat */}
          <div className="area-chat">
            {messages.map((msg, i) => {
              // user
              if (msg.role === "user") {
                return (
                  <div className="chat-pergunta-div-1" key={i}>
                    <UserMessage>{msg.content}</UserMessage>
                  </div>
                );
              }

              // loading
              if (msg.role === "assistant-loading") {
                return (
                  <MessageWrapper key={i}>
                    <AssistantMessage>{msg.content}</AssistantMessage>
                  </MessageWrapper>
                );
              }

              // assistant
              if (msg.role === "assistant") {
                return (
                  <MessageWrapper key={i}>
                    <AssistantMessage>{msg.content}</AssistantMessage>
                  </MessageWrapper>
                );
              }
              return null;
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* TextArea + Mensagem abaixo dele */}
          <ContainerTextArea>
            <SearchBox>
              <SearchTextArea
                ref={textAreaRef}
                autoFocus
                placeholder="Pergunte alguma coisa"
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
              />
              <ActionsInTextArea>
                {/* Ícone de Anexo */}
                <SmallButton onClick={handleFileButtonClick}>
                  <RiAttachmentLine color="white" size={19} />
                </SmallButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".pdf, .doc, .docx" // Tipos permitidos
                  onChange={handleFileChange}
                />

                {/* Ícone de Envio */}
                <SmallButton onClick={handleSendMessage}>
                  <FaArrowUp color="white" size={19} />
                </SmallButton>
              </ActionsInTextArea>
            </SearchBox>
          </ContainerTextArea>

          <TipContainer>
            <TipText>
              Para obter uma resposta mais precisa, elabore cuidadosamente a sua
              pergunta.
            </TipText>
          </TipContainer>
        </MainContent>
      </Container>

      {/* MODAL DE PESQUISA NO HISTÓRICO */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div className="modal-header">
              <h2 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
                Pesquisar Histórico
              </h2>
              <button className="close-button" onClick={handleCloseModal}>
                X
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Busque algo no histórico..."
                className="modal-input"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
              />
              <ul className="historico-list">
                {historicoItems.map((item, i) => (
                  <li
                    className="historico-item"
                    key={i}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 300,
                    }}
                  >
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
