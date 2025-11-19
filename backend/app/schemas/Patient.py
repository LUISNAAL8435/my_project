from pydantic import BaseModel
from typing import Dict,Optional
from datetime import date 

class PacientCreate(BaseModel):
    admin_id: Optional[int] = None
    folio:str
    fecha_valoracion:date
    fecha_alta:Optional[date]=None
    nombre:str
    apellidos:str
    sexo:str
    telefono:str
    diagnostic_medic:str
    motivo_consulta:str

class PacientResponse(BaseModel):
    id: int
    admin_id: Optional[int] = None
    folio: str
    fecha_valoracion: date
    fecha_alta: Optional[date] = None
    nombre: str
    apellidos: str
    sexo: str
    telefono: str
    diagnostic_medic: str
    motivo_consulta: str

    class Config:
        from_attributes=True
