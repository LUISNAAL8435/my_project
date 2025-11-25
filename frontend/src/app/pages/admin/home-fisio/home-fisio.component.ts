import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fisio } from '../../../core/interfaces/fisio/patients.models';
import { AgregarFisioComponent } from "../agregar-fisio/agregar-fisio.component";
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';
import { ListCitasComponent } from "../../../shared/components/admin/list-citas/list-citas.component";
import { PacientesListComponent } from "../../../shared/components/admin/pacientes-list/pacientes-list.component";
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';

@Component({
  selector: 'app-home-fisio',
  imports: [NgIf, NgFor, FormsModule, AgregarFisioComponent, ListCitasComponent, PacientesListComponent, ValidationActionsComponent],
  templateUrl: './home-fisio.component.html',
  styleUrl: './home-fisio.component.scss'
})
export class HomeFisioComponent implements OnInit {
  @Output() editar = new EventEmitter<Fisio>();
  mostrarModal = false;
  mostrarCita = false;
  mostrarListPacient = false;
  pacienteEditando: Fisio | null = null;
  
  // Variables para búsqueda
  terminoBusqueda: string = '';
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  id: number = 0;
  id_fisio: number = 0;

  // Variables para eliminación
  showDeleteConfirmation: boolean = false;
  fisioAEliminar: Fisio | null = null;

  constructor(
    private auth: AuthService,
    private Service: GenericServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.auth.userId;
    
    if (!userId) {
      return;
    } else {
      this.id = userId;
    }
    
    if (this.id != 0) {
      this.cargarPacientes();
    }
  }

  cargarPacientes() {
    this.Service.getById<any>('user', this.id).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.pacientesFiltrados = data;
      }
    });
  }

  // MÉTODOS DE CONFIRMACIÓN ELIMINAR
  solicitarEliminacion(paciente: Fisio): void {
    this.fisioAEliminar = paciente;
    this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.fisioAEliminar) {
      this.Service.delete('user', this.fisioAEliminar.id).subscribe({
        next: () => {
          this.cargarPacientes();
          this.cancelarEliminacion();
        }
      });
    }
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.fisioAEliminar = null;
  }

  // Métodos de acciones de fisioterapeutas
  editarPaciente(paciente: Fisio): void {
    this.pacienteEditando = paciente;
    this.mostrarModal = true;
    this.editar.emit(paciente);
  }

  abrirCitas(id: number) {
    this.id_fisio = id;
    this.mostrarCita = true;
  }

  abrirPacientes(id: number) {
    this.id_fisio = id;
    this.mostrarListPacient = true;
  }

  // Métodos del modal de registro/edición
  abrirModalRegistro(): void {
    this.pacienteEditando = null;
    this.mostrarModal = true;
  }
  
  cerrarModal(): void {
    this.mostrarModal = false;
    this.mostrarCita = false;
    this.mostrarListPacient = false;
    this.pacienteEditando = null;
  }

  onGuardarPaciente(): void {
    this.cargarPacientes();
    this.filtrarPacientes();
    this.cerrarModal();
  }

  // Métodos de búsqueda
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
        const nombreCompletoNormalizado = this.normalizarTexto(`${paciente.nombre} ${paciente.apellidos}`);
        
        const coincideNombreCompleto = nombreCompletoNormalizado.includes(terminoNormalizado);
        const coincideNombre = nombreNormalizado.includes(terminoNormalizado);
        const coincideApellidos = apellidosNormalizado.includes(terminoNormalizado);
        
        return coincideNombreCompleto || coincideNombre || coincideApellidos;
      });
    }
  }
}