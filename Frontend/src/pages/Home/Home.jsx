import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate(); // Hook do React Router para navegação

  return (
    <div className="home">
      <h1>Página Inicial</h1>
      <button onClick={() => navigate("/ex")}>Ir para Teste de Função</button>
    </div>
  );
}

export default Home;
