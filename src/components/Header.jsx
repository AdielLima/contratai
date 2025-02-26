// Header.jsx
import React from "react";

function Header() {
  return (
    <header style={{ textAlign: "center", padding: "1rem" }}>
      <img
        src="https://contratai.org/wp-content/uploads/2024/06/cropped-IMG_0042.png"
        alt="Logo ContratAI"
        style={{
          width: "100px",
          height: "100px",
          animation: "spin 6s linear infinite"
        }}
      />
      <div>
        <a href="/" style={{ marginRight: "1rem" }}>Início</a>
        <a href="https://contratai.org/sair/" style={{ marginRight: "1rem" }}>
          Sair
        </a>
      </div>
    </header>
  );
}

export default Header;
