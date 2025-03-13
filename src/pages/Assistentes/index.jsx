import React, { useState, useEffect, useRef } from "react";
import { RiAttachmentLine } from "react-icons/ri";
import { FaSearch, FaArrowUp } from "react-icons/fa";
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
  TopBar,
  ContainerTextArea,
  FilePreviewContainer,
  StyledImage,
  FileNameContainer,
  CloseIcon,
  PreviewWrapper,
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
  // Alterado: estado para múltiplos arquivos (até 10)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

const handleProfileClick = () => {
  setShowProfileOptions(!showProfileOptions);
};

const handleLogout = () => {
  // Implemente a lógica de logout aqui
  alert("Logout");
};

const handleSubscriptions = () => {
  // Implemente a lógica para assinaturas aqui
  alert("Assinaturas");
};

  // Outras states...
  const [conversationsByAssistant, setConversationsByAssistant] = useState({
    ContratAI: [],
    DFD: [],
    ETP: [],
    "Mapa de Risco": [],
    "Termo de Referência": [],
    Jurisprudência: [],
  });
  const [selectedAssistant, setSelectedAssistant] = useState("ContratAI");
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
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
    { label: "Termo de Referência", icon: <MdOutlineMoreVert size={18} />, value: "Termo de Referência" },
    { label: "Jurisprudência", icon: <MdOutlineMoreVert size={18} />, value: "Jurisprudência" },
  ];

  // Map de webhooks
  const webhookMap = {
    ContratAI: "https://contratai.app.n8n.cloud/webhook/contratai",
    DFD: "https://contratai.app.n8n.cloud/webhook/dfd",
    ETP: "https://contratai.app.n8n.cloud/webhook/etp",
    "Mapa de Risco": "https://contratai.app.n8n.cloud/webhook/mapa-risco",
    "Termo de Referência": "https://contratai.app.n8n.cloud/webhook/termo-referencia",
    Jurisprudência: "https://contratai.app.n8n.cloud/webhook/jurisprudencia",
  };

  const MAX_CONVERSATIONS = 5;
  const currentAssistantConversations = conversationsByAssistant[selectedAssistant] || [];
  const limitedConversations = currentAssistantConversations.slice(0, MAX_CONVERSATIONS);
  const selectedConversation = currentAssistantConversations.find(
    (conv) => conv.id === selectedConversationId
  );
  const currentMessages = selectedConversation ? selectedConversation.messages : [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages, selectedAssistant, selectedConversationId]);

  const handleSelectAssistant = (value) => {
    setSelectedAssistant(value);
  };

  const handleSelectConversation = (conversationId) => {
    setSelectedConversationId(conversationId);
  };

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

  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  /**
   * Botão para abrir o input de arquivos.
   */
  const handleFileButtonClick = () => {
    // Se já tiver 10 arquivos, não faz nada (ou pode exibir um alerta)
    if (selectedFiles.length >= 10) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handler para seleção de arquivos.
   * Permite adicionar novos arquivos e garante que o total não ultrapasse 10.
   * Também limpa o input para permitir a seleção do mesmo arquivo posteriormente.
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => {
        const combined = [...prevFiles, ...newFiles];
        return combined.slice(0, 10);
      });
      // Limpa o valor do input para permitir reanexar o mesmo arquivo
      e.target.value = null;
    }
  };

  /**
   * Remove um arquivo específico da lista de arquivos selecionados.
   */
  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    // Opcional: resetar o input também
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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
    return newId;
  };

  const addMessageToCurrentConversation = (newMessage) => {
    if (!selectedConversationId) {
      const newId = createConversationWithFirstMessage(newMessage);
      setSelectedConversationId(newId);
    } else {
      setConversationsByAssistant((prev) => {
        const updated = { ...prev };
        const convArray = [...(updated[selectedAssistant] || [])];
        const index = convArray.findIndex((c) => c.id === selectedConversationId);
        if (index === -1) {
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
   * Envia a mensagem (texto e/ou arquivos) ao webhook.
   */
  const handleSendMessage = async () => {
    // Se não houver texto nem arquivos, sai
    if (!text.trim() && selectedFiles.length === 0) return;

    // Se houver texto e arquivos, combinamos as informações
    if (text.trim()) {
      let content = text.trim();
      if (selectedFiles.length > 0) {
        content += "\n\nAnexo(s): " + selectedFiles.map((file) => file.name).join(", ");
      }
      addMessageToCurrentConversation({
        role: "user",
        content,
      });
    } else if (selectedFiles.length > 0) {
      // Caso não haja texto, mas haja arquivos
      addMessageToCurrentConversation({
        role: "user",
        content: `Arquivo(s): ${selectedFiles.map((file) => file.name).join(", ")}`,
      });
    }

    // Limpa a área de texto
    setText("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    try {
      setIsLoading(true);
      addMessageToCurrentConversation({
        role: "assistant-loading",
        content: <LoadingDots />,
      });

      const webhookUrl = webhookMap[selectedAssistant] || "";
      const formData = new FormData();
      // Define o contentType de acordo com os dados enviados
      let contentType = "";
      if (text.trim() && selectedFiles.length > 0) {
        contentType = "both";
      } else if (text.trim()) {
        contentType = "text";
      } else {
        contentType = "file";
      }
      formData.append("assistant", selectedAssistant);
      formData.append("contentType", contentType);

      if (text.trim()) {
        formData.append("message", text.trim());
      }
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => formData.append("data", file));
      }

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
      removeLoadingFromCurrentConversation();
      addMessageToCurrentConversation({
        role: "assistant",
        content: botAnswer,
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setIsLoading(false);
      removeLoadingFromCurrentConversation();
      addMessageToCurrentConversation({
        role: "assistant",
        content: "Ops! Ocorreu um erro ao se comunicar com o servidor.",
      });
    } finally {
      // Limpa os arquivos selecionados após o envio
      setSelectedFiles([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <div className="historico-container">
              <div className="historico-header">
                <h3 className="fonteHistorico">Histórico</h3>
                <div className="search-icon" onClick={handleOpenModalAllConversations}>
                  <FaSearch size={16} />
                </div>
              </div>
              <ul className="historico-list">
                <li className="conversation-item" style={{ paddingRight: "40px" }}>
                  <span>Mensagem Fictícia 1</span>
                </li>
                <li className="conversation-item" style={{ paddingRight: "40px" }}>
                  <span>Mensagem Fictícia 2</span>
                </li>
                <li className="conversation-item" style={{ paddingRight: "40px" }}>
                  <span>Mensagem Fictícia 3</span>
                </li>
                <li className="conversation-item" style={{ paddingRight: "40px" }}>
                  <span>Mensagem Fictícia 4</span>
                </li>
              </ul>
            </div>
            <div className="botao-minha-conta">
              <button class="button is-rounded">Minha Conta</button>
            </div>
            
            {/* <div className="botao-minha-conta">
              <a href="#0">Minha Conta</a>
            </div> */}
          </div>
        </Sidebar>

        {/* CONTEÚDO PRINCIPAL */}
        <MainContent>
          <TopBar>
            <h2 className="subtitle is-5">{displayedAssistant}</h2>
            <h2>oi</h2>
          </TopBar>
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
          <ContainerTextArea>
            <SearchBox>
              {/* Renderiza preview para cada arquivo selecionado */}
              {selectedFiles.length > 0 && (
                <FilePreviewContainer>
                  {selectedFiles.map((file, index) => (
                    <PreviewWrapper key={index}>
                      {file.type.startsWith("image/") ? (
                        <figure className="image is-128x128">
                          <StyledImage src={URL.createObjectURL(file)} alt="preview" />
                        </figure>
                      ) : (
                        <FileNameContainer>
                          <strong>{file.name}</strong>
                        </FileNameContainer>
                      )}
                      <CloseIcon onClick={() => handleRemoveFile(index)} />
                    </PreviewWrapper>
                  ))}
                </FilePreviewContainer>
              )}
              <SearchTextArea
                ref={textAreaRef}
                autoFocus
                placeholder="Pergunte alguma coisa"
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
              />
              <ActionsInTextArea>
                <SmallButton
                  onClick={handleFileButtonClick}
                  disabled={selectedFiles.length >= 10}
                >
                  <RiAttachmentLine color="white" size={19} />
                </SmallButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  multiple
                  onChange={handleFileChange}
                />
                <SmallButton onClick={handleSendMessage}>
                  <FaArrowUp color="white" size={19} />
                </SmallButton>
              </ActionsInTextArea>
            </SearchBox>
          </ContainerTextArea>
          <TipContainer>
            <h5 className="subtitle is-6">
              Para obter uma resposta mais precisa, elabore cuidadosamente a sua pergunta.
            </h5>
          </TipContainer>
        </MainContent>
      </Container>

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
