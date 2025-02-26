// App.jsx
import React from "react";
import { GlobalStyle, PageWrapper, Container, Title, Spacer } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DotsContainer from "../../components/DotsContainer";
import Slideshow from "../../components/Slideshow";
import AssistenteInteligenteBox from "../../components/AssistenteInteligenteBox";
import PersonalizadoBox from "../../components/PersonalizadoBox";

function HomePage() {
  return (
    <>
      {/* Aplica estilos globais */}
      <GlobalStyle />

      <PageWrapper>
        {/* Cabeçalho */}
        <Header />

        <Spacer size="2rem" />

        {/* Seção principal */}
        <Container>
          <Title>ContratAI</Title>
          <Title className="titulo-gradiente-vibrante">
            <b>Inteligência Artificial para Licitações e Contratos</b>
          </Title>

          <Spacer />

          <h2>Simplifica o Processo</h2>
          <h2>Banco de Dados específico</h2>
          <h2>Otimiza a Tomada de Decisão</h2>
          <h2>Velocidade e Segurança Jurídica</h2>

          <Spacer />

          {/* Pontinhos animados */}
          <DotsContainer />

          <Spacer />

          <div style={{ textAlign: "center" }}>
            <a
              href="#planos"
              style={{
                background: "#000",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: "16px",
                textDecoration: "none"
              }}
            >
              Teste grátis por 2 dias
            </a>
          </div>

          <Spacer />

          <Title className="titulo-gradiente-vibrante">
            Assistentes cada necessidade
          </Title>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://contratai.org/wp-content/uploads/2024/12/Sem-nome-1080-x-1350-px-1.webp"
              alt="Imagem"
              style={{ maxWidth: "400px", width: "100%" }}
            />
          </div>

          <Spacer />

          <ul style={{ listStyle: "circle", marginLeft: "2rem" }}>
            <li>Alimentado por IA Generativa avançada</li>
            <li>Grande volume de dados vetoriais</li>
            <li>Disponível em qualquer momento</li>
            <li>Responde em segundos</li>
            <li>Analisa e resume documentos</li>
          </ul>

          <Spacer />

          <div style={{ textAlign: "center" }}>
            <a
              href="#planos"
              style={{
                background: "#000",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: "16px",
                textDecoration: "none"
              }}
            >
              Conheça os planos
            </a>
          </div>

          <Spacer />

          <Title className="titulo-gradiente-vibrante">
            Diferencial do ContratAI?
          </Title>
          <p>
            Com um vasto <strong>banco de dados vetorizado contendo leis, 
            doutrinas, jurisprudências do TCU e modelos da AGU</strong>, 
            os assistentes inteligentes entregam soluções rápidas, 
            fundamentadas e com total segurança jurídica, 
            respondendo às suas perguntas em segundos.
          </p>
        </Container>

        <Spacer size="4rem" />

        {/* Slideshow */}
        <Container>
          <Slideshow />
        </Container>

        <Spacer size="4rem" />

        {/* Seção Planos */}
        <Container id="planos" style={{ textAlign: "center" }}>
          <Spacer size="2rem" />
          <h2>Simplifique agora e veja como tudo pode ser mais simples.</h2>
          <Spacer size="2rem" />

          <AssistenteInteligenteBox />

          <Spacer size="2rem" />

          <PersonalizadoBox />

          <Spacer size="4rem" />
        </Container>

        {/* Rodapé */}
        <Footer />
      </PageWrapper>
    </>
  );
}

export default HomePage;
