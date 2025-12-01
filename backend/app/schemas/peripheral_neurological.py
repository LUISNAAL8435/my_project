from pydantic import BaseModel
from typing import Dict,Optional

class Item(BaseModel):
    musculo:str
    estado:str

class Item2(BaseModel):
    zonas:str
    estado:str
    alterada:str

class peripheralTest1Create(BaseModel):
    paciente_id:int
    titulo: str
    datos:Dict[str,Item]

class peripheralTest2Create(BaseModel):
    paciente_id:int
    titulo:str
    datos:Dict[str, Item2]


class pripheralResponse(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,Item]

    class Config:
        from_attributes = True

class pripheralResponse2(BaseModel):
    id:int
    paciente_id:int
    titulo:str
    datos:Dict[str,Item2]

    class Config:
        from_attributes = True