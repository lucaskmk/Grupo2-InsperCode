import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "./logo.jpg"; 

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
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
      {/* Logo clicável no lado esquerdo */}
      <div className="home-container">
        <img 
          src={logo}
          alt="Logo"
          className="header-logo"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Menu Aulas + Perfil na direita */}
      <div className="menu-profile-container">
        <div className="profile-icon" onClick={() => navigate("/perfil")}>
          👤
        </div>
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
