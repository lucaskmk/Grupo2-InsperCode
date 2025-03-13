from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuração de CORS para permitir chamadas do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, restrinja para domínios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

@app.post("/api/test-code")
def test_code(request: CodeRequest):
    try:
        # Dicionário local para execução segura
        local_scope = {}

        # Executa o código do usuário
        exec(request.code, {}, local_scope)

        # Verifica se a função 'teste' foi definida
        if "teste" not in local_scope:
            return {
                "result": "❌ Erro: A função 'teste' não foi encontrada.",
                "erros": []
            }

        # Lista de casos de teste (pares de números e resultado esperado)
        test_cases = [
            ((1, 2), 3),
            ((3, 5), 8),
            ((-1, 1), 0),
            ((10, 20), 30),
            ((0, 0), 0)
        ]

        erros = []

        for (a, b), esperado in test_cases:
            try:
                saida = local_scope["teste"](a, b)
                if saida != esperado:
                    erros.append({
                        "entrada": f"teste({a}, {b})",
                        "saida": saida,
                        "esperado": esperado
                    })
            except Exception as e:
                erros.append({
                    "entrada": f"teste({a}, {b})",
                    "saida": f"Erro: {str(e)}",
                    "esperado": esperado
                })

        if not erros:
            return {"result": "✅ Função correta!"}
        else:
            return {
                "result": f"❌ Função incorreta. \n -> teste({erros})"
            }

    except Exception as e:
        return {
            "result": "❌ Erro ao executar código.",
            "erro": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
