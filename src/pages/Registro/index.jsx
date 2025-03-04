// Registro.jsx
import React, { useState } from "react";

export default function Registro({ onCloseModal }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    whatsapp: "",
  });

  const [emailError, setEmailError] = useState("");

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleCPFChange = (e) => {
    const { name, value } = e.target;
    const formattedCPF = formatCPF(value);
    handleChange({ target: { name, value: formattedCPF } });
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
      .slice(0, 15);
  };

  const handleWhatsappChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatPhone(value);
    handleChange({ target: { name, value: formattedValue } });
  };

  const formatName = (value) => {
    return value.replace(/[^a-zA-ZÀ-ú\s]/g, "");
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatName(value);
    handleChange({ target: { name, value: formattedValue } });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);

    if (value === "" || isValidEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Digite um email válido.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFinish = () => {
    onCloseModal();
  };

  return (
    <div className="container">
      {step === 1 && (
        <>
          <div className="field">
            <label className="label">Nome Completo</label>
            <div className="control">
              <input
                className="input"
                id="nome"
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
                id="email"
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
                id="cpf"
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
                id="whatsapp"
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
              onClick={handleNext}
              disabled={!formData.nome || !formData.cpf || !formData.email || !formData.whatsapp}
            >
              Próximo
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p>Aqui você pode exibir a tela de pagamento.</p>

          <div className="buttons is-right">
            <button className="button" onClick={handleBack}>
              Voltar
            </button>
            <button className="button is-link" onClick={handleFinish}>
              Finalizar
            </button>
          </div>
        </>
      )}
    </div>
  );
}