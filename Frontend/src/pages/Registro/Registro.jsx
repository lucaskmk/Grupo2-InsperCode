import React from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

function Registro() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login?register=true");
  };

  return (
    <div className="registro-container">
      <button className="registro-button" onClick={handleClick}>
        registrar
      </button>
    </div>
  );
}

export default Registro;
