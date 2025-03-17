import React, { useState, useEffect } from "react";
import "./Perfil.css";

function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Inicializa com a foto padrão
  const [selectedIcon, setSelectedIcon] = useState("/profile/user.webp");

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/api/profile/photo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ photo: icon }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao atualizar foto");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Foto atualizada:", data.photo);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetch("http://localhost:8000/api/profile", {
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Falha ao obter dados do perfil");
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Atualiza o selectedIcon se o usuário tiver uma foto definida
  useEffect(() => {
    if (user && user.photo) {
      setSelectedIcon(user.photo);
    }
  }, [user]);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  const { username, pontuacoes } = user;

  // Ícones disponíveis (localizados em public/profile/)
  const availableIcons = [
    "/profile/user1.png",
    "/profile/user2.png",
    "/profile/user3.png",
    "/profile/user4.png",
  ];

  return (
    <div className="page perfil-page">
      <h1>Perfil</h1>
      <div className="perfil-info">
        <h2>{username}</h2>
        <div className="perfil-foto-grande">
          <img src={selectedIcon} alt="Foto de Perfil" className="perfil-foto" />
        </div>
      </div>

      <div className="icones-disponiveis">
        <h3>Escolha seu ícone:</h3>
        <div className="icones-container">
          {availableIcons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Ícone ${index + 1}`}
              className={`icone-opcao ${selectedIcon === icon ? "selecionado" : ""}`}
              onClick={() => handleIconSelect(icon)}
            />
          ))}
        </div>
      </div>

      <div className="pontuacoes">
        <h3>Pontuação nas Aulas:</h3>
        <ul>
          <li>Aula 1: {pontuacoes.aula1}</li>
          <li>Aula 2: {pontuacoes.aula2}</li>
          <li>Aula 3: {pontuacoes.aula3}</li>
          <li>Aula 4: {pontuacoes.aula4}</li>
          <li>Aula 5: {pontuacoes.aula5}</li>
          <li>Aula 6: {pontuacoes.aula6}</li>
        </ul>
      </div>
    </div>
  );
}

export default Perfil;
