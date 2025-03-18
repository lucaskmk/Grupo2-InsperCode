import { useState } from "react";
import "./Aula.css";
import Traducao from "../../components/Traducao/Traducao";

function Aula1() {
  // ------------------ MULTIPLA ESCOLHA ------------------
  const questoesMC = [
    {
      id: 1,
      pergunta: "O que é uma variável em Python?",
      opcoes: [
        "Um espaço de memória que armazena dados", // CORRETA (índice 0)
        "Um comando que exibe mensagens",
        "Um tipo de dado específico",
        "Nenhuma das anteriores",
      ],
      respostaCerta: 0,
    },
    {
      id: 2,
      pergunta: "Qual função usamos para exibir mensagens na tela?",
      opcoes: ["print()", "show()", "display()", "echo()"], // CORRETA: 0
      respostaCerta: 0,
    },
    {
      id: 3,
      pergunta: "Qual dos seguintes é um tipo de dado numérico?",
      opcoes: ["int", "string", "boolean", "lista"], // CORRETA: 0
      respostaCerta: 0,
    },
    {
      id: 4,
      pergunta: "Qual operador é usado para multiplicação em Python?",
      opcoes: ["*", "x", "multiplica()", "/"], // CORRETA: 0
      respostaCerta: 0,
    },
    {
      id: 5,
      pergunta: "Como definimos uma string em Python?",
      opcoes: [
        "Entre aspas simples ou duplas", // CORRETA: 0
        "Entre colchetes []",
        "Entre chaves {}",
        "Sem aspas",
      ],
      respostaCerta: 0,
    },
  ];
  const [respostasMC, setRespostasMC] = useState({});
  const [resultadoMC, setResultadoMC] = useState(null);

  const handleChangeMC = (id, idx) => {
    setRespostasMC({ ...respostasMC, [id]: idx });
  };

  const verificarRespostasMC = () => {
    const erros = questoesMC.filter((q) => respostasMC[q.id] !== q.respostaCerta);
    if (erros.length === 0) {
      setResultadoMC("✅ Todas (Múltipla Escolha) estão corretas!");
    } else {
      setResultadoMC(
        "❌ Erros nas questões: " + erros.map((e) => e.id).join(", ")
      );
    }
  };

  // ------------------ VERDADEIRO / FALSO ------------------
  const perguntasVF = [
    { id: 1, texto: "O operador de soma em Python é '+'.", resposta: "V" },
    { id: 2, texto: "A divisão inteira é representada por '/'.", resposta: "F" },
    { id: 3, texto: "O operador '**' é usado para exponenciação.", resposta: "V" },
    { id: 4, texto: "Em Python, '//' representa a divisão comum.", resposta: "F" },
  ];
  const [respostasVF, setRespostasVF] = useState({});
  const [resultadoVF, setResultadoVF] = useState(null);

  const handleChangeVF = (id, valor) => {
    setRespostasVF({ ...respostasVF, [id]: valor });
  };

  const verificarRespostasVF = () => {
    const erros = perguntasVF.filter(
      (p) => respostasVF[p.id] !== p.resposta
    );
    if (erros.length === 0) {
      setResultadoVF("✅ Todas (V/F) estão corretas!");
    } else {
      setResultadoVF(
        `❌ Erros em: ${erros.map((e) => e.texto).join("; ")}`
      );
    }
  };

  // ------------------ TESTE DE FUNÇÃO (EXERCÍCIOS PRÁTICOS) ------------------
  const [code, setCode] = useState("");
  const [exercicioSelect, setExercicioSelect] = useState("exercicio1_teste");
  const [resultadoEx, setResultadoEx] = useState(null);

  const handleTestEx = async () => {
    setResultadoEx("Testando...");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, test_type: exercicioSelect }),
      });
      const data = await res.json();
      setResultadoEx(data.result || JSON.stringify(data));
    } catch (error) {
      setResultadoEx("Erro ao testar código: " + error.message);
    }
  };

  return (
    <div className="page aula-page">
      <Traducao />
      <div className="content-container">
        <h1>Aula 1: Operações e Variáveis</h1>
        <p>
          Nesta aula, você aprenderá sobre operações básicas e variáveis em Python.
        </p>

        {/* ------------------ Múltipla Escolha ------------------ */}
        <h2>Exercícios de Múltipla Escolha</h2>
        {questoesMC.map((q) => (
          <div key={q.id} style={{ marginBottom: "1rem", textAlign: "left" }}>
            <strong>{q.id}. {q.pergunta}</strong>
            {q.opcoes.map((op, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`mc-${q.id}`}
                  value={idx}
                  checked={respostasMC[q.id] === idx}
                  onChange={() => handleChangeMC(q.id, idx)}
                />
                {op}
              </label>
            ))}
          </div>
        ))}
        <button onClick={verificarRespostasMC}>Verificar Múltipla Escolha</button>
        {resultadoMC && <p>{resultadoMC}</p>}

        {/* ------------------ V/F ------------------ */}
        <h2>Exercícios de Verdadeiro ou Falso</h2>
        {perguntasVF.map((p) => (
          <div key={p.id} className="question" style={{ textAlign: "left" }}>
            <p>{p.texto}</p>
            <label>
              <input
                type="radio"
                name={`vf-${p.id}`}
                value="V"
                onChange={() => handleChangeVF(p.id, "V")}
                checked={respostasVF[p.id] === "V"}
              />
              V
            </label>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                name={`vf-${p.id}`}
                value="F"
                onChange={() => handleChangeVF(p.id, "F")}
                checked={respostasVF[p.id] === "F"}
              />
              F
            </label>
          </div>
        ))}
        <button onClick={verificarRespostasVF}>Verificar V/F</button>
        {resultadoVF && <p>{resultadoVF}</p>}

        {/* ------------------ Exercícios Práticos ------------------ */}
        <h2>Exercícios Práticos</h2>

        <p>
          Selecione abaixo qual exercício quer testar. Escreva sua função{" "}
          <code>teste()</code> de acordo com o enunciado e clique em <em>Testar Função</em>.
        </p>

        <label>
          Escolher Exercício:{" "}
          <select
            value={exercicioSelect}
            onChange={(e) => setExercicioSelect(e.target.value)}
          >
            <option value="exercicio1_teste">Exercício 1</option>
            <option value="exercicio2_teste">Exercício 2</option>
            <option value="exercicio3_teste">Exercício 3</option>
            <option value="exercicio4_teste">Exercício 4</option>
            <option value="exercicio5_teste">Exercício 5</option>
            <option value="exercicio6_teste">Exercício 6</option>
          </select>
        </label>

        <textarea
          style={{ width: "100%", height: "200px", marginTop: "1rem" }}
          placeholder={`def teste():\n    # escreva seu código aqui`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={handleTestEx}>Testar Função</button>
        {resultadoEx && <p style={{ whiteSpace: "pre-wrap" }}>{resultadoEx}</p>}

        <h3>Nível Fácil</h3>
        <ol style={{ textAlign: "left" }}>
          <li>
            <strong>Exercício 1 - Criando Variáveis</strong>
            <p>
              Defina <code>nome = "Gabriela"</code> e <code>idade = 21</code>.  
              Retorne: <em>Meu nome é Gabriela e tenho 21 anos.</em>
            </p>
          </li>
          <li>
            <strong>Exercício 2 - Operações Matemáticas Fixas</strong>
            <p>
              Defina <code>a=10</code> e <code>b=5</code>. Retorne 4 linhas:
              <br/>
              Soma: 15<br/>
              Subtração: 5<br/>
              Multiplicação: 50<br/>
              Divisão: 2.0
            </p>
          </li>
        </ol>

        <h3>Nível Médio</h3>
        <ol style={{ textAlign: "left" }}>
          <li>
            <strong>Exercício 3 - Tipos de Dados Fixos</strong>
            <p>
              Defina <code>a=100</code>, <code>b=3.14</code>, <code>c="Python"</code>, <code>d=True</code>.
              Retorne: <br/>
              <code>{"<class 'int'> <class 'float'> <class 'str'> <class 'bool'>"}</code>
            </p>
          </li>
        </ol>

        <h3>Nível Difícil</h3>
        <ol style={{ textAlign: "left" }}>
          <li>
            <strong>Exercício 4 - Cálculo de Média Fixada</strong>
            <p>
              Use <code>nota1=7.5</code>, <code>nota2=8.0</code>, <code>nota3=9.2</code>.  
              Retorne: <em>A média é 8.23</em>
            </p>
          </li>
          <li>
            <strong>Exercício 5 - Conversão de Temperatura Fixada</strong>
            <p>
              Use <code>celsius=25</code>. Retorne: <br/>
              <em>A temperatura em Fahrenheit é 77.00°F</em>
            </p>
          </li>
          <li>
            <strong>Exercício 6 - Cálculo de Área de um Círculo</strong>
            <p>
              Use <code>raio=4</code>, <code>π=3.14159</code>. Retorne:  
              <em>A área do círculo é 50.27</em>
            </p>
          </li>
        </ol>

      </div>
    </div>
  );
}

export default Aula1;
