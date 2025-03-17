import { useState } from "react";
import "./Aula.css";
import Traducao from "../../components/Traducao/Traducao";

function Aula2() {
  return  (
    <div className="page aula-page">
      <Traducao></Traducao>
      <h1>Condicionais</h1>
      <h2>O que são condicionais em Python?</h2>
      <p>
        Na aula de hoje veremos como desenvolver programas que, dada uma condição, executam, ou
        não, um determinado bloco de código. Suponha que queremos desenvolver uma função que
        recebe dois números, x e y como argumento e devolve 1 se x for maior do que y e 0, caso
        contrário.
      </p>
      <p>
        A não ser que exista uma fórmula fechada (existe, para alguns casos), precisamos de
        alguma forma de executar um trecho de código somente se x for maior que y e outro trecho de
        código somente se essa condição não for verdadeira.
      </p>
      <p>
        Para isso vamos precisar do operador if. Vamos começar com um exemplo curto para entender
        como ele funciona.
      </p>
      <pre>
      <code>
      {`
      lampada_acesa = True
      if lampada_acesa:
        print("Está muito claro aqui!")
      lampada_acesa = False
      if lampada_acesa:
        print("Continua muito claro aqui!")


      #Será impresso:
      #Está muito claro aqui!
        `}
      </code>
      </pre>
      <p>
      O operador if funciona da seguinte maneira:</p>
      <p>No caso de if True: o bloco do if é executado;</p>
      <p>No caso de if False: o bloco do if não é executado.</p>
      <p>No caso acima, o primeiro bloco do if é executado, já que o valor de lampada_acesa é True. 
      Entretanto, no fim desse bloco, seu valor muda para false, e por isso o segundo bloco não é 
      executado
      O operador else é complementar ao if, representando o caso contrário ao mesmo. Ele captura 
      todos os casos para os quais a condição do if é falsa. Um exemplo de seu uso está abaixo:
      </p>
    </div>
  );
}

export default Aula2;