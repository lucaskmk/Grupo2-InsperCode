import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (mode === "register" && password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      if (mode === "register") {
        // Chamada para o endpoint de registro
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setMessage(data.detail || "Erro ao registrar usuário.");
        } else {
          setMessage(data.message || "Usuário registrado com sucesso!");
        }
      } else {
        // Chamada para o endpoint de login (usando username para logar)
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
          setMessage(data.detail || "Erro ao fazer login.");
        } else {
          setMessage("Login efetuado com sucesso!");
          localStorage.setItem("accessToken", data.access_token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <h1>{mode === "login" ? "Login" : "Criar Conta"}</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {mode === "register" && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        {mode === "register" && (
          <div>
            <label>Nome de Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        {mode === "login" && (
          <div>
            <label>Nome de Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {mode === "register" && (
          <div>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{mode === "login" ? "Entrar" : "Registrar"}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="toggle-mode">
        {mode === "login" ? (
          <p>
            Não tem conta?{" "}
            <button onClick={() => { setMode("register"); setMessage(""); }}>
              Criar Conta
            </button>
          </p>
        ) : (
          <p>
            Já tem conta?{" "}
            <button onClick={() => { setMode("login"); setMessage(""); }}>
              Fazer Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
