import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Perfil from "./pages/Perfil/Perfil";
import Aula1 from "./pages/Aulas/Aula1";
import Aula2 from "./pages/Aulas/Aula2";
import Aula3 from "./pages/Aulas/Aula3";
import Aula4 from "./pages/Aulas/Aula4";
import Aula5 from "./pages/Aulas/Aula5";
import Aula6 from "./pages/Aulas/Aula6";
import Login from "./pages/Login/Login";  // Importa a página de login

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  {/* Rota para login */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/aula1" element={<Aula1 />} />
        <Route path="/aula2" element={<Aula2 />} />
        <Route path="/aula3" element={<Aula3 />} />
        <Route path="/aula4" element={<Aula4 />} />
        <Route path="/aula5" element={<Aula5 />} />
        <Route path="/aula6" element={<Aula6 />} />
      </Routes>
    </Router>
  );
}

export default App;
