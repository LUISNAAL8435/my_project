import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UnidadDeAtencion {
  unidad: string;
  nombre: string;
  fecha: string;
  folio: string;
  edad: string;
  sexo: string;
  sesion: string;
  subjetivo: string;
  objetivo: string;
  analisis: string;
  plan: string;
}

interface Paciente {
  nombre: string;
  apellidos: string;
  folio: string;
  genero: string;
  icono: string;
  color: string;
  fechaRegistro?: Date;
  telefono?: string;
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
  
  unidadDeAtencion: UnidadDeAtencion = {
    unidad: '',
    nombre: '',
    fecha: '',
    folio: '',
    edad: '',
    sexo: '',
    sesion: '',
    subjetivo: '',
    objetivo: '',
    analisis: '',
    plan: ''
  };

  ngOnInit(): void {
    // Si hay un paciente, prellenar los datos
    if (this.paciente) {
      this.unidadDeAtencion = {
        unidad: 'Fisioterapia General',
        nombre: this.paciente.nombre,
        fecha: new Date().toISOString().split('T')[0],
        folio: this.paciente.folio,
        edad: '',
        sexo: this.paciente.genero,
        sesion: '1',
        subjetivo: '',
        objetivo: '',
        analisis: '',
        plan: ''
      };
    } else {
      // Datos de ejemplo si no hay paciente
      this.unidadDeAtencion = {
        unidad: 'Fisioterapia General',
        nombre: 'Juan Pérez García',
        fecha: '2024-12-19',
        folio: 'FIS-2024-001',
        edad: '35',
        sexo: 'Masculino',
        sesion: '1',
        subjetivo: 'Paciente refiere dolor en región lumbar...',
        objetivo: 'Limitación en flexión anterior...',
        analisis: 'Posible lumbalgia mecánica...',
        plan: 'Terapia manual, ejercicios de fortalecimiento...'
      };
    }

    this.configurarSexo(this.unidadDeAtencion.sexo);
  }

  seleccionarSexo(sexo: string): void {
    this.unidadDeAtencion.sexo = sexo;
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