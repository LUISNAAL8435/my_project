import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarPacienteComponent } from '../agregar-paciente/agregar-paciente.component';
import { UniAtencionComponent } from '../uni-atencion/uni-atencion.component';
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';

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

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    AgregarPacienteComponent,
    UniAtencionComponent,
    ValidationActionsComponent
  ],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  @Output() editar = new EventEmitter<Paciente>();
  @Output() eliminar = new EventEmitter<Paciente>();
  @Output() historial = new EventEmitter<Paciente>();
  @Output() atencion = new EventEmitter<Paciente>();

  terminoBusqueda: string = '';
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];

  mostrarModal = false;
  mostrarModalUnidadAtencion = false;
  pacienteEditando: Paciente | null = null;
  pacienteUnidadAtencion: Paciente | null = null;
  id: number = 0;

  showDeleteConfirmation = false;
  pacienteAEliminar: Paciente | null = null;

  constructor(
    private auth: AuthService,
    private Service: GenericServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.auth.userId;
    
    if (!userId) {
      alert("No hay usuario logueado");
      return;
    } else {
      this.id = userId;
    }
    this.cargarPacientes();
  }

  private normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s]/g, '');
  }

  filtrarPacientes(): void {
    if (!this.terminoBusqueda.trim()) {
      this.pacientesFiltrados = [...this.pacientes];
    } else {
      const terminoNormalizado = this.normalizarTexto(this.terminoBusqueda);
      
      this.pacientesFiltrados = this.pacientes.filter(paciente => {
        const nombreNormalizado = this.normalizarTexto(paciente.nombre);
        const apellidosNormalizado = this.normalizarTexto(paciente.apellidos);
        const folioNormalizado = this.normalizarTexto(paciente.folio);
        const nombreCompletoNormalizado = this.normalizarTexto(`${paciente.nombre} ${paciente.apellidos}`);
        
        const coincideNombreCompleto = nombreCompletoNormalizado.includes(terminoNormalizado);
        const coincideNombre = nombreNormalizado.includes(terminoNormalizado);
        const coincideApellidos = apellidosNormalizado.includes(terminoNormalizado);
        const coincideFolio = folioNormalizado.includes(terminoNormalizado);
        
        return coincideNombreCompleto || coincideNombre || coincideApellidos || coincideFolio;
      });
    }
  }

  abrirModalRegistro(): void {
    this.pacienteEditando = null;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pacienteEditando = null;
  }

  abrirModalUnidadAtencion(paciente: Paciente): void {
    this.pacienteUnidadAtencion = paciente;
    this.mostrarModalUnidadAtencion = true;
    this.atencion.emit(paciente);
  }

  cerrarModalUnidadAtencion(): void {
    this.mostrarModalUnidadAtencion = false;
    this.pacienteUnidadAtencion = null;
  }

  onGuardarUnidadAtencion(datosUnidadAtencion: any): void {
    this.Service.create('units', datosUnidadAtencion).subscribe({
      next: () => {
        alert('Unidad creada correctamente');
      },
      error: () => alert('Error al crear la unidad')
    });
    this.cerrarModalUnidadAtencion();
  }

  onUpdate(datosUnidadAtencion: any): void {
    if (!datosUnidadAtencion.id) {
      return;
    }

    this.Service.update(`units`, datosUnidadAtencion.id, datosUnidadAtencion).subscribe({
      next: () => {
        this.cerrarModalUnidadAtencion();
      },
      error: () => alert('Ocurrió un error al actualizar')
    });
  }

  OnDelete(id: number): void {
    if (!id) {
      return;
    }
    this.Service.delete('units', id).subscribe({
      next: () => {
      },
      error: () => alert('Error al eliminar la unidad')
    });
  }

  editarPaciente(paciente: Paciente): void {
    this.pacienteEditando = paciente;
    this.mostrarModal = true;
    this.editar.emit(paciente);
  }

  eliminarPaciente(paciente: Paciente): void {
    this.pacienteAEliminar = paciente;
    this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.pacienteAEliminar) {
      this.Service.delete('patients', this.pacienteAEliminar.id).subscribe({
        next: () => {
          this.pacientes = this.pacientes.filter(p => p.id !== this.pacienteAEliminar!.id);
          this.pacientesFiltrados = this.pacientesFiltrados.filter(p => p.id !== this.pacienteAEliminar!.id);
          this.cancelarEliminacion();
        },
        error: () => alert('Ocurrió un error al eliminar el paciente')
      });
    }
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.pacienteAEliminar = null;
  }

  verHistorial(paciente: Paciente): void {
    this.router.navigate(['/fisio/historial', paciente.id], {
      state: { paciente }
    });
  }

  cargarPacientes() {
    this.Service.getById<any>('patients/list', this.id).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.pacientesFiltrados = data;
      },
      error: () => alert('Error al cargar pacientes')
    });
  }

  onGuardarPaciente(): void {
    this.cargarPacientes();
    this.filtrarPacientes();
    this.cerrarModal();
  }
}