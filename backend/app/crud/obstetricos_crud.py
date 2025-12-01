from sqlalchemy.orm import Session
from app.models.obstetricos import Obstetricos
from app.schemas.Obstetric_Gynecological_Tests import Obstetricos as ObstetricosSchema

def create_obstetricos(db: Session, data: ObstetricosSchema):

    existente = db.query(Obstetricos).filter(
        Obstetricos.paciente_id == data.paciente_id
    ).first()

    if existente:
        existente.paciente_id=data.paciente_id
        existente.vida_sexual=data.vida_sexual
        existente.metodo_proteccion=data.metodo_proteccion
        existente.enfermedades_transmision_sexual=data.enfermedades_transmision_sexual.model_dump()
        existente.actualmente_embarazada=data.actualmente_embarazada.model_dump()
        existente.parto_natural=data.parto_natural.model_dump()
        existente.parto_cesaria=data.parto_cesaria.model_dump()
        existente.complicacion_en_parto=data.complicacion_en_parto.model_dump()
        existente.lactancia=data.lactancia.model_dump()
        existente.aborto=data.aborto.model_dump()

        db.commit()
        db.refresh(existente)
        return existente 
     
    nuevo = Obstetricos(
        paciente_id=data.paciente_id,
        vida_sexual=data.vida_sexual,
        metodo_proteccion=data.metodo_proteccion,
        enfermedades_transmision_sexual=data.enfermedades_transmision_sexual.model_dump(),
        actualmente_embarazada=data.actualmente_embarazada.model_dump(),
        parto_natural=data.parto_natural.model_dump(),
        parto_cesaria=data.parto_cesaria.model_dump(),
        complicacion_en_parto=data.complicacion_en_parto.model_dump(),
        lactancia=data.lactancia.model_dump(),
        aborto=data.aborto.model_dump()
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def get_obstetricos(db: Session, paciente_id: int):
    return db.query(Obstetricos).filter(Obstetricos.paciente_id == paciente_id).first()
