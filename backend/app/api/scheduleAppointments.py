from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from typing import List
from app.models.scheduleAppointments import Agenda
from app.schemas.scheduleAppointments import AgendaCreate,AgendaResponse
from app.crud.scheduleAppointments import create_agenda, update_agenda, delete_agenda, get_agenda_by_id

router = APIRouter(prefix="/ScheduleAppointments", tags=["patients"])
@router.post("/", response_model=AgendaResponse)
def crear_agenda(payload: AgendaCreate, db: Session = Depends(get_db)):
    return create_agenda(db, payload)

@router.get("/{fisio_id}", response_model=List[AgendaResponse])
def get_agenda_by_idd(fisio_id: int, db: Session = Depends(get_db)):
    return get_agenda_by_id(db, fisio_id)

@router.put("/{id}", response_model=AgendaResponse)
def update_agendaa(id: int, payload: AgendaCreate, db: Session = Depends(get_db)):
    return update_agenda(db, id, payload)

@router.delete("/{id}")
def delete_agendaa(id: int, db: Session = Depends(get_db)):
    return delete_agenda(db, id)
