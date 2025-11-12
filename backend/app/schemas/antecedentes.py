from pydantic import BaseModel
from typing import Dict, Optional

class Item(BaseModel):
    respuesta: bool
    observacion: Optional[str] = "" 

class AntecedentesCreate(BaseModel):
    paciente_id: int
    titulo: str
    datos: Dict[str, Item]

class AntecedentesResponse(BaseModel):
    id: int
    paciente_id: int
    titulo: str
    datos: Dict[str, Item]

    class Config:
        from_attributes = True
