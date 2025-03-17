import hashlib
import hmac
import datetime
import base64
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database import get_db
from models import User
from schemas import UserCreate, TokenResponse
from sqlalchemy import or_
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database import get_db
from models import User
from schemas import UserCreate, TokenResponse
from sqlalchemy import or_
import hashlib, hmac, datetime, base64, json

SECRET_KEY = "GAS"

router = APIRouter()  # Defina o router antes de usá-lo

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def encode_token(data: dict, expires_delta: datetime.timedelta):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire.timestamp()})
    
    header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()).decode().strip("=")
    payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().strip("=")
    signature = hmac.new(SECRET_KEY.encode(), f"{header}.{payload}".encode(), hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().strip("=")
    
    return f"{header}.{payload}.{signature_b64}"

def decode_token(token: str):
    try:
        header_b64, payload_b64, signature_b64 = token.split(".")
        
        expected_signature = hmac.new(SECRET_KEY.encode(), f"{header_b64}.{payload_b64}".encode(), hashlib.sha256).digest()
        expected_signature_b64 = base64.urlsafe_b64encode(expected_signature).decode().strip("=")
        
        if not hmac.compare_digest(expected_signature_b64, signature_b64):
            raise HTTPException(status_code=401, detail="Token inválido")
        
        payload = json.loads(base64.urlsafe_b64decode(payload_b64 + "==").decode())
        if datetime.datetime.utcnow().timestamp() > payload.get("exp", 0):
            raise HTTPException(status_code=401, detail="Token expirado")
        
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido")

# Função para gerar o hash da senha usando hashlib
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Função para verificar se a senha digitada corresponde ao hash salvo
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hmac.compare_digest(hash_password(plain_password), hashed_password)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        or_(User.username == user.username, User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Usuário ou email já existe")

    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, username=user.username, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Usuário registrado com sucesso"}

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")

    access_token = encode_token(data={"sub": user.username}, expires_delta=datetime.timedelta(hours=1))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    return {"message": f"Acesso autorizado para {payload['sub']}"}

@router.get("/profile")
def get_profile(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {
        "username": user.username,
        "photo": user.photo,  # Pode ser None se não definido
        "pontuacoes": {
            "aula1": user.aula1,
            "aula2": user.aula2,
            "aula3": user.aula3,
            "aula4": user.aula4,
            "aula5": user.aula5,
            "aula6": user.aula6,
        }
    }

@router.put("/profile/photo")
def update_profile_photo(data: dict, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Espera um JSON com {"photo": "caminho_da_nova_foto"}
    new_photo = data.get("photo")
    if not new_photo:
        raise HTTPException(status_code=400, detail="Nenhuma foto fornecida")

    payload = decode_token(token)
    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    user.photo = new_photo
    db.commit()
    db.refresh(user)
    return {"message": "Foto atualizada com sucesso", "photo": user.photo}

