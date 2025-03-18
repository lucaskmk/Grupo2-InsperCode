import React, { useState } from "react";
import "./Gallery.css";

function Gallery() {
  const images = [
    "/img/galeria1.jpg",
    "/img/galeria2.jpg",
    "/img/galeria3.jpg",
    "/img/galeria4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="gallery-container">
      <button className="arrow left" onClick={goToPrevious}>
        ←
      </button>
      <img
        src={images[currentIndex]}
        alt={`Galeria ${currentIndex + 1}`}
        className="gallery-image"
      />
      <button className="arrow right" onClick={goToNext}>
        →
      </button>
    </div>
  );
}

export default Gallery;
