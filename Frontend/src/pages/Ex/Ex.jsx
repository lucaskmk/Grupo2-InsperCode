import { useState } from "react";
import "./Ex.css";

function Ex() {
  const [code, setCode] = useState(""); // Estado para armazenar o código do usuário
  const [result, setResult] = useState(null);

  const handleTestCode = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Erro ao testar código:", error); // Exibe o erro no console
      setResult("Erro ao testar a função.");
    }
    
  };

  return (
    <div className="ex-container">
      <h1>Teste sua Função</h1>
      <p>Escreva uma função chamada <code>teste</code> que receba dois números e retorne a soma deles.</p>
      
      <textarea 
        className="code-input"
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        placeholder="def teste(a, b):\n    return a + b"
      />
      
      <button onClick={handleTestCode}>Testar Função</button>
      
      {result !== null && <p className="result">{result}</p>}
    </div>
  );
}

export default Ex;
