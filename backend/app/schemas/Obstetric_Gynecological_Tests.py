from pydantic import BaseModel
from datetime import date 
from typing import Dict,Optional
class DatosAntecedente(BaseModel):
    resultado: bool
    respuesta: str

class Obstetricos(BaseModel):
    paciente_id:int
    vida_sexual: str
    metodo_proteccion: str
    enfermedades_transmision_sexual: DatosAntecedente
    actualmente_embarazada: DatosAntecedente
    parto_natural: DatosAntecedente
    parto_cesaria: DatosAntecedente
    complicacion_en_parto: DatosAntecedente
    lactancia: DatosAntecedente
    aborto: DatosAntecedente

class ObstericosResponse(BaseModel):
    id:int
    paciente_id:int
    vida_sexual: str
    metodo_proteccion: str
    enfermedades_transmision_sexual: DatosAntecedente
    actualmente_embarazada: DatosAntecedente
    parto_natural: DatosAntecedente
    parto_cesaria: DatosAntecedente
    complicacion_en_parto: DatosAntecedente
    lactancia: DatosAntecedente
    aborto: DatosAntecedente

    class Config:
        from_attributes=True

class Ginecologicos(BaseModel):
    paciente_id:int
    primera_menarca:str
    fecha_ultima_menstruacion: Optional[date] = None 
    periodo_sangrado:str
    tipo_flujo:str
    medicamentos:DatosAntecedente
    menopausia:DatosAntecedente
    dismenorrea:str
    amenorrea:str

class GinecologicosResponse(BaseModel):
    id:int
    paciente_id:int
    primera_menarca:str
    fecha_ultima_menstruacion: Optional[date] = None 
    periodo_sangrado:str
    tipo_flujo:str
    medicamentos:DatosAntecedente
    menopausia:DatosAntecedente
    dismenorrea:str
    amenorrea:str


