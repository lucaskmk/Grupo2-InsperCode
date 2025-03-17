import "./Home.css";
import logo from "/img/logo.jpg"; 
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Para construir algo incrível, o primeiro passo é ter coragem de começar !</h1>
      <p>Bem-vindo ao site!</p>

      <div className="home-container-buttons">
  
        <div className="auth-buttons">
          <button className="btn-login" onClick={() => navigate("/Login")}>Entrar</button>
          <button className="btn-register" onClick={() => navigate("/Login")}>Registrar</button>
        </div>
      </div>


      {/* Player do YouTube */}
      <div className="youtube-player">
        <h2>Assista ao vídeo para entender mais da plataforma :)</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7S-sje9ptfM" // Coloque o link do vídeo do YouTube aqui
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>


    </div>
    
  );
}

export default Home;
