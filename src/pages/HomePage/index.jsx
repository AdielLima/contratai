// App.jsx
import React, { useState } from "react";
import {
  PageWrapper,
  Container,
  Title,
  Spacer,
  TitleBenefits,
  CtaButton,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DotsContainer from "../../components/DotsContainer";
import Registro from "../Registro";


function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      <Spacer size="2rem" />

      <Container>
        <h1 class="title is-size-1">ContratAI</h1>
        <Spacer />
        <Title className="titulo-gradiente-vibrante">
          <b>Inteligência Artificial para Licitações e Contratos</b>
        </Title>
        <Spacer />
        <p class="subtitle">Simplifica o Processo</p>
        <p class="subtitle">Banco de Dados específico</p>
        <p class="subtitle">Otimiza a Tomada de Decisão</p>
        <p class="subtitle">Velocidade e Segurança Jurídica</p>
        <Spacer />
        <DotsContainer />
        <h1 class="title is-size-3">Diferencial do ContratAI?</h1>
        <p>
          <span class="tag is-light is-medium"> Com um vasto <strong>banco de dados vetorizado contendo leis,
            doutrinas, jurisprudências do TCU e modelos da AGU, </strong> os assistentes inteligentes entregam
            soluções rápidas, fundamentadas e com total segurança jurídica, respondendo às suas perguntas em segundos.
          </span>
        </p>

        <Spacer />
        <button class="button is-black is-large" onClick={openModal}>Registre-se</button>
        <Spacer />

      </Container>

      <Footer />

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            {/* Botão para fechar o modal */}
            <CloseButton onClick={closeModal}>X</CloseButton>
            <Registro />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default HomePage;
