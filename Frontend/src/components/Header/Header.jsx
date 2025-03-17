import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../img/avatar.png";
import "./Header.css";

import logo from "/img/logo.jpg"; 
import Registro from "../Registro/Registro.jsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Busque os dados do perfil para atualizar a foto e demais informações
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetch("http://localhost:8000/api/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Falha ao obter dados do perfil");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);
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

  // Se o usuário não tiver foto, usa a foto padrão
  const userPhoto = userData && userData.photo ? userData.photo : "/profile/user.webp";

  return (
    <header className="header">
      <div className="home-container">
        {location.pathname !== "/" && (
          <button className="home-button" onClick={() => navigate("/")}>
            🏠 Voltar ao inicio
          </button>
        )}
      </div>

      <div className="menu-profile-container">
        <Registro />
        <div className="profile-icon" onClick={() => navigate("/perfil")}>
          <img src={userPhoto} alt="Foto do Usuário" className="user-photo" />
        </div>
        <div className="dropdown-wrapper" style={{ position: "relative" }}>
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
