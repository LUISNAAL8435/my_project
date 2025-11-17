from pydantic import BaseModel
from typing import Dict,Optional
from datetime import date 

class UnidadCreate(BaseModel):
    paciente_id:int
    unidad:str
    fecha:date
    edad:str
    sesion:str
    subjetivo:str
    objetivo:str
    analisis:str
    plan:str
class UnidadResponse(BaseModel):
    id:int 
    paciente_id:int
    unidad:str
    fecha:str
    edad:str
    sesion:str
    subjetivo:str
    objetivo:str
    analisis:str
    plan:str

    class Config:
        from_attributes=True