from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import test_cases  # Importando o módulo de testes

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
    test_type: str  # Tipo de teste (exemplo: "soma_teste", "multiplicacao_teste", "verdadeiro_falso_teste")

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

        # Obtém a função de teste baseada no tipo enviado pelo usuário
        test_function = getattr(test_cases, request.test_type, None)
        if not test_function:
            return {"result": f"❌ Erro: Teste '{request.test_type}' não encontrado."}

        # Executa os testes com a função do usuário
        return test_function(local_scope["teste"])

    except Exception as e:
        return {
            "result": "❌ Erro ao executar código.",
            "erro": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
