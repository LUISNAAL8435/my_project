from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.evaluacion_dolor import Evaluacio
from app.schemas.evaluacion_dolor import EvalacionCreate

def create_evaluacion(db: Session, payload: EvalacionCreate):
    # Convertir los objetos Pydantic a diccionarios
    datos_dict = payload.datos  

    # Crear SIEMPRE un nuevo registro
    item = Evaluacio(
        paciente_id=payload.paciente_id,
        titulo=payload.titulo,
        datos=datos_dict
    )

    db.add(item)
    db.commit()
    db.refresh(item)
    return item

#Traer los que coicidan co el id:paciente
def get_evaluacion(db:Session, paciente_id:int):
    return db.query(Evaluacio).filter(Evaluacio.paciente_id==paciente_id).all()
#Traer uno en especifico con el id de la tabla
def get_evaluacion_id(db:Session, id:int):
    return db.query(Evaluacio).filter(Evaluacio.id==id).first()

def delete_evaluacion(db:Session, id:int):
    evaluacion = db.query(Evaluacio).filter(Evaluacio.id == id).first()
    if not evaluacion:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    db.delete(evaluacion)
    db.commit()
