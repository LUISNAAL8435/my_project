import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarPacienteComponent } from '../agregar-paciente/agregar-paciente.component';
import { UniAtencionComponent } from '../uni-atencion/uni-atencion.component';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';

//interface Paciente {
  //nombre: string;
  //apellidos: string;
  //folio: string;
  //genero: string;
  //icono: string;
  //color: string;
  //fechaRegistro?: Date;
  //telefono?: string;
//}

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
  imports: [CommonModule, FormsModule, AgregarPacienteComponent,UniAtencionComponent],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  @Output() editar = new EventEmitter<Paciente>();
  @Output() eliminar = new EventEmitter<Paciente>();
  @Output() historial = new EventEmitter<Paciente>();
  @Output() atencion = new EventEmitter<Paciente>();

  // Variables para búsqueda
  terminoBusqueda: string = '';
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];

  // Variables para modales
  mostrarModal = false;
  mostrarModalUnidadAtencion = false;
  pacienteEditando: Paciente | null = null;
  pacienteUnidadAtencion: Paciente | null = null;
  id:number=0;
  constructor(private auth:AuthService,private Service:GenericServiceService, private router:Router,private route: ActivatedRoute) {
    
  }
  ngOnInit() {
  const userId = this.auth.userId;
  
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }else{
    this.id=userId;
  }
  this.cargarPacientes();
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

  // Métodos del modal de registro/edición
  abrirModalRegistro(): void {
    this.pacienteEditando = null;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.pacienteEditando = null;
  }

  // Métodos del modal de unidad de atención
  abrirModalUnidadAtencion(paciente: Paciente): void {
    this.pacienteUnidadAtencion = paciente;
    this.mostrarModalUnidadAtencion = true;
    this.atencion.emit(paciente);
  }

  cerrarModalUnidadAtencion(): void {
    this.mostrarModalUnidadAtencion = false;
    this.pacienteUnidadAtencion = null;
  }
//A qui estaremos trabajando
  onGuardarUnidadAtencion(datosUnidadAtencion: any): void {
    // Aquí iría la lógica para guardar la unidad de atención
    console.log('Guardando unidad de atención:', datosUnidadAtencion);
    this.Service.create('units',datosUnidadAtencion).subscribe({
      next:()=>{
          alert('Unidad creado correctamente');
      },
        error: (err) => console.error('Error al crear', err)
    });
    alert('Unidad de atención guardada exitosamente');
    this.cerrarModalUnidadAtencion();
  }
onUpdate(datosUnidadAtencion: any): void {
  if (!datosUnidadAtencion.id) {
    console.error("No se recibió el id de la unidad a actualizar");
    return;
  }

  this.Service.update(`units`,datosUnidadAtencion.id, datosUnidadAtencion).subscribe({
    next: () => {
      alert('Unidad de atención actualizada exitosamente');
      this.cerrarModalUnidadAtencion();
    },
    error: (err) => {
      console.error('Error actualizando unidad:', err);
      alert('Ocurrió un error al actualizar.');
    }
  });
}
OnDelete(id:number): void{
  if (!id) {
    console.error("No se recibió el id de la unidad a actualizar");
    return;
  }
  this.Service.delete('units',id).subscribe({
    next:()=>{
      alert('Paciente eliminado correctamente');
    }
  })
}
  // Métodos de acciones de pacientes
  editarPaciente(paciente: Paciente): void {
    this.pacienteEditando = paciente;
    this.mostrarModal = true;
    this.editar.emit(paciente);
  }

eliminarPaciente(paciente: Paciente): void {
  if (confirm(`¿Estás seguro de que quieres eliminar a ${paciente.nombre} ${paciente.apellidos}?`)) {
    this.Service.delete('patients', paciente.id).subscribe({
      next: () => {
        alert('Paciente eliminado correctamente');

        // 🔥 SOLUCIÓN: eliminarlo de la lista local
        this.pacientes = this.pacientes.filter(p => p.id !== paciente.id);
        this.pacientesFiltrados = this.pacientesFiltrados.filter(p => p.id !== paciente.id);
      },
      error: (err) => {
        console.error('Error al eliminar paciente:', err);
        alert('Ocurrió un error al eliminar el paciente.');
      }
    });
  }
}

verHistorial(paciente: Paciente): void {
  this.router.navigate(['/fisio/historial',paciente.id], {
    state: { paciente }
  });
}
  cargarPacientes() {
    console.log(this.id)
    this.Service.getById<any>('patients/list',this.id).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.pacientesFiltrados = data;
      },
      error: (err) => console.error('Error al cargar pacientes', err)
    });
  }
  onGuardarPaciente(): void {
    this.cargarPacientes();
    this.filtrarPacientes();
    this.cerrarModal();
  }
}