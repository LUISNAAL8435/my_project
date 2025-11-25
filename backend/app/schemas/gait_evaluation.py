from pydantic import BaseModel
from typing import Dict,Optional

class MarchaCreate(BaseModel):
    paciente_id:int
    titulo: str
    datos:Dict[str, str]

class MarchaResponse(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,str]

    class Config:
        from_attributes = True
