from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.gait_evaluation import MarchaCreate, MarchaResponse
from app.crud.gait_evaluation import create_marcha, get_marcha

router = APIRouter(prefix="/marcha", tags=["estudio"])

@router.post("/", response_model=MarchaCreate)
def crear_marcha(payload: MarchaCreate, db: Session = Depends(get_db)):
    return create_marcha(db, payload)

@router.get("/{paciente_id}", response_model=list[MarchaResponse])
def obtener_estudio(paciente_id: int, db: Session = Depends(get_db)):
    return get_marcha(db, paciente_id)
