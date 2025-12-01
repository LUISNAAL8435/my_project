from pydantic import BaseModel
from typing import Dict,Optional

class Item(BaseModel):
    valor:Optional[str] = "" 

class Item2(BaseModel):
    kgDerecho:int
    KgIquierdo:int
    resultado:int

class TestIsometricoCreate(BaseModel):
    paciente_id:int
    titulo: str
    datos:Dict[str, Item]

class TestResponse(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,Item]

    class Config:
        from_attributes = True

class TestIsotonicoCreate(BaseModel):
    paciente_id:int
    titulo:str
    datos:Dict[str,Item2]

class TestResponse2(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,Item2]

    class Config:
        from_attributes = True
