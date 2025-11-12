  export interface AntecedenteItem {
    respuesta: boolean;
    observacion: string;
  }
  export interface AntecedentesNoPatologicos {
    tabaquismo: AntecedenteItem;
    alcoholismo: AntecedenteItem;
    drogas: AntecedenteItem;
    diabetes: AntecedenteItem;
    alergia: AntecedenteItem;
    hta: AntecedenteItem;
    cancer:AntecedenteItem;
    transfusiones:AntecedenteItem;
  }
    export interface AntecedentesHeredofamiliares {
    diabetes: AntecedenteItem;
    alergia: AntecedenteItem;
    hta: AntecedenteItem;
    cancer: AntecedenteItem;
    transfusiones: AntecedenteItem;
  }
    export interface AntecedentesPersonalesPatologicos{
    reumaticas:AntecedenteItem;
    Encames:AntecedenteItem;
    Accidentes:AntecedenteItem;
    cardiopatias:AntecedenteItem;
    cirugias:AntecedenteItem;
    fracturas:AntecedenteItem;
  }
  
export interface AntecedentesCompletos {
  titulo1: string;
  antecedentesNoPatologicos: AntecedentesNoPatologicos;

  titulo2: string;
  antecedentesHeredofamiliares: AntecedentesHeredofamiliares;

  titulo3: string;
  antecedentesPersonalesPatologicos: AntecedentesPersonalesPatologicos;
}
  //---------------------------
    export interface NumeroFamiliaa{
    _1a3:boolean;
    _4a6:boolean;
    _7a9:boolean;
    _10aMas:boolean;
    valor:number;

  }

//---------------------------
  export interface TestIsometricoBaumanometro{
    flexion_hombro:string;
    extension_hombro:string;
    aduccion_hombro:string;
    r_i_de_hombro:string;
    r_e_de_hombro:string;
    flexion_de_codo:string;
    extension_de_codo:string;
    flexion_de_cadera:string;
    extension_de_cadera:string;
    abduccion_de_cadera:string;
    aduccion_De_cadera:string;
    r_i_de_cadera:string;
    r_e_de_cadera:string;
    flexion_de_rodilla:string;
    extension_de_rodilla:string;
    flexion_plantar_tobillo:string;
    flexion_dorsal_tobillo:string;
  }
  export interface TestIsotonicoConPeso{
    flexion_hombro:TestValores;
    extension_hombro:TestValores;
    aduccion_hombro:TestValores;
    r_i_de_hombro:TestValores;
    r_e_de_hombro:TestValores;
    flexion_de_codo:TestValores;
    extension_de_codo:TestValores;
    flexion_de_cadera:TestValores;
    extension_de_cadera:TestValores;
    abduccion_de_cadera:TestValores;
    aduccion_De_cadera:TestValores;
    r_i_de_cadera:TestValores;
    r_e_de_cadera:TestValores;
    flexion_de_rodilla:TestValores;
    extension_de_rodilla:TestValores;
    flexion_plantar_tobillo:TestValores;
    flexion_dorsal_tobillo:TestValores;
  }
  export interface TestValores{
    kgDerecho:number;
    KgIquierdo:number;
    resultado:number;
  }

  //--------------------------------------
    export interface EvalucacionDeDolor{
    donde_le_duele:string;
    parestesia:string;
    disestesia:string;
    sensacionDeElectricidad:string;
    elDolorSeIrradiaEnOtraZona:string;
    elDolorEmpezoDespuesDelMecanismoDeLesion:string;
    elDolorEmpezoDeLaNada:string;
    queExacerbaSuDolor:string;
    queInhibeSuDolor:string;
    elDolorSeMantieneDeFormaPuntualOEnLaZona:string;
    elDolorSeDesplazaAOtraZona:string;
    dolorTipoArdor:string;
    dolorTipoPunzante:string;
    nivelDeDolor:string;
  }


//-----------------------------
   export interface DatosTest{
    musculo:string;
    estado:string
  }
  export interface DatosTestInferior{
    zonas:string;
    estado:string
    alterada:string
  }
  export interface TestMiembroSuperior{
    c5:DatosTest;
    c6:DatosTest;
    c7:DatosTest;
    c8:DatosTest;
    t1:DatosTest;

  }
    export interface TestMiembroInferior{
    l2:DatosTest;
    l3:DatosTest;
    l4:DatosTest;
    l5:DatosTest;
    s1:DatosTest;
    s2:DatosTest;
  }
  export interface Test1MiembroSuperior{
    c5:DatosTestInferior;
    c6:DatosTestInferior;
    c7:DatosTestInferior;
    c8:DatosTestInferior;
    t1:DatosTestInferior;
  }
    export interface Test1MiembroInferior{
    l2:DatosTestInferior;
    l3:DatosTestInferior;
    l4:DatosTestInferior;
    l5:DatosTestInferior;
    s1:DatosTestInferior;
    s2:DatosTestInferior;
  }
