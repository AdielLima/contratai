// Slideshow.jsx
import React, { useEffect, useRef, useState } from "react";

function Slideshow() {
  const slidesData = [
    {
      src: "https://contratai.org/wp-content/uploads/2024/12/Design-sem-nome-1.webp",
      alt: "Slide 1"
    },
    {
      src: "https://contratai.org/wp-content/uploads/2024/12/Captura-de-Tela-2024-12-18-as-18.26.27.webp",
      alt: "Slide 2"
    }
  ];

  const slideIntervalRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState("");

  function nextSlide() {
    setCurrentSlide(prev => (prev + 1) % slidesData.length);
  }

  function startSlideshow() {
    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 2500);
  }

  function stopSlideshow() {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }

  useEffect(() => {
    // Inicia autoplay
    startSlideshow();
    return () => {
      // Cleanup
      stopSlideshow();
    };
    // eslint-disable-next-line
  }, []);

  function handleImageClick(src) {
    stopSlideshow();
    setModalImg(src);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setModalImg("");
    startSlideshow();
  }

  return (
    <>
      <div className="slideshow-container">
        {slidesData.map((slide, idx) => (
          <div
            key={idx}
            className={`slide ${currentSlide === idx ? "active" : ""}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              onClick={() => handleImageClick(slide.src)}
            />
          </div>
        ))}
      </div>
      <div className="arrow-next" onClick={nextSlide}>
        <svg
          className="arrow-icon"
          viewBox="0 0 50 50"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2196f3">
                <animate
                  attributeName="stop-color"
                  values="#2196f3; #ffeb3b; #4caf50; #2196f3"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#ffeb3b">
                <animate
                  attributeName="stop-color"
                  values="#ffeb3b; #4caf50; #2196f3; #ffeb3b"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="
              M15,15 L25,25 L15,35
              M25,15 L35,25 L25,35
            "
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {modalVisible && (
        <div
          className="modal-lightbox"
          style={{ display: "block" }}
          onClick={(e) => {
            if (e.target.className === "modal-lightbox") {
              closeModal();
            }
          }}
        >
          <span className="close-modal" onClick={closeModal}>
            &times;
          </span>
          <img className="modal-content" src={modalImg} alt="Zoom" />
        </div>
      )}
    </>
  );
}

export default Slideshow;
