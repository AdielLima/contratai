import React, { useState, useEffect, useRef } from "react";
import { RiAttachmentLine } from "react-icons/ri";
import { FaSearch, FaArrowUp, FaTrash } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";

// Import das estilizações
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

import { LogoImg } from "../../styles";
import Logo from "../../assets/img/logo.webp";

/**
 * Componente que exibe os pontinhos de "carregando"
 */
function LoadingDots() {
  return (
    <DotsContainer>
      <Dot color="#55BFFF" delay={0} />
      <Dot color="#FFE950" delay={0.2} />
      <Dot color="#8EC63F" delay={0.4} />
    </DotsContainer>
  );
}

export default function Assistentes() {
  /**
   * Armazenamos todas as conversas de cada assistente
   */
  const [conversationsByAssistant, setConversationsByAssistant] = useState({
    ContratAI: [],
    DFD: [],
    ETP: [],
    "Mapa de Risco": [],
    "Termo de Referência": [],
    Jurisprudência: [],
  });

  // Assistente atual
  const [selectedAssistant, setSelectedAssistant] = useState("ContratAI");

  // Identificador da conversa selecionada
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Mensagem de texto do usuário
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Bloqueia novas perguntas até o assistente responder
const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);


  // Arquivo selecionado (pdf, doc, etc.)
  const [selectedFile, setSelectedFile] = useState(null);

  // Modal de pesquisa no sidebar
  const [showModal, setShowModal] = useState(false);
  const [allArchivedConversations, setAllArchivedConversations] = useState([]);

  // Referências para scroll e input hidden
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Menu lateral de Assistentes
  const menuItems = [
    { label: "ContratAI", icon: <MdOutlineMoreVert size={18} />, value: "ContratAI" },
    { label: "DFD", icon: <MdOutlineMoreVert size={18} />, value: "DFD" },
    { label: "ETP", icon: <MdOutlineMoreVert size={18} />, value: "ETP" },
    { label: "Mapa de Risco", icon: <MdOutlineMoreVert size={18} />, value: "Mapa de Risco" },
    {
      label: "Termo de Referência",
      icon: <MdOutlineMoreVert size={18} />,
      value: "Termo de Referência",
    },
    {
      label: "Jurisprudência",
      icon: <MdOutlineMoreVert size={18} />,
      value: "Jurisprudência",
    },
  ];

  /**
   * Cada assistente tem um webhook diferente
   */
  const webhookMap = {
    ContratAI: "https://contratai.app.n8n.cloud/webhook/contratai",
    DFD: "https://contratai.app.n8n.cloud/webhook/dfd",
    ETP: "https://contratai.app.n8n.cloud/webhook/etp",
    "Mapa de Risco": "https://contratai.app.n8n.cloud/webhook/mapa-risco",
    "Termo de Referência": "https://contratai.app.n8n.cloud/webhook/termo-referencia",
    Jurisprudência: "https://contratai.app.n8n.cloud/webhook/jurisprudencia",
  };

  /**
   * Limite de 5 conversas no sidebar
   */
  const MAX_CONVERSATIONS = 5;

  /**
   * Conversas do assistente selecionado
   */
  const currentAssistantConversations =
    conversationsByAssistant[selectedAssistant] || [];

  // Exibimos apenas 5 (só se fôssemos renderizar no sidebar)
  const limitedConversations = currentAssistantConversations.slice(0, MAX_CONVERSATIONS);

  /**
   * A conversa atualmente selecionada
   */
  const selectedConversation = currentAssistantConversations.find(
    (conv) => conv.id === selectedConversationId
  );

  // Mensagens da conversa selecionada (ou vazio)
  const currentMessages = selectedConversation ? selectedConversation.messages : [];

  /**
   * Scroll para o fim sempre que mudar
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages, selectedAssistant, selectedConversationId]);

  /**
   * Troca de assistente
   */
  const handleSelectAssistant = (value) => {
    setSelectedAssistant(value);
  };

  /**
   * Seleciona conversa no sidebar
   */
  const handleSelectConversation = (conversationId) => {
    setSelectedConversationId(conversationId);
  };

  /**
   * Deletar conversa
   */
  const handleDeleteConversation = (e, conversationId) => {
    e.stopPropagation();
    setConversationsByAssistant((prev) => {
      const updated = { ...prev };
      const convArray = [...(updated[selectedAssistant] || [])];

      const index = convArray.findIndex((c) => c.id === conversationId);
      if (index !== -1) {
        convArray.splice(index, 1);
        updated[selectedAssistant] = convArray;
      }
      // Se deletamos a conversa selecionada, seleciona outra ou nada
      if (conversationId === selectedConversationId) {
        if (convArray.length > 0) {
          setSelectedConversationId(convArray[0].id);
        } else {
          setSelectedConversationId(null);
        }
      }
      return updated;
    });
  };

  /**
   * Redimensiona dinamicamente o TextArea
   */
  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  /**
   * Botão para anexar arquivo (PDF, DOC, etc.)
   */
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Quando o usuário seleciona arquivo
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  /**
   * Helper: cria uma nova conversa com base na primeira mensagem
   */
  const createConversationWithFirstMessage = (firstMessage) => {
    const newId = String(Date.now());
  
    let conversationTitle = "Conversa";
    if (firstMessage.role === "user") {
      if (firstMessage.content.trim()) {
        conversationTitle = firstMessage.content.substring(0, 30) + "...";
      }
    } else if (firstMessage.role === "file") {
      conversationTitle = `Arquivo: ${firstMessage.content}`;
    }
  
    const newConv = {
      id: newId,
      title: conversationTitle,
      messages: [firstMessage],
    };
  
    setConversationsByAssistant((prev) => {
      const updated = { ...prev };
      const convArray = [...(updated[selectedAssistant] || [])];
      convArray.unshift(newConv);
      updated[selectedAssistant] = convArray;
      return updated;
    });
  
    // Em vez de setar o selectedConversationId aqui, apenas retornamos
    return newId;
  };
  

  /**
   * Adiciona mensagem à conversa atual
   */
  const addMessageToCurrentConversation = (newMessage) => {
    // Se não há conversa selecionada, cria
    if (!selectedConversationId) {
      const newId = createConversationWithFirstMessage(newMessage);
      // Agora sim, setamos a conversa selecionada
      setSelectedConversationId(newId);
    } else {
      // Se já existe conversa, apenas adicionamos a mensagem
      setConversationsByAssistant((prev) => {
        const updated = { ...prev };
        const convArray = [...(updated[selectedAssistant] || [])];
        const index = convArray.findIndex((c) => c.id === selectedConversationId);
  
        if (index === -1) {
          // Caso não encontre, podemos criar
          const newId = createConversationWithFirstMessage(newMessage);
          setSelectedConversationId(newId);
          return updated;
        }
  
        const conv = { ...convArray[index] };
        conv.messages = [...conv.messages, newMessage];
        convArray[index] = conv;
        updated[selectedAssistant] = convArray;
        return updated;
      });
    }
  };
  
  /**
   * Remove a mensagem "assistant-loading"
   */
  const removeLoadingFromCurrentConversation = () => {
    if (!selectedConversation) return;
    setConversationsByAssistant((prev) => {
      const updated = { ...prev };
      const convArray = [...(updated[selectedAssistant] || [])];
      const index = convArray.findIndex((c) => c.id === selectedConversationId);
      if (index === -1) return prev;

      const conv = { ...convArray[index] };
      conv.messages = conv.messages.filter((m) => m.role !== "assistant-loading");
      convArray[index] = conv;
      updated[selectedAssistant] = convArray;
      return updated;
    });
  };

  /**
   * Envia a mensagem ao webhook
   */
  const handleSendMessage = async () => {
    // Se não tem texto nem arquivo, sai
    if (!text.trim() && !selectedFile) return;

    const userMessage = text.trim();
    // Define contentType (text ou file)
    let contentType = userMessage ? "text" : "file";

    // Adiciona a mensagem do user no chat
    if (userMessage) {
      addMessageToCurrentConversation({
        role: "user",
        content: userMessage,
      });
    } else if (!userMessage && selectedFile) {
      addMessageToCurrentConversation({
        role: "user",
        content: `Arquivo: ${selectedFile.name}`,
      });
    }

    // Limpa texto
    setText("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    try {
      setIsLoading(true);

      // Adiciona uma "mensagem" de loading
      addMessageToCurrentConversation({
        role: "assistant-loading",
        content: <LoadingDots />,
      });

      // Monta o FormData
      const webhookUrl = webhookMap[selectedAssistant] || "";
      const formData = new FormData();
      formData.append("assistant", selectedAssistant);
      formData.append("contentType", contentType);

      if (userMessage) {
        formData.append("message", userMessage);
      }
      if (selectedFile) {
        formData.append("data", selectedFile);
      }

      // Faz o POST
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resposta do n8n:", data);

      let botAnswer =
      data[0]?.message ||
      data[0]?.json?.message ||
      data?.json?.message ||
      data?.message ||
      "";
    
      setIsLoading(false);

      // Remove a mensagem "loading"
      removeLoadingFromCurrentConversation();

      // Adiciona a resposta do assistente
      addMessageToCurrentConversation({
        role: "assistant",
        content: botAnswer,
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setIsLoading(false);
      removeLoadingFromCurrentConversation();
      // Em caso de erro real (fetch falhou, etc.)
      addMessageToCurrentConversation({
        role: "assistant",
        content: "Ops! Ocorreu um erro ao se comunicar com o servidor.",
      });
    } finally {
      // Limpa arquivo
      setSelectedFile(null);
    }
  };

  /**
   * Enter => envia
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Abre modal com TODAS as conversas
   */
  const handleOpenModalAllConversations = () => {
    const allConvs = Object.entries(conversationsByAssistant).flatMap(
      ([assistant, convs]) =>
        convs.map((c) => ({
          ...c,
          assistantName: assistant,
        }))
    );
    setAllArchivedConversations(allConvs);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleOpenConversationFromModal = (assistantName, conversationId) => {
    setSelectedAssistant(assistantName);
    setSelectedConversationId(conversationId);
    setShowModal(false);
  };

  const displayedAssistant = selectedAssistant;

  return (
    <>
      <Container>
        {/* SIDEBAR */}
        <Sidebar>
          <div>
            {/* LOGO */}
            <div className="sidebar-logo-nome">
              <LogoImg src={Logo} width="50px" height="50px" alt="Logo ContratAI" />
            </div>

            {/* Menu de Assistentes */}
            {menuItems.map((item, index) => (
              <div
                className="menu-item"
                key={index}
                onClick={() => handleSelectAssistant(item.value)}
              >
                <div className="leftContent">
                  <p>{item.label}</p>
                </div>
                <button className="rightButton">{item.icon}</button>
              </div>
            ))}

            {/* HISTÓRICO FICTÍCIO (4 itens fixos) */}
            <div className="historico-container">
              <div className="historico-header">
                <h3 className="fonteHistorico">Conversas</h3>
                <div className="search-icon" onClick={handleOpenModalAllConversations}>
                  <FaSearch size={16} />
                </div>
              </div>

              <ul className="historico-list">
                {/* 4 itens fixos, sem ligação com as mensagens do user */}
                <li
                  className="conversation-item"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "40px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ flex: 1 }}>Mensagem Fictícia 1</span>
                </li>
                <li
                  className="conversation-item"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "40px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ flex: 1 }}>Mensagem Fictícia 2</span>
                </li>
                <li
                  className="conversation-item"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "40px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ flex: 1 }}>Mensagem Fictícia 3</span>
                </li>
                <li
                  className="conversation-item"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "40px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ flex: 1 }}>Mensagem Fictícia 4</span>
                </li>
              </ul>
            </div>

            {/* Botão Minha Conta */}
            <div className="botao-minha-conta">
              <a href="#0">Minha Conta</a>
            </div>
          </div>
        </Sidebar>

        {/* CONTEÚDO PRINCIPAL */}
        <MainContent>
          <TopBar>
            <TopBarTitle>{displayedAssistant}</TopBarTitle>
          </TopBar>

          {/* Área de chat */}
          <div className="area-chat">
            {currentMessages.map((msg, i) => {
              if (msg.role === "user") {
                return (
                  <div className="chat-pergunta-div-1" key={i}>
                    <UserMessage>{msg.content}</UserMessage>
                  </div>
                );
              }
              if (msg.role === "assistant-loading") {
                return (
                  <MessageWrapper key={i}>
                    <AssistantMessage>{msg.content}</AssistantMessage>
                  </MessageWrapper>
                );
              }
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

          {/* TextArea para enviar mensagem */}
          <ContainerTextArea>
            <SearchBox>
              <SearchTextArea
                ref={textAreaRef}
                autoFocus
                placeholder="Pergunte algo ou anexe um arquivo..."
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
              />
              <ActionsInTextArea>
                <SmallButton onClick={handleFileButtonClick}>
                  <RiAttachmentLine color="white" size={19} />
                </SmallButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx" // Removido mp3 e wav
                  onChange={handleFileChange}
                />

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

      {/* MODAL - Exibe TODAS as conversas de TODOS os assistentes */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div className="modal-header">
              <h2 style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>
                Histórico Completo
              </h2>
              <button className="close-button" onClick={handleCloseModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              {allArchivedConversations.map((conv) => (
                <div
                  key={conv.id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <strong>{conv.assistantName}</strong> - {conv.title}
                  </div>
                  {/* Botão para abrir essa conversa */}
                  <button
                    style={{
                      backgroundColor: "#ccc",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginLeft: "10px",
                    }}
                    onClick={() =>
                      handleOpenConversationFromModal(conv.assistantName, conv.id)
                    }
                  >
                    Abrir
                  </button>
                </div>
              ))}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
