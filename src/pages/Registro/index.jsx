import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

// Endpoints dos Webhooks
const REGISTRATION_URL = "/webhook/7169ecb5-f7ea-43ac-aaaa-2867f2a25e6f";
const PLAN_URL = "/webhook/plano";
const LOGIN_URL = "/webhook/autenticacao";
const CARD_PAYMENT_URL = "/webhook/pagamento-cartao";
const PIX_PAYMENT_URL = "https://seu-n8n.com/webhook/pagamento-pix";

export default function Registro({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const stepTitles = {
    1: "Registro",
    2: "Escolha de Plano",
    3: "Pagamento",
    4: "Entrar",
  };

  // Guardamos o ID do usuário (retornado no passo 1)
  const [userId, setUserId] = useState(null);
  // Guardamos o ID do plano retornado no passo 2 (1 ou 2, de acordo com o banco)
  const [planId, setPlanId] = useState(null);

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    whatsapp: "",
    senhaRegistro: "",
    plano: "", // "plano_mensal" ou "plano_credito"
    metodoPagamento: "", // "cartao" ou "pix"
    emailLogin: "",
    senha: "",
  });

  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dados para Pix
  const [pixData, setPixData] = useState({ qrCode: "", copiaCola: "" });

  // -------------------------------
  // Funções de formatação (passo 1)
  // -------------------------------
  const formatCPF = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");

  const formatPhone = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
      .slice(0, 15);

  const formatName = (value) => value.replace(/[^a-zA-ZÀ-ú\s]/g, "");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handlers
  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, nome: formatName(e.target.value) }));
  };

  const handleCPFChange = (e) => {
    setFormData((prev) => ({ ...prev, cpf: formatCPF(e.target.value) }));
  };

  const handleWhatsappChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      whatsapp: formatPhone(e.target.value),
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, email: value }));

    if (!value || isValidEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Digite um email válido.");
    }
  };

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
  const prevStep = () => step > 1 && setStep((prev) => prev - 1);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  // -------------------------------
  // Função de Login (Passo 4)
  // -------------------------------
  const handleLogin = async () => {
    try {
      // Chama webhook de login no n8n
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.emailLogin,
          senha: formData.senha,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }
      
      handleClose();
      navigate("/assistentes");
    } catch (error) {
      setLoginError("Falha na autenticação. Verifique suas credenciais.");
      console.error(error);
    }
  };

  // -------------------------------
  // Integração com Mercado Pago
  // -------------------------------
  const cardFormRef = useRef(null);

  useEffect(() => {
    // Inicializa o cardForm apenas no passo 3, se for "cartao" e ainda não foi inicializado
    if (step === 3 && formData.metodoPagamento === "cartao" && !cardFormRef.current) {
      if (window.MercadoPago) {
        const mp = new window.MercadoPago("TEST-96fd7ebe-46d2-43cd-a968-e03ecc005ee2", { locale: "pt-BR" });
        // Substitua "TEST-XXXX" pela sua Public Key real do Mercado Pago

        // Define o valor com base no plano
        let amountToPay = "130.00";
        if (formData.plano === "plano_credito") {
          amountToPay = "10.00";
        }

        cardFormRef.current = mp.cardForm({
          amount: amountToPay,
          iframe: true, // Monta os campos (cardNumber, expirationDate, securityCode) via iframe
          form: {
            id: "form-checkout",
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número do cartão",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de segurança",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular do cartão",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emissor",
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: "Parcelas",
            },
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número do documento",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error) {
                console.warn("Erro ao montar formulário:", error);
              } else {
                console.log("Formulário do cartão montado com sucesso!");
              }
            },
            onSubmit: (event) => {
              event.preventDefault();

              // Pega dados do formulário
              const {
                paymentMethodId,
                issuerId,
                cardholderEmail,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardFormRef.current.getCardFormData();

              // Envia ao webhook do n8n
              fetch(CARD_PAYMENT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id: userId,
                  plan_id: planId,
                  paymentMethodId,
                  issuerId,
                  token,
                  installments,
                  identificationNumber,
                  identificationType,
                  email: cardholderEmail,
                  amount,
                }),
              })
                .then((res) => {
                  if (!res.ok) throw new Error("Falha ao processar pagamento");
                  return res.json();
                })
                .then((data) => {
                  // Verifica se o retorno é um array e pega o primeiro objeto
                  const paymentInfo = Array.isArray(data) ? data[0] : data;
                
                  if (paymentInfo.status === 'approved') {
                    console.log("Pagamento aprovado:", paymentInfo);
                    nextStep(); // Avança para a próxima tela
                  } else if (paymentInfo.status === 'rejected') {
                    console.error("Pagamento rejeitado:", paymentInfo);
                    alert("Pagamento não aprovado. Tente novamente.");
                  }
                })
                .catch((err) => {
                  console.error("Erro no pagamento:", err);
                  alert("Ocorreu um erro no pagamento. Tente novamente.");
                });
            },
            onFetching: (resource) => {
              console.log("Processando pagamento...", resource);
              const progressBar = document.querySelector(".progress-bar");
              if (progressBar) {
                progressBar.removeAttribute("value");
              }
              return () => {
                if (progressBar) {
                  progressBar.setAttribute("value", "0");
                }
              };
            },
          },
        });
      } else {
        console.error("Mercado Pago SDK não encontrada.");
      }
    }
  }, [step, formData.metodoPagamento, formData.plano, userId, planId]);

  // -------------------------------
  // submitStep: controla fluxo do wizard
  // -------------------------------
  async function submitStep() {
    if (step === 1) {
      // Cria usuário em "users"
      try {
        const response = await fetch(
          REGISTRATION_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.nome,
              cpf: formData.cpf,
              email: formData.email,
              whatsapp: formData.whatsapp,
              password: formData.senhaRegistro,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao registrar usuário");
        }
        const data = await response.json();
        // Suponha que o webhook retorne { id: 'xxx' }
        setUserId(data.id);
      } catch (error) {
        console.error(error);
        return;
      }
      nextStep();
    } else if (step === 2) {
      // Usuário escolheu plano => atualiza user_plans com base nos IDs do banco
      let selectedPlanId;
      // No banco: 1 => plano_credito, 2 => plano_mensal
      if (formData.plano === "plano_credito") {
        selectedPlanId = 1;
      } else {
        selectedPlanId = 2;
      }

      try {
        const response = await fetch(
          PLAN_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              plan_id: selectedPlanId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao associar plano");
        }
        const data = await response.json();
        // Suponha que retorne { plan_id: 1 } ou { plan_id: 2 }
        setPlanId(data.plan_id);

        // Definimos o método de pagamento baseado no plan_id
        // plan_id=1 (plano_credito) => Pix
        // plan_id=2 (plano_mensal) => Cartão
        if (data.plan_id === 1) {
          setFormData((prev) => ({ ...prev, metodoPagamento: "pix" }));
        } else {
          setFormData((prev) => ({ ...prev, metodoPagamento: "cartao" }));
        }
        nextStep();
      } catch (error) {
        console.error(error);
        return;
      }
    } else if (step === 3) {
      // Se PIX, geramos QR Code e exibimos
      if (formData.metodoPagamento === "pix") {
        try {
          const response = await fetch(
            PIX_PAYMENT_URL,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: userId,
                plan_id: planId,
                email: formData.email,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Falha ao gerar Pix");
          }
          const data = await response.json();
          // Ex: data = { qrCode: "data:image/png;base64...", copiaCola: "chave123..." }
          setPixData({ qrCode: data.qrCode, copiaCola: data.copiaCola });
        } catch (error) {
          console.error(error);
          return;
        }
      }

      // Se for pagamento com cartão, o nextStep ocorre no onSubmit do cardForm
      if (formData.metodoPagamento !== "cartao") {
        nextStep();
      }
    }
  }

  // -------------------------------
  // Renderização de cada passo
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
              <div className="column">
                <div className="field">
                  <label className="label">Nome Completo</label>
                  <div className="control">
                    <input
                      className="input"
                      name="nome"
                      value={formData.nome}
                      onChange={handleNameChange}
                      placeholder="Seu nome"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      placeholder="Seu email"
                    />
                    {emailError && (
                      <p className="help is-danger">{emailError}</p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Senha</label>
                  <div className="control">
                    <input
                      className="input"
                      name="senhaRegistro"
                      type="password"
                      value={formData.senhaRegistro}
                      onChange={handleChange}
                      placeholder="Digite uma senha"
                    />
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label className="label">CPF</label>
                  <div className="control">
                    <input
                      className="input"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      placeholder="Apenas números"
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
                      placeholder="(XX) 9XXXX-XXXX"
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
      // Passo 2: Escolha de Plano
      // --------------------------------
      case 2:
        return (
          <>
            <div className="columns is-multiline is-centered">
              {/* Exemplo Plano Mensal (ID=2) */}
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
                      <strong>R$130,00/mês</strong>
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

              {/* Exemplo Plano por Crédito (ID=1) */}
              <div className="column is-one-third">
                <div
                  className={`card ${
                    formData.plano === "plano_credito" ? "selected-card" : ""
                  }`}
                >
                  <header className="card-header">
                    <p className="card-header-title">Plano por Crédito</p>
                  </header>
                  <div className="card-content">
                    <p>
                      <strong>R$10,00</strong>
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
          // Checkout Transparente com Mercado Pago
          return (
            <>
              <h1 className="title is-4">Pagamento com Cartão</h1>
              <form id="form-checkout">
                {/* Campos injetados por iframe */}
                <div id="form-checkout__cardNumber" className="container" />
                <div id="form-checkout__expirationDate" className="container" />
                <div id="form-checkout__securityCode" className="container" />

                {/* Campos que precisam ser <input> ou <select> normais */}
                <input
                  type="text"
                  id="form-checkout__cardholderName"
                  placeholder="Titular do cartão"
                />
                <select id="form-checkout__issuer" />
                <select id="form-checkout__installments" />
                <select id="form-checkout__identificationType" />
                <input
                  type="text"
                  id="form-checkout__identificationNumber"
                  placeholder="Número do documento"
                />
                <input
                  type="email"
                  id="form-checkout__cardholderEmail"
                  placeholder="E-mail"
                />

                {/* Botão de submit e barra de progresso */}
                <button type="submit" id="form-checkout__submit">
                  Pagar
                </button>
                <progress value="0" className="progress-bar">
                  Carregando...
                </progress>
              </form>
            </>
          );
        } else {
          // Fluxo PIX
          return (
            <>
              <p>Escaneie o QR Code ou copie o código PIX:</p>
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
                  <strong>Cópia e Cola:</strong> <br />
                  {pixData.copiaCola}
                </div>
              ) : (
                <p>Carregando chave Pix...</p>
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
                  placeholder="Seu email de login"
                  value={formData.emailLogin}
                  onChange={handleChange}
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
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={handleChange}
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
  // Render do Modal
  // -------------------------------
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card" style={{ width: "90%", maxWidth: "700px" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">{stepTitles[step]}</p>
          <button className="delete" aria-label="close" onClick={handleClose} />
        </header>
        <section className="modal-card-body">{renderStep()}</section>
      </div>
    </div>
  );
}
