// AssistenteInteligenteBox.jsx
import React from "react";
import { AssistenteInteligenteBox, CtaButton } from "../styles";

function AssistenteInteligenteBoxComponent() {
  return (
    <AssistenteInteligenteBox>
      <img
        src="https://contratai.org/wp-content/uploads/2024/12/IMG_0042-1.webp"
        alt="Logo"
      />
      <h1>Assistentes Inteligentes</h1>
      <div className="price">R$ 130/mês</div>

      <CtaButton href="https://contratai.org/pagina-de-finalizacao-de-compra?add-to-cart=3670">Teste grátis por 2 dias</CtaButton>

      <ul>
        <li>Inteligência Artificial Generativa Avançada</li>
        <li>Múltiplos assistentes especializados</li>
        <li>Respostas imediatas</li>
        <li>Responde com robusto banco de dados</li>
        <li>Elaboração rápida de documentos</li>
      </ul>
    </AssistenteInteligenteBox>
  );
}

export default AssistenteInteligenteBoxComponent;
