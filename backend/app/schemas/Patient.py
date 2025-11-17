from pydantic import BaseModel
from typing import Dict,Optional
from datetime import date 

class PacientCreate(BaseModel):
    folio:str
    fecha_valoracion:date
    fecha_alta:date
    nombre:str
    apellidos:str
    sexo:str
    telefono:str
    diagnostic_medic:str
    motivo_consulta:str

class PacientResponse(BaseModel):
    id: int
    folio: str
    fecha_valoracion: date
    fecha_alta: date
    nombre: str
    apellidos: str
    sexo: str
    telefono: str
    diagnostic_medic: str
    motivo_consulta: str

    class Config:
        from_attributes=True
