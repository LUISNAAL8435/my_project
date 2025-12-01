import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderPacientComponent } from "../../../shared/components/fisio/header-pacient/header-pacient.component";
import { TablehistoryComponent } from '../../../shared/components/fisio/tablehistory/tablehistory.component';
import { AntecedentesHeredofamiliares, AntecedentesNoPatologicos, AntecedentesPersonalesPatologicos } from '../../../core/interfaces/fisio/enfermedades.models';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../../../shared/components/fisio/select/select.component';
import { SocioeconomicStudyComponent } from "../socioeconomic-study/socioeconomic-study.component";
import { TestComponent } from "../test/test.component";
import { EvaluacionDolorComponent } from "../evaluacion-dolor/evaluacion-dolor.component";
import { NeurologicaComponent } from "../neurologica/neurologica.component";
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';

@Component({
  selector: 'app-historal',
  imports: [HeaderPacientComponent, TablehistoryComponent, NgIf, SelectComponent, SocioeconomicStudyComponent, TestComponent, EvaluacionDolorComponent, NeurologicaComponent, ValidationActionsComponent],
  templateUrl: './historal.component.html',
  styleUrl: './historal.component.scss'
})
export class HistoralComponent implements OnInit {
  paciente!: Paciente;
  id!: number;
  
  @ViewChild('test') testComponent!: TestComponent
  @ViewChild('evaluation') evaliationDolor!: EvaluacionDolorComponent
  @ViewChild('neurologica') enviarneorologica!: NeurologicaComponent
  @ViewChild('ginecolog') enviarDatosObsGine!: SocioeconomicStudyComponent

  contenedor: number = 0;
  
  // Variables para confirmación
  showSaveConfirmation: boolean = false;

  // Datos del formulario
  titulo = 'Antecedentes Personal No Patológico';
  antecedentes: AntecedentesNoPatologicos = {
    tabaquismo: { respuesta: false, observacion: '' },
    alcoholismo: { respuesta: false, observacion: '' },
    drogas: { respuesta: false, observacion: '' },
    diabetes: { respuesta: false, observacion: '' },
    alergia: { respuesta: false, observacion: '' },
    hta: { respuesta: false, observacion: '' },
    cancer: { respuesta: false, observacion: '' },
    transfusiones: { respuesta: false, observacion: '' },
  }

  titulo2 = 'Antecedentes heredofamiliares';
  antecedentes2: AntecedentesHeredofamiliares = {
    diabetes: { respuesta: false, observacion: '' },
    alergia: { respuesta: false, observacion: '' },
    hta: { respuesta: false, observacion: '' },
    cancer: { respuesta: false, observacion: '' },
    transfusiones: { respuesta: false, observacion: '' }, 
  }

  titulo3 = 'Antecedentes Personales Patológicos';
  antecedentes3: AntecedentesPersonalesPatologicos = {
    reumaticas: { respuesta: false, observacion: '' },
    Encames: { respuesta: false, observacion: '' },
    Accidentes: { respuesta: false, observacion: '' },
    cardiopatias: { respuesta: false, observacion: '' },
    cirugias: { respuesta: false, observacion: '' },
    fracturas: { respuesta: false, observacion: '' },
  };

  // Variables para selects
  grupoFamliarSelec: number = 0;
  adultosSelec: number = 0;
  ninosSelec: number = 0;
  productivasSelec: number = 0;
  vivendaSelec: number = 0;
  CuartosSelec: number = 0;
  serviciosSelec: number = 0;
  transporteSelec: number = 0;
  ocupacionSelec: number = 0;
  salarioSelec: number = 0;
  saludSelec: number = 0;

  // Opciones de selects
  opcionesGruppoFamiliar = [
    { value: 1, label: '1 a 3' },
    { value: 2, label: '4 a 6' },
    { value: 3, label: '7 a 9' },
    { value: 4, label: '10 o más' }
  ]

