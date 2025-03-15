import { useState } from "react";
import "./Traducao.css";
import codesig from "./codesig.jpg"; 
import simbsig from "./simbsig.jpg"; 

function Traducao() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="traducao-container">
      {/* Botão semicircular na esquerda com seta dinâmica */}
      <div className="traducao-botao" onClick={() => setAberto(!aberto)}>
        {aberto ? "⇦" : "⇨"}
      </div>

      {/* Menu lateral com imagens (abre com animação) */}
      <div className={`traducao-menu ${aberto ? "aberto" : ""}`}>
        <img src={codesig} alt="Code Signature" className="traducao-img" />
        <img src={simbsig} alt="Symbol Signature" className="traducao-img" />
      </div>
    </div>
  );
}

export default Traducao;
