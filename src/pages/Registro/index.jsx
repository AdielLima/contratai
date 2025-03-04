// Registro.jsx
import React, { useState } from "react";
// Importamos nossos estilos
import {
  Button,
  ButtonContainer,
  Container,
} from "./styles";

export default function Registro({ onCloseModal }) {
  const [step, setStep] = useState(1);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCPFChange = (e) => {
    const { name, value } = e.target;
    const formattedCPF = formatCPF(value);
    handleChange({ target: { name, value: formattedCPF } });
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')                  // remove caracteres não numéricos
      .replace(/^(\d{2})(\d)/g, '($1) $2') // adiciona parênteses no DDD
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2') // adiciona o hífen após o quinto dígito
      .slice(0, 15); // limita o tamanho máximo do input
  };

  const handleWhatsappChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatPhone(value);
    handleChange({ target: { name, value: formattedValue } });
  };

  const formatName = (value) => {
    return value.replace(/[^a-zA-ZÀ-ú\s]/g, '');
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatName(value);
    handleChange({ target: { name, value: formattedValue } });
  };

  const [emailError, setEmailError] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } });

    if (value === '' || isValidEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Digite um email válido.');
    }
  };



  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    whatsapp: "",
  });

  // Lida com alterações dos inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Avançar para a próxima etapa
  const handleNext = () => {
    setStep(step + 1);
  };

  // Voltar para a etapa anterior
  const handleBack = () => {
    setStep(step - 1);
  };

  // Quando concluir, fechamos o modal
  const handleFinish = () => {
    // Aqui você poderia enviar os dados para o backend
    // e, se tudo estiver OK, fecha o modal
    onCloseModal();
  };

  return (
    <Container>
      {/* ETAPA 1: Registro */}
      {step === 1 && (
        <>
          <div class="field">
            <label class="label">Nome Completo</label>
            <div class="control">
              <input class="input"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleNameChange}
                placeholder="Digite seu nome" />
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="Digite seu email"
                type="email" />
            </div>
          </div>

          <div class="field">
            <label class="label">CPF</label>
            <div class="control">
              <input class="input"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                placeholder="Digite seu CPF"
                maxLength={14}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">WhatsApp</label>
            <div class="control">
              <input class="input"
               id="whatsapp"
               name="whatsapp"
               value={formData.whatsapp}
               onChange={handleWhatsappChange}
               placeholder="Digite seu WhatsApp"
               maxLength={15}
              />
            </div>
          </div>

          <ButtonContainer>
            {/* Etapa 1 não tem botão de voltar */}
            <Button
              onClick={handleNext}
              disabled={
                !formData.nome ||
                !formData.cpf ||
                !formData.email ||
                !formData.whatsapp
              }
            >
              Próximo
            </Button>
          </ButtonContainer>
        </>
      )}

      {/* ETAPA 2: Pagamento */}
      {step === 2 && (
        <>
          <p>Aqui você pode exibir a tela de pagamento.</p>

          <ButtonContainer>
            <Button onClick={handleBack}>Voltar</Button>
            <Button onClick={handleFinish}>Finalizar</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}
