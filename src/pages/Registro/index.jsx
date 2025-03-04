import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Registro({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Mapeamento do passo -> Título
  const stepTitles = {
    1: "Registro",
    2: "Escolha de Plano",
    3: "Pagamento",
    4: "Entrar",
  };

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    whatsapp: "",
    senhaRegistro: "",
    plano: "", // "plano_mensal" ou "plano_credito"
    metodoPagamento: "", // "cartao" ou "pix"
    numeroCartao: "",
    nomeTitular: "",
    validade: "",
    cvv: "",
    // Campos de Login:
    emailLogin: "",
    senha: "",
  });

  // Estado para erro de email no registro (passo 1)
  const [emailError, setEmailError] = useState("");

  // Estado para exibir erro de login (passo 4)
  const [loginError, setLoginError] = useState("");

  // Exemplo de estado para armazenar o QR Code do Asaas (se Pix)
  const [pixData, setPixData] = useState({
    qrCode: "",
    copiaCola: "",
  });

  // -------------------------------
  // Funções de formatação (passo 1)
  // -------------------------------
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
      .slice(0, 15);
  };

  const formatName = (value) => {
    return value.replace(/[^a-zA-ZÀ-ú\s]/g, "");
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handlers de input
  const handleNameChange = (e) => {
    const formattedValue = formatName(e.target.value);
    setFormData((prev) => ({ ...prev, nome: formattedValue }));
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  const handleWhatsappChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));

    if (!value || isValidEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Digite um email válido.");
    }
  };

  // Handler genérico para cartão e login
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // -------------------------------
  // Controles de Avançar/Voltar
  // -------------------------------
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  // -------------------------------
  // Função de autenticação (Login)
  // -------------------------------
  const handleLogin = async () => {
    try {
      // Exemplo fictício de requisição de login:
      /*
      const response = await fetch("SEU_ENDPOINT_DE_LOGIN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.emailLogin,
          senha: formData.senha,
        }),
      });

      if (!response.ok) {
        // Se deu erro na autenticação
        throw new Error("Credenciais inválidas");
      }
      // Se chegou aqui, login deu certo
      */

      // Sucesso: fecha o modal e redireciona
      handleClose();
      navigate("/assistentes");
    } catch (error) {
      setLoginError("Falha na autenticação. Verifique suas credenciais.");
      console.error(error);
    }
  };

  // -------------------------------
  // Fluxo do wizard (submit em cada passo)
  // -------------------------------
  async function submitStep() {
    if (step === 1) {
      // Registra usuário
      try {
        /*
        await fetch("SEU_ENDPOINT_N8N_REGISTRO", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: formData.nome,
            cpf: formData.cpf,
            email: formData.email,
            whatsapp: formData.whatsapp,
          }),
        });
        */
      } catch (error) {
        console.error("Erro ao registrar usuário: ", error);
        return;
      }
    }

    if (step === 2) {
      // Envia escolha de plano
      try {
        /*
        await fetch("SEU_ENDPOINT_N8N_ESCOLHA_PLANO", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plano: formData.plano,
            email: formData.email,
          }),
        });
        */
      } catch (error) {
        console.error("Erro ao escolher plano: ", error);
        return;
      }

      // Define pagamento automaticamente
      if (formData.plano === "plano_mensal") {
        setFormData((prev) => ({ ...prev, metodoPagamento: "cartao" }));
      } else if (formData.plano === "plano_credito") {
        setFormData((prev) => ({ ...prev, metodoPagamento: "pix" }));
      }
    }

    if (step === 3) {
      // Se for cartão, envia dados; se Pix, gera QRCode
      if (formData.metodoPagamento === "cartao") {
        try {
          /*
          await fetch("SEU_ENDPOINT_N8N_PAGAMENTO_CARTAO", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nomeTitular: formData.nomeTitular,
              numeroCartao: formData.numeroCartao,
              validade: formData.validade,
              cvv: formData.cvv,
              plano: formData.plano,
              email: formData.email,
            }),
          });
          */
        } catch (error) {
          console.error("Erro ao processar pagamento com cartão: ", error);
          return;
        }
      } else {
        // Pix
        try {
          /*
          const res = await fetch("SEU_ENDPOINT_N8N_PAGAMENTO_PIX", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plano: formData.plano,
              email: formData.email,
            }),
          });
          const data = await res.json();
          setPixData({
            qrCode: data.qrCode,
            copiaCola: data.copiaCola,
          });
          */
        } catch (error) {
          console.error("Erro ao gerar Pix: ", error);
          return;
        }
      }
    }

    // Avança
    nextStep();
  }

  // -------------------------------
  // Renderização de cada Passo
  // -------------------------------
  const renderStep = () => {
    switch (step) {
      // --------------------------------
      // Passo 1: Registro
      // --------------------------------
      case 1:
        return (
          <>
            <div className="columns">
              {/* Coluna da esquerda */}
              <div className="column">
                <div className="field">
                  <label className="label">Nome Completo</label>
                  <div className="control">
                    <input
                      className="input"
                      name="nome"
                      value={formData.nome}
                      onChange={handleNameChange}
                      placeholder="Digite seu nome"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      placeholder="Digite seu email"
                      type="email"
                    />
                    {emailError && <p className="help is-danger">{emailError}</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Senha</label>
                  <div className="control">
                    <input
                      className="input"
                      name="senhaRegistro"
                      value={formData.senhaRegistro}
                      onChange={handleChange}
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* Coluna da direita */}
              <div className="column">
                <div className="field">
                  <label className="label">CPF</label>
                  <div className="control">
                    <input
                      className="input"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      placeholder="Digite seu CPF"
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">WhatsApp</label>
                  <div className="control">
                    <input
                      className="input"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleWhatsappChange}
                      placeholder="Digite seu WhatsApp"
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="buttons is-right">
              <button
                className="button is-link"
                onClick={submitStep}
                disabled={
                  !formData.nome ||
                  !formData.email ||
                  !formData.cpf ||
                  !formData.whatsapp ||
                  !formData.senhaRegistro ||
                  emailError
                }
              >
                Próximo
              </button>
            </div>
          </>
        );

      // --------------------------------
      // Passo 2: Escolher Plano
      // --------------------------------
      case 2:
        return (
          <>
            <div className="columns is-multiline is-centered">
              {/* Plano Mensal */}
              <div className="column is-one-third">
                <div
                  className={`card ${
                    formData.plano === "plano_mensal" ? "selected-card" : ""
                  }`}
                >
                  <header className="card-header">
                    <p className="card-header-title">Plano Mensal</p>
                  </header>
                  <div className="card-content">
                    <p>
                      <strong>R$ 130,00/mês</strong>
                    </p>
                    <ul>
                      <li>Perguntas ilimitadas</li>
                    </ul>
                  </div>
                  <footer className="card-footer">
                    <button
                      className="card-footer-item button is-link"
                      onClick={() =>
                        setFormData({ ...formData, plano: "plano_mensal" })
                      }
                    >
                      Selecionar
                    </button>
                  </footer>
                </div>
              </div>

              {/* Plano Por Crédito */}
              <div className="column is-one-third">
                <div
                  className={`card ${
                    formData.plano === "plano_credito" ? "selected-card" : ""
                  }`}
                >
                  <header className="card-header">
                    <p className="card-header-title">Plano Por Crédito</p>
                  </header>
                  <div className="card-content">
                    <p>
                      <strong>R$ 10,00</strong>
                    </p>
                    <ul>
                      <li>10 perguntas por dia</li>
                    </ul>
                  </div>
                  <footer className="card-footer">
                    <button
                      className="card-footer-item button is-link"
                      onClick={() =>
                        setFormData({ ...formData, plano: "plano_credito" })
                      }
                    >
                      Selecionar
                    </button>
                  </footer>
                </div>
              </div>
            </div>

            <div className="buttons is-right">
              <button className="button" onClick={prevStep}>
                Voltar
              </button>
              <button
                className="button is-link"
                onClick={submitStep}
                disabled={!formData.plano}
              >
                Próximo
              </button>
            </div>
          </>
        );

      // --------------------------------
      // Passo 3: Pagamento
      // --------------------------------
      case 3:
        if (formData.metodoPagamento === "cartao") {
          // FORMULÁRIO DE CARTÃO
          return (
            <>
              <h1 className="title is-4">Pagamento com Cartão</h1>
              <div className="field">
                <label className="label">Número do Cartão</label>
                <div className="control">
                  <input
                    className="input"
                    name="numeroCartao"
                    value={formData.numeroCartao}
                    onChange={handleChange}
                    placeholder="**** **** **** ****"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Nome do Titular</label>
                <div className="control">
                  <input
                    className="input"
                    name="nomeTitular"
                    value={formData.nomeTitular}
                    onChange={handleChange}
                    placeholder="Nome como está no cartão"
                  />
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">Validade</label>
                    <div className="control">
                      <input
                        className="input"
                        name="validade"
                        value={formData.validade}
                        onChange={handleChange}
                        placeholder="MM/AA"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">CVV</label>
                    <div className="control">
                      <input
                        className="input"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons is-right">
                <button className="button" onClick={prevStep}>
                  Voltar
                </button>
                <button className="button is-link" onClick={submitStep}>
                  Finalizar Pagamento
                </button>
              </div>
            </>
          );
        } else {
          // PIX
          return (
            <>
              <p>Seu QR Code ou código de pagamento foi gerado. Escaneie ou copie:</p>
              {pixData.qrCode ? (
                <div className="has-text-centered">
                  <img
                    src={pixData.qrCode}
                    alt="QR Code Pix"
                    style={{ maxWidth: "200px", margin: "1rem 0" }}
                  />
                </div>
              ) : (
                <p>Gerando QR Code...</p>
              )}
              {pixData.copiaCola ? (
                <div className="notification is-light">
                  <strong>Código Copia e Cola:</strong> <br />
                  {pixData.copiaCola}
                </div>
              ) : (
                <p>Gerando código Pix...</p>
              )}

              <div className="buttons is-right">
                <button className="button" onClick={prevStep}>
                  Voltar
                </button>
                <button className="button is-link" onClick={submitStep}>
                  Já efetuei o pagamento
                </button>
              </div>
            </>
          );
        }

      // --------------------------------
      // Passo 4: Login
      // --------------------------------
      case 4:
        return (
          <>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  name="emailLogin"
                  value={formData.emailLogin}
                  onChange={handleChange}
                  placeholder="Digite seu email de login"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Senha</label>
              <div className="control">
                <input
                  className="input"
                  name="senha"
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {loginError && (
              <p className="help is-danger" style={{ marginTop: "0.5rem" }}>
                {loginError}
              </p>
            )}

            <div className="buttons is-right">
              <button className="button is-link" onClick={handleLogin}>
                Entrar
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // -------------------------------
  // Renderização do Modal
  // -------------------------------
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card" style={{ width: "90%", maxWidth: "700px" }}>
        <header className="modal-card-head">
          {/* TÍTULO DINÂMICO */}
          <p className="modal-card-title">{stepTitles[step]}</p>

          <button className="delete" aria-label="close" onClick={handleClose} />
        </header>

        <section className="modal-card-body">{renderStep()}</section>
      </div>
    </div>
  );
}
