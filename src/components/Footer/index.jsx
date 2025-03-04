// Footer.jsx
import React from "react";
import "./styles.css"; 

function Footer() {
  return (
    <footer className="footer has-background-white has-text-black">
      <div className="content has-text-centered">

        <div className="buttons is-centered">
          <a className="button is-white" href="#">Termos de Uso</a>
          <a className="button is-white">Política de Privacidade</a>
          <a className="button is-white">Fale Conosco</a>
        </div>

        <p className="is-size-7">
          CNPJ: 56.284.645/0001-58 <br />
          Av. Pres. Kennedy, N° 6786 — Socopo, Teresina – PI, 64058-300
        </p>
      </div>
    </footer>

  );
}

export default Footer;
