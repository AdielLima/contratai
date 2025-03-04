// HomePage.jsx
import React, { useState } from "react";
import {
  Container,
  Title,
  Spacer,
} from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DotsContainer from "../../components/DotsContainer";
import Registro from "../Registro";
import "./styles.css";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />

      <Spacer size="2rem" />

      <Container>
        <h1 className="title is-size-1">ContratAI</h1>
        <Spacer />
        <Title className="titulo-gradiente-vibrante">
          <b>Inteligência Artificial para Licitações e Contratos</b>
        </Title>
        <Spacer />
        <p className="subtitle">Simplifica o Processo</p>
        <p className="subtitle">Banco de Dados específico</p>
        <p className="subtitle">Otimiza a Tomada de Decisão</p>
        <p className="subtitle">Velocidade e Segurança Jurídica</p>
        <Spacer />
        <DotsContainer />
        <h1 className="title is-size-3">Diferencial do ContratAI?</h1>
        <p>
          <span className="tag is-light is-medium">
            Com um vasto <strong>banco de dados vetorizado contendo leis,
              doutrinas, jurisprudências do TCU e modelos da AGU,</strong> os assistentes
            inteligentes entregam soluções rápidas, fundamentadas e com total
            segurança jurídica, respondendo às suas perguntas em segundos.
          </span>
        </p>

        <Spacer />
        <button className="button is-black is-large custom-button" onClick={openModal}>
          Registre-se
        </button>
        <Spacer />
      </Container>

      <Footer />

      {/* Modal Bulma */}
      {/* <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Registro</p>
            <button className="delete" aria-label="close" onClick={closeModal}></button>
          </header>
          <section className="modal-card-body">
            <Registro onCloseModal={closeModal} />
          </section>
        </div>
      </div> */}
      <Registro isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default HomePage;
