from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.antecedentes import AntecedentesCreate, AntecedentesResponse
from app.crud.antecedentes import create_antecedente, get_antecedentes_by_paciente

router = APIRouter(prefix="/antecedentes", tags=["Antecedentes"])

@router.post("/", response_model=AntecedentesResponse)
def crear_antecedente(payload: AntecedentesCreate, db: Session = Depends(get_db)):
    return create_antecedente(db, payload)

@router.get("/{paciente_id}", response_model=list[AntecedentesResponse])
def obtener_antecedentes(paciente_id: int, db: Session = Depends(get_db)):
    return get_antecedentes_by_paciente(db, paciente_id)
