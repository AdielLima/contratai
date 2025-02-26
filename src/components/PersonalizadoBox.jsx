// PersonalizadoBox.jsx
import React from "react";
import { PersonalizadoBox } from "../styles";

function PersonalizadoBoxComponent() {
  return (
    <PersonalizadoBox>
      <img
        src="https://contratai.org/wp-content/uploads/2024/12/IMG_0042-1.webp"
        alt="Logo"
      />

      <h1>Personalizado para usuário</h1>
      <p>
        Assistente personalizado, que se ajusta aos modelos e arquivos 
        fornecidos pelo usuário, garantindo que o assistente 
        atenda exatamente às suas demandas.
      </p>

      <a
        className="btn"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        Entre em contato
      </a>
    </PersonalizadoBox>
  );
}

export default PersonalizadoBoxComponent;
