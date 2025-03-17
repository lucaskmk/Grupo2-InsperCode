import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../../img/avatar.png";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current !== event.target
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Home isolado na esquerda */}
      <div className="home-container">
        {location.pathname !== "/" && (
          <button className="home-button" onClick={() => navigate("/")}>
            🏠 Voltar ao inicio
          </button>
        )}
      </div>

      <div className="profile-icon"  onClick={() => navigate("/perfil") }>
            <img src={avatar} alt="Avatar" className="avatar" />
          </div>

      {/* Menu Aulas + Perfil na direita */}
      <div className="menu-profile-container">
        <div style={{ position: "relative" }}>

          <button
            ref={buttonRef}
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰ Aulas
          </button>

          {menuOpen && (
            <div className="dropdown-menu" ref={menuRef}>
              <p onClick={() => navigate("/aula1")}>📖 Aula 1</p>
              <p onClick={() => navigate("/aula2")}>📖 Aula 2</p>
              <p onClick={() => navigate("/aula3")}>📖 Aula 3</p>
              <p onClick={() => navigate("/aula4")}>📖 Aula 4</p>
              <p onClick={() => navigate("/aula5")}>📖 Aula 5</p>
              <p onClick={() => navigate("/aula6")}>📖 Aula 6</p>
            </div>
          )}
          
        </div>

        
      </div>
    </header>
  );
}

export default Header;
