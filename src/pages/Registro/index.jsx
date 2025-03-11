import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

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

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handlers
  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, nome: formatName(e.target.value) }));
  };

  const handleCPFChange = (e) => {
    setFormData((prev) => ({ ...prev, cpf: formatCPF(e.target.value) }));
  };

  const handleWhatsappChange = (e) => {
    setFormData((prev) => ({ ...prev, whatsapp: formatPhone(e.target.value) }));
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
      const response = await fetch(
        "https://seu-n8n.com/webhook/login-usuario", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.emailLogin,
            senha: formData.senha,
          }),
        }
      );

      if (!response.ok) {
        // Se o n8n retornar algum erro, lançamos exceção
        throw new Error("Credenciais inválidas");
      }

      // Se chegou aqui, login deu certo
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
  useEffect(() => {
    // Só inicializa o cardForm se for passo 3 E método "cartao"
    if (step === 3 && formData.metodoPagamento === "cartao") {
      if (window.MercadoPago) {
        const mp = new window.MercadoPago("TEST-96fd7ebe-46d2-43cd-a968-e03ecc005ee2", {
          locale: "pt-BR",
        });

        // Define o valor com base no plano
        let amountToPay = "130.00";
        if (formData.plano === "plano_credito") {
          amountToPay = "10.00";
        }

        mp.cardForm({
          amount: amountToPay,
          autoMount: true,
          form: {
            id: "form-checkout",
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Nome como está no cartão",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número do cartão",
            },
            cardExpirationMonth: {
              id: "form-checkout__cardExpirationMonth",
              placeholder: "MM",
            },
            cardExpirationYear: {
              id: "form-checkout__cardExpirationYear",
              placeholder: "YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "CVV",
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
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emissor",
            },
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error) console.warn("Erro ao montar formulário:", error);
            },
            onSubmit: (event) => {
              event.preventDefault();

              const {
                paymentMethodId,
                issuerId,
                cardholderEmail,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = mp.cardForm.getCardFormData();

              // Envia ao webhook do n8n que fará:
              // 1) Pagamento no Mercado Pago
              // 2) Registro na tabela `payments`
              fetch("https://seu-n8n.com/webhook/pagamento-cartao", {
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
                  console.log("Pagamento aprovado:", data);
                  // Avança para o passo 4
                  nextStep();
                })
                .catch((err) => {
                  console.error("Erro no pagamento:", err);
                  alert("Ocorreu um erro no pagamento. Tente novamente.");
                });
            },
            onFetching: (resource) => {
              console.log("Processando pagamento...", resource);
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
        const response = await fetch("/webhook-test/7169ecb5-f7ea-43ac-aaaa-2867f2a25e6f", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.nome,
            cpf: formData.cpf,
            email: formData.email,
            whatsapp: formData.whatsapp,
            password: formData.senhaRegistro,
          }),
        });

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
    }

    else if (step === 2) {
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
          "/webhook-test/898a307f-0283-459f-b159-dc0f6ca5d756",
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
    }

    else if (step === 3) {
      // Se PIX, geramos QR Code e exibimos
      if (formData.metodoPagamento === "pix") {
        try {
          const response = await fetch(
            "https://seu-n8n.com/webhook/pagamento-pix",
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
                    <p><strong>R$130,00/mês</strong></p>
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
                    <p><strong>R$10,00</strong></p>
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
                <div className="field">
                  <label className="label">Número do Cartão</label>
                  <div className="control">
                    <div id="form-checkout__cardNumber" className="mp-input" />
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Validade (MM/AA)</label>
                      <div className="control">
                        <div
                          id="form-checkout__cardExpirationMonth"
                          className="mp-input"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">&nbsp;</label>
                      <div className="control">
                        <div
                          id="form-checkout__cardExpirationYear"
                          className="mp-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Código de Segurança (CVV)</label>
                  <div className="control">
                    <div id="form-checkout__securityCode" className="mp-input" />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Nome do Titular</label>
                  <div className="control">
                    <div
                      id="form-checkout__cardholderName"
                      className="mp-input"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">E-mail</label>
                  <div className="control">
                    <div
                      id="form-checkout__cardholderEmail"
                      className="mp-input"
                    />
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Tipo Doc</label>
                      <div className="control">
                        <div
                          id="form-checkout__identificationType"
                          className="mp-input"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Número Doc</label>
                      <div className="control">
                        <div
                          id="form-checkout__identificationNumber"
                          className="mp-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Banco Emissor</label>
                  <div className="control">
                    <div id="form-checkout__issuer" className="mp-input" />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Parcelas</label>
                  <div className="control">
                    <div id="form-checkout__installments" className="mp-input" />
                  </div>
                </div>

                <div className="buttons is-right">
                  <button className="button" onClick={prevStep}>
                    Voltar
                  </button>
                  <button type="submit" className="button is-link">
                    Finalizar Pagamento
                  </button>
                </div>
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
