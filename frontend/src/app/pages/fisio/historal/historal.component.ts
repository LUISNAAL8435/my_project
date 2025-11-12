import { Component,ViewChild } from '@angular/core';
import { HeaderPacientComponent } from "../../../shared/components/fisio/header-pacient/header-pacient.component";
import { TablehistoryComponent } from '../../../shared/components/fisio/tablehistory/tablehistory.component';
import { AntecedentesHeredofamiliares, AntecedentesNoPatologicos, AntecedentesPersonalesPatologicos,AntecedentesCompletos } from '../../../core/interfaces/fisio/enfermedades.models';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../../shared/components/fisio/select/select.component';
import { SocioeconomicStudyComponent } from "../socioeconomic-study/socioeconomic-study.component";
import { TestComponent } from "../test/test.component";
import { EvaluacionDolorComponent } from "../evaluacion-dolor/evaluacion-dolor.component";
import { NeurologicaComponent } from "../neurologica/neurologica.component";
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';

@Component({
  selector: 'app-historal',
  imports: [HeaderPacientComponent, TablehistoryComponent, NgIf, SelectComponent, SocioeconomicStudyComponent, TestComponent, EvaluacionDolorComponent, NeurologicaComponent],
  templateUrl: './historal.component.html',
  styleUrl: './historal.component.scss'
})
export class HistoralComponent {
      @ViewChild('test') testComponent!:TestComponent
      @ViewChild('evaluation') evaliationDolor!:EvaluacionDolorComponent
      @ViewChild('neurologica') enviarneorologica!:NeurologicaComponent
  contenedor:number=0;
  titulo = 'Antecedentes Personal No Patológico';
  antecedentes: AntecedentesNoPatologicos={
    tabaquismo: { respuesta: false, observacion: '' },
    alcoholismo: { respuesta: false, observacion: '' },
    drogas: { respuesta: false, observacion: '' },
    diabetes: { respuesta: false, observacion: '' },
    alergia: { respuesta: false, observacion: '' },
    hta: { respuesta: false, observacion: '' },
    cancer: { respuesta: false, observacion: '' },
    transfusiones: { respuesta: false, observacion: '' },
  }
titulo2='Antecedentes heredofamiliares';
antecedentes2:AntecedentesHeredofamiliares={
    diabetes: { respuesta: false, observacion: '' },
    alergia: { respuesta: false, observacion: '' },
    hta: { respuesta: false, observacion: '' },
    cancer: { respuesta: false, observacion: '' },
    transfusiones: { respuesta: false, observacion: '' }, 
}
titulo3='Antecedentes Personales Patológicos';
  antecedentes3:AntecedentesPersonalesPatologicos={
   reumaticas:{ respuesta: false, observacion: '' },
       Encames:{ respuesta: false, observacion: '' },
       Accidentes:{ respuesta: false, observacion: '' },
       cardiopatias:{ respuesta: false, observacion: '' },
       cirugias:{ respuesta: false, observacion: '' },
       fracturas:{ respuesta: false, observacion: '' },
  };
  grupoFamliarSelec:number=0;
  titulo4='GRUPO FAMILIAR';
  label1='Núm. De Integrantes';
  opcionesGruppoFamiliar=[
      { value: 1 ,label: '1 a 3'},
      { value: 2,label: '4 a 6' },
      { value: 3 ,label: '7 a 9'},
      { value: 4 ,label: '10 o más'}
  ]
  adultosSelec:number=0;
  titulo5='GRUPO FAMILIAR'
  label2='NÚMERO DE ADULTOS:'
  adultos=[
      { value: 1 ,label: '1'},
      { value: 2,label: '2' },
      { value: 3 ,label: '3'},
      { value: 4 ,label: '4'},
      { value: 5 ,label: '6'}
  ]
  ninosSelec:number=0;
  titulo8='GRUPO FAMILIAR'
  label3='NÚMERO DE NIÑOS'
  ninos=[
      { value: 1 ,label: '1'},
      { value: 2,label: '2' },
      { value: 3 ,label: '3'},
      { value: 4 ,label: '4'},
      { value: 5 ,label: '6'}
  ]
  productivasSelec:number=0;
label4='NÚM. DE PERSONAS ECÓNOMICAMENTE PRODUCTIVAS'
productivas=[
      { value: 1 ,label: '1 a 3'},
      { value: 2,label: '4 a 6' },
      { value: 3 ,label: '7 a 9'},
      { value: 4 ,label: '10 o más'}  
]
//--------------------------------------------
vivendaSelec:number=0;
titulo6='VIVIENDA'
label5='SITUACIÓN DE LA VIVIENDA'
vivienda=[
      { value: 1 ,label: 'HIPOTECADA'},
      { value: 2,label: 'PROPIA' },
      { value: 3 ,label: 'RENTADA/INFONAVIT'},
      { value: 4 ,label: 'COMPARTIDA'}  
]
CuartosSelec:number=0;
label6='NÚMERO DE CUARTOS'
cuartos=[
      { value: 1 ,label: '1 a 3'},
      { value: 2,label: '4 a 6' },
      { value: 3 ,label: '7 a 9'},
      { value: 4 ,label: '10 o más'} 
]
serviciosSelec:number=0;
label7='SERVICIOS'
Servicio=[
      { value: 1 ,label: 'Sin servicios básicos(luz, agua potable)'},
      { value: 2,label: 'Sin servicios básicos y teléfono' },
      { value: 3 ,label: 'Sin servicios básicos, teléfonos, cablevisión'},
      { value: 4 ,label: 'Sin servicios básicos, teléfonos, cablevisión, internet'} 
]
transporteSelec:number=0;
titulo7='TIPO DE TRANSPORTE'
label8='TRANSPORTE'
Transporte=[
      { value: 1 ,label: 'Autobús'},
      { value: 2,label: '1 Automóvil' },
      { value: 3 ,label: '2 Automóviles'},
      { value: 4 ,label: '3 o más automóviles'} 
]
//-----------------
ocupacionSelec:number=0;
label9='OCUPACIÓN'
ocupacion=[
      { value: 0 ,label: 'Desempleado'},
      { value: 1,label: 'Subempleado' },
      { value: 2 ,label: 'Obreros/Empleados(Cuando tengan IMSS y prestaciónes de ley)'},
      { value: 3 ,label: 'Empresarios, ejecutivos, profesionista independiente'},
      { value: 4 ,label: 'Pensionado'} ,
      { value: 5 ,label: 'Jubilado'}  
]
salarioSelec:number=0;
label10='SALARIO'
salario=[
      { value: 0 ,label: 'Menos del salario mínimo'},
      { value: 1,label: 'Salario mínimo' },
      { value: 2 ,label: 'Menos de $1000.00'},
      { value: 3 ,label: '$1000.00-$2990.00'},
      { value: 4 ,label: '$3000.00-$3990.00'} ,
      { value: 5 ,label: '$4000.00-$5000.00'} 
]
saludSelec:number=0;
label11='SERVICIOS DE SALUD'
salud=[
      { value: 0 ,label: 'No asegurado'},
      { value: 1,label: 'IMSS/ISSSTE' },
      { value: 2 ,label: 'Particular'},
]

constructor(private genericService:GenericServiceService){}
enviarEstudioSocio(){
      const grupos = [
            {
            paciente_id:1,
            titulo: 'GRUPO FAMILIAR',
            datos:{
            num_integrantes: { valor: this.grupoFamliarSelec},
            num_adultos: { valor: this.adultosSelec },
            num_ninos: { valor: this.ninosSelec },
            personas_economicamente_productivas:{valor: this.productivasSelec}
            }
            },
            {
            paciente_id:1,
            titulo: 'VIVIENDA',
            datos:{
            situacion_vivienda: { valor: this.vivendaSelec},
            num_cuartos: { valor: this.CuartosSelec },
            servicios: { valor: this.serviciosSelec },
            }                  
            },
            {
            paciente_id:1,
            titulo: 'TRANSPORTE',
            datos:{
            transporte: { valor: this.transporteSelec},
            }                 
            },
            {
            paciente_id:1,
            titulo: 'OCUPACIÓN',
            datos:{
            OCUPACIÓN: { valor: this.ocupacionSelec},
            }                 
            },
            {
            paciente_id:1,
            titulo: 'SALARIO',
            datos:{
            salario: { valor: this.salarioSelec},
            }  
            },
            {
            paciente_id:1,
            titulo: 'SERVICIOS DE SALUD',
            datos:{
            servicio_salud: { valor: this.saludSelec},
            }  
            }
      ];
      grupos.forEach((grupo) => {
            console.log('📤 Payload que se envía al backend:', JSON.stringify(grupo, null, 2));
            this.genericService.create<any>('estudio', grupo).subscribe({
                  next: res => console.log(`✅ ${grupo.titulo} guardado`, res),
                  error: err => console.error(`❌ Error en ${grupo.titulo}`, err)
            });
      });
}
enviarAntecedentes() {
  const pacienteId = 1; // temporal, luego dinámico

  const grupos = [
    {
      paciente_id: pacienteId,
      titulo: this.titulo,
      datos: this.antecedentes
    },
    {
      paciente_id: pacienteId,
      titulo: this.titulo2,
      datos: this.antecedentes2
    },
    {
      paciente_id: pacienteId,
      titulo: this.titulo3,
      datos: this.antecedentes3
    }
  ];

  grupos.forEach((grupo) => {
        console.log('📤 Payload que se envía al backend:', JSON.stringify(grupo, null, 2));
this.genericService.create<any>('antecedentes', grupo).subscribe({
  next: res => console.log(`✅ ${grupo.titulo} guardado`, res),
  error: err => console.error(`❌ Error en ${grupo.titulo}`, err)
});
  });
}

  onFormChange(values: any) {
    console.log('Observaciones:', values);
  }
  Mostrarcontenido(opcion:number){
  this.contenedor=opcion;
}

onBotonOk(){
      console.error(this.contenedor)
      if(this.contenedor===0){
            this.enviarAntecedentes();  
      }
      else if(this.contenedor===1){
            this.enviarEstudioSocio();
      }else if(this.contenedor===3){
            this.testComponent.enviarTest();
      }else if(this.contenedor===4){
            this.evaliationDolor.enviarEvaluacion();
      }else if(this.contenedor===5){
            this.enviarneorologica.enviartestNeorologica();
      }
}
}
