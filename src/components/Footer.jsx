// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "1rem 0" }}>
      <div style={{ marginBottom: "1rem" }}>
        <a href="https://contratai.org/termos-de-uso" style={{ margin: "0 1rem" }}>
          Termos de Uso
        </a>
        <a href="https://contratai.org/politica-de-privacidade" style={{ margin: "0 1rem" }}>
          Política de Privacidade
        </a>
        <span style={{ margin: "0 1rem" }}>Fale Conosco</span>
      </div>
      <p>
        CNPJ: 56.284.645/0001-58
        <br />
        Av. Pres. Kennedy, N° 6786 — Socopo, Teresina – PI, 64058-300
      </p>
    </footer>
  );
}

export default Footer;
