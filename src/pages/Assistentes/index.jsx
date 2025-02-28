// Assistentes.jsx
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
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
  const [messages, setMessages] = useState([]);

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

  /**
   * Lida com mudança de texto no textarea
   */
  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  /**
   * Envia a mensagem para o endpoint do n8n
   */
  const handleSendMessage = async () => {
    if (!text.trim()) return;

    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    const userMessage = text;
    setText(""); // limpa o campo

    console.log("Enviando mensagem para n8n:", userMessage);

    try {
      // AJUSTE AQUI: Se o seu Webhook for outro path
      const webhookUrl = "https://contratai.app.n8n.cloud/webhook/123";

      const bodyRequest = { message: userMessage };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyRequest),
      });

      // Se não for 2xx, pode gerar erro no .json()
      if (!response.ok) {
        throw new Error(
          `Erro HTTP: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Resposta do n8n:", data);

      /**
       * TENTA encontrar "message" em vários formatos possíveis:
       * 1) data[0]?.json?.message (caso seja um array com { json: { message: ... } })
       * 2) data?.json?.message (caso seja objeto único: { json: { message: ... } })
       * 3) data?.message (caso seja objeto direto: { message: ... } )
       */
      let botAnswer =
        data[0]?.json?.message ||
        data?.json?.message ||
        data?.message ||
        "Desculpe, não entendi...";

      // Adiciona a resposta do bot
      setMessages((prev) => [...prev, { role: "assistant", content: botAnswer }]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      // Mensagem de erro no chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ops! Ocorreu um erro ao se comunicar com o servidor.",
        },
      ]);
    }
  };

  /**
   * Enviar ao pressionar Enter (sem Shift)
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Se tiver alguma mensagem, exibe a área de conversa.
   */
  const hasConversation = messages.length > 0;

  return (
    <Container>
      {/* SIDEBAR */}
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

          {/* Histórico de Conversas na Sidebar */}
          {hasConversation && (
            <>
              <MenuItem style={{ marginTop: "20px", fontWeight: "bold" }}>
                Conversa
              </MenuItem>
              {messages.map((msg, index) => (
                <MenuItem
                  key={index}
                  style={{
                    fontSize: "0.85rem",
                    opacity: 0.8,
                    lineHeight: "1.2em",
                  }}
                >
                  <strong>{msg.role === "user" ? "Você" : "Bot"}:</strong>{" "}
                  {msg.content.length > 20
                    ? msg.content.slice(0, 20) + "..."
                    : msg.content}
                </MenuItem>
              ))}
            </>
          )}
        </SidebarMenu>
      </Sidebar>

      {/* CONTEÚDO PRINCIPAL */}
      <MainContent>
        <TopBar>
          {!hasConversation ? (
            <TopBarTitle>Como Posso Ajudar?</TopBarTitle>
          ) : (
            <TopBarTitle>Conversa</TopBarTitle>
          )}
        </TopBar>

        {/* Área do Chat */}
        {hasConversation ? (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 20px",
            }}
          >
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    margin: "8px 0",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: isUser ? "#cce5ff" : "#fff",
                      color: "#333",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
            <p>Digite sua primeira pergunta para iniciar a conversa.</p>
          </div>
        )}

        <ContainerTextArea>
          <SearchBox>
            <SearchTextArea
              autoFocus
              placeholder="Pergunte alguma coisa"
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
            <ActionsInTextArea>
              <SmallButton>
                <RiAttachmentLine color="white" size={19} />
              </SmallButton>
              <SmallButton>
                <PiWaveformBold color="white" size={19} />
              </SmallButton>
              <SmallButton onClick={handleSendMessage}>
                <FaArrowUp color="white" size={19} />
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
