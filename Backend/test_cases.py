# test_cases.py

def soma_teste(func):
    """Testes para a função 'teste' que soma dois números."""
    test_cases = [
        ((1, 2), 3),
        ((3, 5), 8),
        ((-1, 1), 0),
        ((10, 20), 30),
        ((0, 0), 0)
    ]
    
    return executar_testes(func, test_cases)

def multiplicacao_teste(func):
    """Testes para uma função 'teste' que multiplica dois números."""
    test_cases = [
        ((2, 3), 6),
        ((4, 5), 20),
        ((-1, 3), -3),
        ((0, 10), 0),
        ((7, 7), 49)
    ]
    
    return executar_testes(func, test_cases)

def verdadeiro_falso_teste(func):
    """Testes para uma questão de verdadeiro ou falso com 4 itens"""
    test_cases = [
        (("O céu é azul?", "V"), True),
        (("A água é seca?", "F"), True),
        (("2+2=5?", "F"), True),
        (("O fogo é frio?", "F"), True)
    ]
    
    return executar_testes(func, test_cases)

def executar_testes(func, test_cases):
    """Executa os testes e retorna os erros encontrados"""
    erros = []
    
    for entrada, esperado in test_cases:
        try:
            saida = func(*entrada) if isinstance(entrada, tuple) else func(entrada)
            if saida != esperado:
                erros.append({
                    "entrada": f"teste{entrada}",
                    "saida": saida,
                    "esperado": esperado
                })
        except Exception as e:
            erros.append({
                "entrada": f"teste{entrada}",
                "saida": f"Erro: {str(e)}",
                "esperado": esperado
            })
    
    if not erros:
        return {"result": "✅ Função correta!"}
    else:
        return {
            "result": f"❌ Função incorreta.",
            "erros": erros
        }
def exercicio1_teste(func):
    """
    Ex.1: Deve retornar exatamente:
    "Meu nome é Gabriela e tenho 21 anos."
    """
    erros = []
    saida_esperada = "Meu nome é Gabriela e tenho 21 anos."

    try:
        saida = func()
        if saida != saida_esperada:
            erros.append({
                "entrada": "Ex.1",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.1",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.1 correto!"}
    else:
        return {
            "result": "❌ Ex.1 incorreto.",
            "erros": erros
        }

def exercicio2_teste(func):
    """
    Ex.2: Deve retornar 4 linhas:
    Soma: 15
    Subtração: 5
    Multiplicação: 50
    Divisão: 2.0
    """
    erros = []
    saida_esperada = """Soma: 15
Subtração: 5
Multiplicação: 50
Divisão: 2.0""".strip()

    try:
        saida = func()
        if saida.strip() != saida_esperada:
            erros.append({
                "entrada": "Ex.2",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.2",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.2 correto!"}
    else:
        return {
            "result": "❌ Ex.2 incorreto.",
            "erros": erros
        }

def exercicio3_teste(func):
    """
    Ex.3: Retornar algo como:
    "<class 'int'> <class 'float'> <class 'str'> <class 'bool'>"
    """
    erros = []
    saida_esperada = "<class 'int'> <class 'float'> <class 'str'> <class 'bool'>"

    try:
        saida = func()
        if saida.strip() != saida_esperada:
            erros.append({
                "entrada": "Ex.3",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.3",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.3 correto!"}
    else:
        return {
            "result": "❌ Ex.3 incorreto.",
            "erros": erros
        }

def exercicio4_teste(func):
    """
    Ex.4: "A média é 8.23"
    (usando nota1=7.5, nota2=8.0, nota3=9.2)
    """
    erros = []
    saida_esperada = "A média é 8.23"

    try:
        saida = func()
        if saida.strip() != saida_esperada:
            erros.append({
                "entrada": "Ex.4",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.4",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.4 correto!"}
    else:
        return {
            "result": "❌ Ex.4 incorreto.",
            "erros": erros
        }

def exercicio5_teste(func):
    """
    Ex.5: "A temperatura em Fahrenheit é 77.00°F"
    (celsius=25 => Fahrenheit=77.00)
    """
    erros = []
    saida_esperada = "A temperatura em Fahrenheit é 77.00°F"

    try:
        saida = func()
        if saida.strip() != saida_esperada:
            erros.append({
                "entrada": "Ex.5",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.5",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.5 correto!"}
    else:
        return {
            "result": "❌ Ex.5 incorreto.",
            "erros": erros
        }

def exercicio6_teste(func):
    """
    Ex.6: "A área do círculo é 50.27"
    (raio=4 => area=3.14159*(16)=50.26544 => 50.27)
    """
    erros = []
    saida_esperada = "A área do círculo é 50.27"

    try:
        saida = func()
        if saida.strip() != saida_esperada:
            erros.append({
                "entrada": "Ex.6",
                "saida": saida,
                "esperado": saida_esperada
            })
    except Exception as e:
        erros.append({
            "entrada": "Ex.6",
            "saida": f"Erro: {str(e)}",
            "esperado": saida_esperada
        })

    if not erros:
        return {"result": "✅ Ex.6 correto!"}
    else:
        return {
            "result": "❌ Ex.6 incorreto.",
            "erros": erros
        }
