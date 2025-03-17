import { useState } from "react";
import "./Aula.css";
import Traducao from "../../components/Traducao/Traducao";

function Aula1() {
  const perguntas = [
    { id: 1, texto: "O operador de soma em Python é '+'.", resposta: "V" },
    { id: 2, texto: "A divisão inteira é representada por '/'.", resposta: "F" },
    { id: 3, texto: "O operador '**' é usado para exponenciação.", resposta: "V" },
    { id: 4, texto: "Em Python, '//' representa a divisão comum.", resposta: "F" },
  ];

  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);

  const handleChange = (id, valor) => {
    setRespostas({ ...respostas, [id]: valor });
  };

  const verificarRespostas = () => {
    const erros = perguntas.filter(
      (pergunta) => respostas[pergunta.id] !== pergunta.resposta
    );

    if (erros.length === 0) {
      setResultado("✅ Todas as respostas estão corretas!");
    } else {
      setResultado(
        `❌ Algumas respostas estão erradas. Revise: ${erros
          .map((e) => e.texto)
          .join(", ")}`
      );
    }
  };

  return (
    <div className="page aula-page">
      <Traducao />
      <div className="content-container">
        <h1>Aula 1</h1>
        <h2>Operações</h2>
        <p>Como funcionam as operações no Python?</p>
        <p>
          Cada operação matemática na linguagem Python possui a sua maneira de ser
          escrita, podendo em alguns casos não serem representadas pelo seu símbolo
          "tradicional" da linguagem matemática. Na tabela abaixo se encontram as
          maneiras corretas de escrever as operações matemáticas básicas dentro do
          Python que vamos precisar ao longo do curso (ou que são mais utilizadas no
          nosso dia-a-dia).
        </p>
        <img src="img/aula1.png" alt="Aula 1" className="aula-image" />

        <h2>Verdadeiro ou Falso</h2>
        <p>Marque V para verdadeiro e F para falso:</p>

        {perguntas.map((pergunta) => (
          <div key={pergunta.id} className="question">
            <p>{pergunta.texto}</p>
            <label>
              <input
                type="radio"
                name={`resposta-${pergunta.id}`}
                value="V"
                onChange={() => handleChange(pergunta.id, "V")}
                checked={respostas[pergunta.id] === "V"}
              />
              V
            </label>
            <label>
              <input
                type="radio"
                name={`resposta-${pergunta.id}`}
                value="F"
                onChange={() => handleChange(pergunta.id, "F")}
                checked={respostas[pergunta.id] === "F"}
              />
              F
            </label>
          </div>
        ))}

        <button onClick={verificarRespostas}>Verificar Respostas</button>

        {resultado && <p className="resultado">{resultado}</p>}
      </div>
    </div>
  );
}

export default Aula1;
