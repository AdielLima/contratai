// App.jsx
import React from "react";
import { PageWrapper, Container, Title, Spacer, TitleBenefits, CtaButton, CenteredImage } from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DotsContainer from "../../components/DotsContainer";
// import Slideshow from "../../components/Slideshow";
// import AssistenteInteligenteBox from "../../components/AssistenteInteligenteBox";
// import PersonalizadoBox from "../../components/PersonalizadoBox";
// import telaPc from "../../assets/img/telaComputador.webp"

function HomePage() {
  return (
    <>
      <PageWrapper>
        {/* Cabeçalho */}
        <Header />

        <Spacer size="2rem" />

        {/* Seção principal */}
        <Container>
          <Title>ContratAI</Title>

          <Spacer />

          <Title className="titulo-gradiente-vibrante">
            <b>Inteligência Artificial para Licitações e Contratos</b>
          </Title>

          <Spacer />

          <TitleBenefits>Simplifica o Processo</TitleBenefits>
          <TitleBenefits>Banco de Dados específico</TitleBenefits>
          <TitleBenefits>Otimiza a Tomada de Decisão</TitleBenefits>
          <TitleBenefits>Velocidade e Segurança Jurídica</TitleBenefits>

          <Spacer />

          {/* Pontinhos animados */}
          <DotsContainer />

          <Spacer />

          {/* <CtaButton href="#planos">
            Teste grátis por 2 dias
          </CtaButton>

          <Spacer />

          <TitleBenefits>Assistentes para cada necessidade</TitleBenefits>

          <CenteredImage src={telaPc} alt="Imagem" />
          <Spacer />

          <ul style={{ listStyle: "circle", marginLeft: "2rem" }}>
            <li>Alimentado por IA Generativa avançada</li>
            <li>Grande volume de dados vetoriais</li>
            <li>Disponível em qualquer momento</li>
            <li>Responde em segundos</li>
            <li>Analisa e resume documentos</li>
          </ul>

          <Spacer /> */}

          <CtaButton href="/Register">
            REGISTRE-SE
          </CtaButton>

          <Spacer />

          <Title className="titulo-gradiente-vibrante">
            Diferencial do ContratAI?
          </Title>

          <Spacer />
          <p>
            Com um vasto <strong>banco de dados vetorizado contendo leis,
              doutrinas, jurisprudências do TCU e modelos da AGU,</strong>
            os assistentes inteligentes entregam soluções rápidas,
            fundamentadas e com total segurança jurídica,
            respondendo às suas perguntas em segundos.
          </p>
        </Container>

        <Spacer />

        {/* <Spacer size="4rem" /> */}

        {/* Slideshow */}
        {/* <Container>
          <Slideshow />
        </Container> */}

        {/* <Spacer size="4rem" /> */}

        {/* Seção Planos */}
        {/* <Container id="planos" style={{ textAlign: "center" }}>
          <Spacer size="2rem" />
          <h2>Simplifique agora e veja como tudo pode ser mais simples.</h2>
          <Spacer size="2rem" />

          <AssistenteInteligenteBox />

          <Spacer size="2rem" />

          <PersonalizadoBox />

          <Spacer size="4rem" />
        </Container> */}

        {/* Rodapé */}
        <Footer />
      </PageWrapper>
    </>
  );
}

export default HomePage;
