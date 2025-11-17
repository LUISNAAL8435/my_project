import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';

interface UnidadDeAtencion {
    paciente_id:number
    unidad:string
    nombre:string
    fecha:string
    edad:string
    sesion:string
    subjetivo:string
    objetivo:string
    analisis:string
    plan:string
}



@Component({
  selector: 'app-uni-atencion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uni-atencion.component.html',
  styleUrls: ['./uni-atencion.component.scss']
})
export class UniAtencionComponent implements OnInit {
  @Input() paciente: Paciente | null = null;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  botonM: string = 'white';
  botonF: string = 'white';
  sexo:string='';
  folio:string='';
  unidadDeAtencion: UnidadDeAtencion = {
    paciente_id:0,
    unidad:'',
    nombre:'',
    fecha:'',
    edad:'',
    sesion:'',
    subjetivo:'',
    objetivo:'',
    analisis:'',
    plan:''
  };

  ngOnInit(): void {
    // Si hay un paciente, prellenar los datos
    if (this.paciente) {
      this.unidadDeAtencion = {
        paciente_id:this.paciente.id,
        unidad: 'Fisioterapia General',
        nombre: this.paciente.nombre,
        fecha: new Date().toISOString().split('T')[0],
        edad: '',
        sesion: '1',
        subjetivo: '',
        objetivo: '',
        analisis: '',
        plan: ''
      };
      this.sexo=this.paciente.sexo;
      this.folio= this.paciente.folio;
    } 
    this.configurarSexo(this.sexo);
  }

  seleccionarSexo(sexo: string): void {
    this.sexo = sexo;
    this.configurarSexo(sexo);
  }

  private configurarSexo(sexo: string): void {
    if (sexo === 'Femenino') {
      this.botonF = 'blue';
      this.botonM = 'white';
    } else if (sexo === 'Masculino') {
      this.botonM = 'blue';
      this.botonF = 'white';
    }
  }

  onGuardar(): void {
    this.guardar.emit(this.unidadDeAtencion);
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}