  adultos = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '6' }
  ]

  ninos = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '6' }
  ]

  productivas = [
    { value: 1, label: '1 a 3' },
    { value: 2, label: '4 a 6' },
    { value: 3, label: '7 a 9' },
    { value: 4, label: '10 o más' }  
  ]

  vivienda = [
    { value: 1, label: 'HIPOTECADA' },
    { value: 2, label: 'PROPIA' },
    { value: 3, label: 'RENTADA/INFONAVIT' },
    { value: 4, label: 'COMPARTIDA' }  
  ]

  cuartos = [
    { value: 1, label: '1 a 3' },
    { value: 2, label: '4 a 6' },
    { value: 3, label: '7 a 9' },
    { value: 4, label: '10 o más' } 
  ]

  Servicio = [
    { value: 1, label: 'Sin servicios básicos(luz, agua potable)' },
    { value: 2, label: 'Sin servicios básicos y teléfono' },
    { value: 3, label: 'Sin servicios básicos, teléfonos, cablevisión' },
    { value: 4, label: 'Sin servicios básicos, teléfonos, cablevisión, internet' } 
  ]

  Transporte = [
    { value: 1, label: 'Autobús' },
    { value: 2, label: '1 Automóvil' },
    { value: 3, label: '2 Automóviles' },
    { value: 4, label: '3 o más automóviles' } 
  ]

  ocupacion = [
    { value: 0, label: 'Desempleado' },
    { value: 1, label: 'Subempleado' },
    { value: 2, label: 'Obreros/Empleados(Cuando tengan IMSS y prestaciónes de ley)' },
    { value: 3, label: 'Empresarios, ejecutivos, profesionista independiente' },
    { value: 4, label: 'Pensionado' },
    { value: 5, label: 'Jubilado' }  
  ]

  salario = [
    { value: 0, label: 'Menos del salario mínimo' },
    { value: 1, label: 'Salario mínimo' },
    { value: 2, label: 'Menos de $1000.00' },
    { value: 3, label: '$1000.00-$2990.00' },
    { value: 4, label: '$3000.00-$3990.00' },
    { value: 5, label: '$4000.00-$5000.00' } 
  ]

  salud = [
    { value: 0, label: 'No asegurado' },
    { value: 1, label: 'IMSS/ISSSTE' },
    { value: 2, label: 'Particular' },
  ]

  // Labels
  titulo4 = 'GRUPO FAMILIAR';
  titulo5 = 'GRUPO FAMILIAR';
  titulo6 = 'VIVIENDA';
  titulo7 = 'TIPO DE TRANSPORTE';
  titulo8 = 'GRUPO FAMILIAR';

  label1 = 'Núm. De Integrantes';
  label2 = 'NÚMERO DE ADULTOS:';
  label3 = 'NÚMERO DE NIÑOS';
  label4 = 'NÚM. DE PERSONAS ECÓNOMICAMENTE PRODUCTIVAS';
  label5 = 'SITUACIÓN DE LA VIVIENDA';
  label6 = 'NÚMERO DE CUARTOS';
  label7 = 'SERVICIOS';
  label8 = 'TRANSPORTE';
  label9 = 'OCUPACIÓN';
  label10 = 'SALARIO';
  label11 = 'SERVICIOS DE SALUD';

  constructor(private genericService: GenericServiceService, private router: Router, private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const navigation = this.router.getCurrentNavigation();
    const pacienteState = navigation?.extras?.state?.['paciente'];

    if (pacienteState) {
      this.paciente = pacienteState;
    } else {
      this.cargarPacienteDesdeBackend();
    }
  }

  ngOnInit() {
    this.cargarAntecedentes();
    this.cargarEstudio(); 
  }

  cargarEstudio() {
    this.genericService.getById<any[]>('estudio', this.id).subscribe({
      next: (res) => {
        res.forEach(item => {
          switch(item.titulo) {
            case 'GRUPO FAMILIAR':
              this.grupoFamliarSelec = item.datos.num_integrantes.valor;
              this.adultosSelec = item.datos.num_adultos.valor;
              this.ninosSelec = item.datos.num_ninos.valor;
              this.productivasSelec = item.datos.personas_economicamente_productivas.valor;
              break;
            case 'VIVIENDA':
              this.vivendaSelec = item.datos.situacion_vivienda.valor;
              this.CuartosSelec = item.datos.num_cuartos.valor;
              this.serviciosSelec = item.datos.servicios.valor;
              break;
            case 'TRANSPORTE':
              this.transporteSelec = item.datos.transporte.valor;
              break;
            case 'OCUPACION':
              this.ocupacionSelec = item.datos.ocupacion.valor;
              break;
            case 'SALARIO':
              this.salarioSelec = item.datos.salario.valor;
              break;
            case 'SERVICIOS DE SALUD':
              this.saludSelec = item.datos.servicio_salud.valor;
              break;
          }
        });
      }
    });
  }

  cargarAntecedentes() {
    this.genericService.getById<any[]>('antecedentes', this.id).subscribe({
      next: (res) => {
        res.forEach(item => {
          if (item.titulo === 'Antecedentes Personal No Patológico') {
            this.antecedentes = item.datos;
          } 
          else if (item.titulo === 'Antecedentes heredofamiliares') {
            this.antecedentes2 = item.datos;
          } 
          else if (item.titulo === 'Antecedentes Personales Patológicos') {
            this.antecedentes3 = item.datos;
          }
        });
      }
    });
  }

  cargarPacienteDesdeBackend() {
    this.genericService.getById<Paciente>('patients', this.id).subscribe({
      next: (pac) => this.paciente = pac
    });
  }

  // ✅ MÉTODOS DE CONFIRMACIÓN
  solicitarGuardado() {
    this.showSaveConfirmation = true;
  }

  confirmarGuardado() {
    if (this.contenedor === 0) {
      this.enviarAntecedentes();  
    } else if (this.contenedor === 1) {
      this.enviarEstudioSocio();
    } else if (this.contenedor === 2) {
      this.enviarDatosObsGine.enviarDatosObstGine();
    } else if (this.contenedor === 3) {
      this.testComponent.enviarTest();
    } else if (this.contenedor === 4) {
      this.evaliationDolor.enviarEvaluacion();
    } else if (this.contenedor === 5) {
      this.enviarneorologica.enviartestNeorologica();
    }
    this.showSaveConfirmation = false;
  }

  cancelarGuardado() {
    this.showSaveConfirmation = false;
  }

  enviarEstudioSocio() {
    const grupos = [
      {
        paciente_id: this.id,
        titulo: 'GRUPO FAMILIAR',
        datos: {
          num_integrantes: { valor: this.grupoFamliarSelec },
          num_adultos: { valor: this.adultosSelec },
          num_ninos: { valor: this.ninosSelec },
          personas_economicamente_productivas: { valor: this.productivasSelec }
        }
      },
      {
        paciente_id: this.id,
        titulo: 'VIVIENDA',
        datos: {
          situacion_vivienda: { valor: this.vivendaSelec },
          num_cuartos: { valor: this.CuartosSelec },
          servicios: { valor: this.serviciosSelec }
        }                  
      },
      {
        paciente_id: this.id,
        titulo: 'TRANSPORTE',
        datos: {
          transporte: { valor: this.transporteSelec }
        }                 
      },
      {
        paciente_id: this.id,
        titulo: 'OCUPACION',
        datos: {
          ocupacion: { valor: this.ocupacionSelec }
        }                 
      },
      {
        paciente_id: this.id,
        titulo: 'SALARIO',
        datos: {
          salario: { valor: this.salarioSelec }
        }  
      },
      {
        paciente_id: this.id,
        titulo: 'SERVICIOS DE SALUD',
        datos: {
          servicio_salud: { valor: this.saludSelec }
        }  
      }
    ];

    grupos.forEach((grupo) => {
      this.genericService.create<any>('estudio', grupo).subscribe();
    });
  }

  enviarAntecedentes() {
    const grupos = [
      {
        paciente_id: this.id,
        titulo: this.titulo,
        datos: this.antecedentes
      },
      {
        paciente_id: this.id,
        titulo: this.titulo2,
        datos: this.antecedentes2
      },
      {
        paciente_id: this.id,
        titulo: this.titulo3,
        datos: this.antecedentes3
      }
    ];

    grupos.forEach((grupo) => {
      this.genericService.create<any>('antecedentes', grupo).subscribe();
    });
  }

  onFormChange(values: any) {
    // Manejo de cambios del formulario
  }

  Mostrarcontenido(opcion: number) {
    this.contenedor = opcion;
  }
}