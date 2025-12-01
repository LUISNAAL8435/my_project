from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.scheduleAppointments import Agenda
from app.schemas.scheduleAppointments import AgendaCreate,AgendaResponse

def create_agenda(db:Session, payload:AgendaCreate):
    item = Agenda(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
def update_agenda(db:Session, id: int, payload:AgendaCreate):
    agenda = db.query(Agenda).filter(Agenda.id==id).first()
    if not agenda:
        raise HTTPException(status_code=404, detail="agenda no encontrado")
    for key, value in payload.model_dump().items():
        setattr(agenda, key, value)
    db.commit()
    db.refresh(agenda)
    return agenda

def delete_agenda(db: Session, id: int):
    # 1️⃣ Buscar si existe el paciente
    agenda = db.query(Agenda).filter(Agenda.id == id).first()

    # 2️⃣ Si no existe, devolver error 404
    if not agenda:
        raise HTTPException(status_code=404, detail="Agenda no encontrado")

    # 3️⃣ Eliminar el paciente de la base de datos
    db.delete(agenda)
    db.commit()

def get_agenda_by_id(db: Session, fisio_id: int):
    # 1️⃣ Buscar el paciente por su ID
    agenda = db.query(Agenda).filter(Agenda.fisio_id == fisio_id).all()
    # 3️⃣ Si existe, devolver el objeto
    return agenda