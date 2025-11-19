from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.physiotherapists import User
from app.schemas.physiotherapists import UsersLogin, UsersResponse
from app.utils.auth import verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=UsersResponse)
def login(payload: UsersLogin, db: Session = Depends(get_db)):
    # 1️⃣ Buscar usuario por Gmail
    user = db.query(User).filter(User.gmail == payload.gmail).first()
    if not user:
        raise HTTPException(status_code=401, detail="Gmail o contraseña incorrectos")

    # 2️⃣ Verificar contraseña
    if not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Gmail o contraseña incorrectos")

    # 3️⃣ Devolver datos del usuario (sin password)
    return user
