from pydantic import BaseModel
from typing import Dict,Optional
from datetime import date 

class AgendaCreate(BaseModel):
    paciente_id:int
    fisio_id:int
    fecha_cita:date
    hora_cita:str
    paciente:str
    estado_cita:str

class AgendaResponse(BaseModel):
    id: int
    paciente_id:int
    fecha_cita:date
    hora_cita:str
    paciente:str
    estado_cita:str

    class Config:
        from_attributes=True
