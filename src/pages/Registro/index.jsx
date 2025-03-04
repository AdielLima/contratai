import React, { useState } from "react";
import "./styles.css";

export default function Registro({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  // Aqui você pode armazenar todos os dados necessários
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    whatsapp: "",
    plano: "", // "plano_mensal" ou "plano_credito"
    metodoPagamento: "", // "cartao" ou "pix" (definido automaticamente ao selecionar o plano)
    // Campos para cartão
    numeroCartao: "",
    nomeTitular: "",
    validade: "",
    cvv: "",
  });

  // Possível estado de erro ou feedback
  const [emailError, setEmailError] = useState("");

  // Exemplo de estado para armazenar o QR Code do Asaas (se Pix)
  const [pixData, setPixData] = useState({
    qrCode: "",
    copiaCola: "",
  });

  // -------------------------------
  // Passo 1: Funções para formatar e validar
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

  // Handlers genéricos
  const handleNameChange = (e) => {
    const formattedValue = formatName(e.target.value);
    setFormData((prev) => ({
      ...prev,
      nome: formattedValue,
    }));
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cpf: formatted,
    }));
  };

  const handleWhatsappChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({
      ...prev,
      whatsapp: formatted,
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));

    if (!value || isValidEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Digite um email válido.");
    }
  };

  const handleChange = (e) => {
    // Handler genérico para inputs do cartão
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // -------------------------------
  // Controles de Avançar/Voltar
  // -------------------------------
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  // Fechar o modal (chama a prop onClose)
  const handleClose = () => {
    // Decide se quer resetar ou não o wizard.
    setStep(1);
    onClose();
  };

  // -------------------------------
  // Submeter as informações em cada passo
  // -------------------------------
  async function submitStep() {
    // Incluir try/catch conforme a necessidade.
    if (step === 1) {
      // Passo 1: Criar usuário no Supabase e Asaas
      try {
        /*
        await fetch('SEU_ENDPOINT_N8N_REGISTRO', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      // Passo 2: Plano foi escolhido.
      // Vamos definir o metodoPagamento AUTOMATICAMENTE
      // e pular direto para o passo de pagamento.
      try {
        /*
        await fetch('SEU_ENDPOINT_N8N_ESCOLHA_PLANO', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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

      // Determina método com base no plano:
      if (formData.plano === "plano_mensal") {
        setFormData((prev) => ({ ...prev, metodoPagamento: "cartao" }));
      } else if (formData.plano === "plano_credito") {
        setFormData((prev) => ({ ...prev, metodoPagamento: "pix" }));
      }

      // Importante: Precisamos avançar para o próximo passo ASSIM QUE o estado
      // for atualizado. Podemos usar um setTimeout(0) ou simplesmente
      // avançar com nextStep() no final, pois a atualização do state
      // não impede a mudança de passo.
    }

    if (step === 3) {
      // Passo 3: Se for cartão, envia dados do cartão;
      //          Se for pix, gera QR code.
      if (formData.metodoPagamento === "cartao") {
        // Enviar dados do cartão
        try {
          /*
          await fetch('SEU_ENDPOINT_N8N_PAGAMENTO_CARTAO', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nomeTitular: formData.nomeTitular,
              numeroCartao: formData.numeroCartao,
              validade: formData.validade,
              cvv: formData.cvv,
              // Plano, email etc.
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
        // Pix: exemplo de chamada que retorna QR code e copia e cola
        try {
          /*
          const res = await fetch('SEU_ENDPOINT_N8N_PAGAMENTO_PIX', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

    // Avança para o próximo passo ao final
    nextStep();
  }

  // -------------------------------
  // Renderização Condicional de cada Passo
  // -------------------------------
  const renderStep = () => {
    switch (step) {
      // --------------------------------
      // Passo 1: Registro
      // --------------------------------
      case 1:
        return (
          <>
            <h1 className="title is-4">Registro</h1>
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

            <div className="buttons is-right">
              <button
                className="button is-link"
                onClick={submitStep}
                disabled={
                  !formData.nome ||
                  !formData.email ||
                  !formData.cpf ||
                  !formData.whatsapp ||
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
            <h1 className="title is-4">Escolha seu Plano</h1>
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
      //   - Cartão se "plano_mensal"
      //   - Pix se "plano_credito"
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
          // PIX: Mostrar QR Code e/ou código Copia e Cola
          return (
            <>
              <h1 className="title is-4">Pagamento via Pix</h1>
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
      // Passo 4: Login final
      // --------------------------------
      case 4:
        return (
          <>
            <h1 className="title is-4">Login</h1>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  name="emailLogin"
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
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
            <div className="buttons is-right">
              <button
                className="button is-link"
                onClick={() => {
                  // Exemplo de lógica de login ou redirecionamento
                  handleClose();
                }}
              >
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
          <p className="modal-card-title">Fluxo de Cadastro</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">{renderStep()}</section>
      </div>
    </div>
  );
}
