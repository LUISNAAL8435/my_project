from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.gait_evaluation import Marcha
from app.schemas.gait_evaluation import MarchaCreate, MarchaResponse

def create_marcha(db: Session, payload: MarchaCreate):

    existe = db.query(Marcha).filter_by(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
    ).first()

    datos_dict = payload.datos  # 👈 AQUÍ EL FIX

    if existe:
        existe.datos = datos_dict
        db.commit()
        db.refresh(existe)
        return existe

    item = Marcha(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

#Traer los que coicidan co el id:paciente
def get_marcha(db:Session, paciente_id:int):
    return db.query(Marcha).filter(Marcha.paciente_id==paciente_id).all()
#Traer uno en especifico con el id de la tabla
def get_marcha_id(db:Session, id:int):
    return db.query(Marcha).filter(Marcha.id==id).first()

def delete_marcha(db:Session, id:int):
    evaluacion = db.query(Marcha).filter(Marcha.id == id).first()
    if not evaluacion:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    db.delete(evaluacion)
    db.commit()
