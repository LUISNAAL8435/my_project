from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from typing import List
from app.models.Patient import Paciente
from app.schemas.Patient import PacientCreate,PacientResponse
from app.crud.Patient import create_paciente, update_paciente, delete_paciente, get_paciente_by_id,get_all_pacientes

router = APIRouter(prefix="/patients", tags=["patients"])
@router.post("/", response_model=PacientCreate)
def crear_antecedente(payload: PacientCreate, db: Session = Depends(get_db)):
    return create_paciente(db, payload)

@router.get("/", response_model=List[PacientResponse])
def listar_pacientes(db: Session = Depends(get_db)):
    return get_all_pacientes(db)

@router.get("/{paciente_id}", response_model=PacientResponse)
def get_paciente_by_idd(paciente_id: int, db: Session = Depends(get_db)):
    return get_paciente_by_id(db, paciente_id)

@router.put("/{paciente_id}", response_model=PacientResponse)
def update_pacientee(paciente_id: int, payload: PacientCreate, db: Session = Depends(get_db)):
    return update_paciente(db, paciente_id, payload)

@router.delete("/{paciente_id}")
def delete_pacientee(paciente_id: int, db: Session = Depends(get_db)):
    return delete_paciente(db, paciente_id)
