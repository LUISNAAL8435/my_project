import { Component, Input, OnInit } from '@angular/core';
import { TestIsometricoBaumanometro, TestIsotonicoConPeso } from '../../../core/interfaces/fisio/enfermedades.models';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Obstericos, Paciente } from '../../../core/interfaces/fisio/patients.models';
import { Ginecologicos } from '../../../core/interfaces/fisio/patients.models';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-socioeconomic-study',
  imports: [FormsModule, NgIf],
  templateUrl: './socioeconomic-study.component.html',
  styleUrl: './socioeconomic-study.component.scss'
})
export class SocioeconomicStudyComponent implements OnInit {
@Input() paciente!: Paciente;
  obstericos:Obstericos={
    paciente_id: 0,
    vida_sexual:'',
    metodo_proteccion:'',
    enfermedades_transmision_sexual:{ resultado: false, respuesta: '' },
    actualmente_embarazada:{ resultado: false, respuesta: '' },
    parto_natural:{ resultado: false, respuesta: '' },
    parto_cesaria:{ resultado: false, respuesta: '' },
    complicacion_en_parto:{ resultado: false, respuesta: '' },
    lactancia:{ resultado: false, respuesta: '' },
    aborto:{ resultado: false, respuesta: '' },
  }
     ginecologicos:Ginecologicos={
      paciente_id: 0,
      primera_menarca:'',
      fecha_ultima_menstruacion:null,
      periodo_sangrado:'',
      tipo_flujo:'',
      medicamentos:{ resultado: false, respuesta: '' },
      menopausia:{ resultado: false, respuesta: '' },
      dismenorrea:'',
      amenorrea:''
    }

    constructor(private Service:GenericServiceService){}
  ngOnInit(): void {
    this.obtenerdatos();
  }
  obtenerdatos(){
  // Obtener obstétricos
  this.Service.getById<Obstericos>('obstetricos', this.paciente.id).subscribe({
    next: (res) => {
      if (res) {
        this.obstericos = res;
      }
    }
  });
  // Obtener ginecológicos
  this.Service.getById<Ginecologicos>('ginecologicos', this.paciente.id).subscribe({
    next: (res) => {
      if (res) {
        this.ginecologicos = res;

        // Convertir fecha al formato compatible con input[type="date"]
        if (this.ginecologicos.fecha_ultima_menstruacion) {
          this.ginecologicos.fecha_ultima_menstruacion =this.ginecologicos.fecha_ultima_menstruacion.toString().slice(0, 10);
        }
      }
    }
  });
  }
  enviarDatosObstGine(){
      // Enviar obstetricos
  this.obstericos.paciente_id=this.paciente.id
  this.ginecologicos.paciente_id=this.paciente.id
  this.Service.create("obstetricos", this.obstericos).subscribe(res => {
    console.log("Obstetricos guardados", res);
  });

  // Enviar ginecologicos
  this.Service.create("ginecologicos", this.ginecologicos).subscribe(res => {
    console.log("Ginecológicos guardados", res);
  });
  }
}
