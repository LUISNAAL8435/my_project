import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { AuthService } from '../../../core/services/auth-service.service';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';

interface UnidadDeAtencion {
    id?: number
    paciente_id: number
    unidad: string
    nombre: string
    fecha: string
    edad: string
    sesion: string
    subjetivo: string
    objetivo: string
    analisis: string
    plan: string
}

@Component({
  selector: 'app-uni-atencion',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationActionsComponent],
  templateUrl: './uni-atencion.component.html',
  styleUrls: ['./uni-atencion.component.scss']
})
export class UniAtencionComponent implements OnInit {
  @Input() paciente: Paciente | null = null;
  @Output() guardar = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<any>();
  
  unidades: any[] = [];
  botonM: string = 'white';
  botonF: string = 'white';
  sexo: string = '';
  folio: string = '';
  cont: number = 0;

  // Variables para confirmaciones
  showSaveConfirmation: boolean = false;
  showUpdateConfirmation: boolean = false;
  showDeleteConfirmation: boolean = false;
  idAEliminar: number | null = null;

  unidadDeAtencion: UnidadDeAtencion = {
    paciente_id: 0,
    unidad: '',
    nombre: '',
    fecha: '',
    edad: '',
    sesion: '',
    subjetivo: '',
    objetivo: '',
    analisis: '',
    plan: ''
  };

  constructor(private auth: AuthService, private Service: GenericServiceService) {}

  ngOnInit(): void {
    if (this.paciente) {
      this.unidadDeAtencion = {
        paciente_id: this.paciente.id,
        unidad: 'Fisioterapia General',
        nombre: this.paciente.nombre,
        fecha: new Date().toISOString().split('T')[0],
        edad: this.paciente.edad,
        sesion: '',
        subjetivo: '',
        objetivo: '',
        analisis: '',
        plan: ''
      };
      this.sexo = this.paciente.sexo;
      this.folio = this.paciente.folio;
    } 
    this.configurarSexo(this.sexo);
    this.getUnidades();
  }

  editar(datos: any) {
    this.cont = 1;

    if (datos) {
      this.unidadDeAtencion = {
        id: datos.id,
        paciente_id: this.paciente?.id ?? 0,
        unidad: 'Fisioterapia General',
        nombre: datos.nombre,
        fecha: datos.fecha,
        edad: datos.edad,
        sesion: datos.sesion,
        subjetivo: datos.subjetivo,
        objetivo: datos.objetivo,
        analisis: datos.analisis,
        plan: datos.plan
      };

      this.sexo = datos.sexo;

      if (this.paciente) {
        this.folio = this.paciente.folio;
      }
    }
  }

  getUnidades() {
    if (this.paciente?.id) {
      this.Service.getById<any>('units/list', this.paciente.id).subscribe({
        next: (data) => {
          this.unidades = data;
        }
      });
    }
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

  // MÉTODOS DE CONFIRMACIÓN GUARDAR
  solicitarGuardar(): void {
    this.showSaveConfirmation = true;
  }

  confirmarGuardar(): void {
    if (this.cont == 0) {
      this.guardar.emit(this.unidadDeAtencion);
    } else if (this.cont == 1) {
      this.update.emit(this.unidadDeAtencion);
      this.cont = 0;
    }
    this.showSaveConfirmation = false;
  }

  cancelarGuardar(): void {
    this.showSaveConfirmation = false;
  }

  // MÉTODOS DE CONFIRMACIÓN ACTUALIZAR
  solicitarActualizar(): void {
    this.showUpdateConfirmation = true;
  }

  confirmarActualizar(): void {
    this.update.emit(this.unidadDeAtencion);
    this.cont = 0;
    this.showUpdateConfirmation = false;
  }

  cancelarActualizar(): void {
    this.showUpdateConfirmation = false;
  }

  // MÉTODOS DE CONFIRMACIÓN ELIMINAR
  solicitarEliminar(id: number): void {
    this.idAEliminar = id;
    this.showDeleteConfirmation = true;
  }

  confirmarEliminar(): void {
    if (this.idAEliminar) {
      this.eliminar.emit(this.idAEliminar);
      this.showDeleteConfirmation = false;
      this.idAEliminar = null;
    }
  }

  cancelarEliminar(): void {
    this.showDeleteConfirmation = false;
    this.idAEliminar = null;
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}