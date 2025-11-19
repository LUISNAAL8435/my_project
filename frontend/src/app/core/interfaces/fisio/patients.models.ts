    export interface Paciente{
        id:number
        folio:string
        fecha_valoracion:Date
        fecha_alta?:Date
        nombre:string
        apellidos:string
        sexo:string
        telefono:string
        diagnostic_medic:string
        motivo_consulta:string
  }
  export interface Fisio{
    id:number
    nombre:string
    apellidos:string
    gmail:string
    password?:string
    rol:string
  }

  export interface datosAntecedente{
    resultado:boolean
    respuesta:string
    
  }
  export interface Obstericos{
     paciente_id:number,
    vida_sexual:string
    metodo_proteccion:string
    enfermedades_transmision_sexual:datosAntecedente
    actualmente_embarazada:datosAntecedente
    parto_natural:datosAntecedente
    parto_cesaria:datosAntecedente
    complicacion_en_parto:datosAntecedente
    lactancia:datosAntecedente
    aborto:datosAntecedente
  }

  export interface Ginecologicos{
     paciente_id: number,
    primera_menarca:string
    fecha_ultima_menstruacion:string|null
    periodo_sangrado:string
    tipo_flujo:string
    medicamentos:datosAntecedente
    menopausia:datosAntecedente
    dismenorrea:string
    amenorrea:string
  }