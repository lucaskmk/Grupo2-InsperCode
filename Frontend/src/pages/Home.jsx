import { useEffect, useState } from "react";
import Error from "./Error"; // Importa a tela de erro

function Home() {
  const [message, setMessage] = useState("Carregando...");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Erro ao buscar status:", err);
        setError(true);
      });
  }, []);

  if (error) {
    return <Error />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Página Inicial</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
