// DotsContainer.jsx
import React, { useEffect, useRef } from "react";

function DotsContainer() {
  const dotsContainerRef = useRef(null);

  useEffect(() => {
    const totalDots = 80;
    const colorSets = [
      {
        gradient: "radial-gradient(circle at center, #fff176, #ffeb3b)",
        glow: "0 0 10px #ffeb3b, 0 0 20px #ffeb3b"
      },
      {
        gradient: "radial-gradient(circle at center, #90caf9, #2196f3)",
        glow: "0 0 10px #2196f3, 0 0 20px #2196f3"
      },
      {
        gradient: "radial-gradient(circle at center, #a5d6a7, #4caf50)",
        glow: "0 0 10px #4caf50, 0 0 20px #4caf50"
      }
    ];

    function createDot() {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      // Escolhe set de cores aleatório
      const chosenSet = colorSets[Math.floor(Math.random() * colorSets.length)];
      dot.style.background = chosenSet.gradient;
      dot.style.boxShadow = chosenSet.glow;

      // Tamanho random
      const size = 3 + Math.random() * 5;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      // Posição inicial
      const containerW = dotsContainerRef.current?.offsetWidth || 800;
      const containerH = dotsContainerRef.current?.offsetHeight || 200;
      const x1 = Math.random() * (containerW - size);
      const y1 = Math.random() * (containerH - size);
      dot.style.left = `${x1}px`;
      dot.style.top = `${y1}px`;

      // Posição final
      const x2 = Math.random() * (containerW - size) - x1;
      const y2 = Math.random() * (containerH - size) - y1;
      dot.style.setProperty("--mx", `${x2}px`);
      dot.style.setProperty("--my", `${y2}px`);

      // Duração e delay
      const duration = 4 + Math.random() * 3;
      const delay = Math.random() * 3;
      dot.style.animation = `moveDot ${duration}s ${delay}s infinite ease-in-out alternate`;

      dotsContainerRef.current.appendChild(dot);
    }

    for (let i = 0; i < totalDots; i++) {
      createDot();
    }
  }, []);

  return (
    <div className="dots-container" ref={dotsContainerRef}></div>
  );
}

export default DotsContainer;
