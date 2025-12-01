from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.evaluacion_dolor import EvalacionCreate, EvaluacionResponse
from app.crud.evaluacion_dolor import create_evaluacion,get_evaluacion, get_evaluacion_id, delete_evaluacion

router = APIRouter(prefix="/evaluation", tags=["evaluation"])

@router.post("/", response_model=EvaluacionResponse)
def crear_antecedente(payload: EvalacionCreate, db: Session = Depends(get_db)):
    return create_evaluacion(db, payload)
#id paciente
@router.get("/id_paciente/{paciente_id}",response_model=List[EvaluacionResponse])
def obtener_evaluation(paciente_id:int, db:Session=Depends(get_db)):
    return get_evaluacion(db, paciente_id)
#id tabla
@router.get("/id/{id}",response_model=EvaluacionResponse)
def obtener_evaluation_id(id:int, db:Session=Depends(get_db)):
    return get_evaluacion_id(db, id)

@router.delete("/{id}")
def delete_evaluation(id: int, db: Session = Depends(get_db)):
    return delete_evaluacion(db, id)
