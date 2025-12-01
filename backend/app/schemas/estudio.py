from pydantic import BaseModel
from typing import Dict,Optional

class Item(BaseModel):
    valor:int

class EstudiorCreate(BaseModel):
    paciente_id:int
    titulo: str
    datos:Dict[str, Item]

class EstudioResponse(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,Item]

    class Config:
        from_attributes = True
