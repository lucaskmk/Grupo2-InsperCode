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
