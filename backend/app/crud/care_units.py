from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.care_units import Unidad
from app.schemas.care_units import UnidadCreate,UnidadUpdate ,UnidadResponse

def create_unidad(db: Session, payload: UnidadCreate):
    existe = db.query(Unidad).filter(
        Unidad.paciente_id == payload.paciente_id,
        Unidad.sesion == payload.sesion
    ).first()

    if existe:
        raise HTTPException(status_code=409, detail="El paciente ya tiene registrada esa sesión")

    item = Unidad(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def update_unidad(db: Session, unidad_id: int, payload: UnidadUpdate):
    unidad = db.query(Unidad).filter(Unidad.id == unidad_id).first()
    if not unidad:
        raise HTTPException(status_code=404, detail="Unidad no encontrada")

    for key, value in payload.model_dump().items():
        setattr(unidad, key, value)

    db.commit()
    db.refresh(unidad)
    return unidad

def delete_unidad(db: Session, Unidad_id: int):
    # 1️⃣ Buscar si existe el paciente
    unidad = db.query(Unidad).filter(Unidad.id == Unidad_id).first()

    # 2️⃣ Si no existe, devolver error 404
    if not unidad:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # 3️⃣ Eliminar el paciente de la base de datos
    db.delete(unidad)
    db.commit()

    # 4️⃣ Retornar mensaje o el objeto eliminado (según prefieras)
    return {"message": f"Paciente con ID {Unidad_id} eliminado correctamente"}
def get_all_unidades(db:Session, fisio_id:int):
    user = db.query(Unidad).filter(Unidad.paciente_id == fisio_id).all()
    # 2️⃣ Si no existe, lanzar error 404
    if not user:
        raise HTTPException(status_code=404, detail="user no encontrado")

    # 3️⃣ Si existe, devolver el objeto
    return user
   
def get_all_unidad(db: Session):
    unidad = db.query(Unidad).all()
    return unidad
def get_unidad_by_id(db: Session, unidad_id: int):
    # 1️⃣ Buscar el paciente por su ID
    unidad = db.query(Unidad).filter(Unidad.id == unidad_id).first()

    # 2️⃣ Si no existe, lanzar error 404
    if not unidad:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # 3️⃣ Si existe, devolver el objeto
    return unidad