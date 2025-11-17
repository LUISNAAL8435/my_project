from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.Patient import Paciente
from app.schemas.Patient import PacientCreate,PacientResponse

def create_paciente(db:Session, payload:PacientCreate):
    existe = db.query(Paciente).filter_by(folio=payload.folio).first()
    if existe:
        raise HTTPException(status_code=409, detail="El paciente ya existe con ese folio")

    item = Paciente(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_paciente(db: Session, paciente_id: int, payload: PacientCreate):
    paciente = db.query(Paciente).filter(Paciente.id == paciente_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    for key, value in payload.model_dump().items():
        setattr(paciente, key, value)

    db.commit()
    db.refresh(paciente)
    return paciente

def delete_paciente(db: Session, paciente_id: int):
    # 1️⃣ Buscar si existe el paciente
    paciente = db.query(Paciente).filter(Paciente.id == paciente_id).first()

    # 2️⃣ Si no existe, devolver error 404
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # 3️⃣ Eliminar el paciente de la base de datos
    db.delete(paciente)
    db.commit()

    # 4️⃣ Retornar mensaje o el objeto eliminado (según prefieras)
    return {"message": f"Paciente con ID {paciente_id} eliminado correctamente"}
def get_all_pacientes(db: Session):
    pacientes = db.query(Paciente).all()
    return pacientes
def get_paciente_by_id(db: Session, paciente_id: int):
    # 1️⃣ Buscar el paciente por su ID
    paciente = db.query(Paciente).filter(Paciente.id == paciente_id).first()

    # 2️⃣ Si no existe, lanzar error 404
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # 3️⃣ Si existe, devolver el objeto
    return paciente