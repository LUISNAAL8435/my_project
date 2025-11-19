from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from typing import List
from app.models.care_units import Unidad
from app.schemas.care_units import UnidadCreate, UnidadResponse,UnidadUpdate
from app.crud.care_units import create_unidad,get_all_unidades, update_unidad, delete_unidad, get_unidad_by_id, get_all_unidad

router = APIRouter(prefix="/units", tags=["units"])
@router.post("/", response_model=UnidadCreate)
def crear_unidadd(payload: UnidadCreate, db: Session = Depends(get_db)):
    return create_unidad(db, payload)

@router.get("/list/{paciente_id}", response_model=list[UnidadResponse])
def listar_unidades(paciente_id,db: Session = Depends(get_db)):
    return get_all_unidades(db,paciente_id)

@router.get("/{paciente_id}", response_model=UnidadResponse)
def get_unidad_by_idd(paciente_id: int, db: Session = Depends(get_db)):
    return get_unidad_by_id(db, paciente_id)

@router.put("/{unidad_id}", response_model=UnidadResponse)
def update_unidadd(unidad_id: int, payload: UnidadUpdate, db: Session = Depends(get_db)):
    return update_unidad(db, unidad_id, payload)

@router.delete("/{paciente_id}")
def delete_unidadd(paciente_id: int, db: Session = Depends(get_db)):
    return delete_unidad(db, paciente_id)
