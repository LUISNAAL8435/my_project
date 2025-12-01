from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.estudio import EstudiorCreate, EstudioResponse
from app.crud.estudio import create_estudio, get_estudio_by_paciente

router = APIRouter(prefix="/estudio", tags=["estudio"])

@router.post("/", response_model=EstudiorCreate)
def crear_antecedente(payload: EstudiorCreate, db: Session = Depends(get_db)):
    return create_estudio(db, payload)

@router.get("/{paciente_id}", response_model=list[EstudioResponse])
def obtener_estudio(paciente_id: int, db: Session = Depends(get_db)):
    return get_estudio_by_paciente(db, paciente_id)
