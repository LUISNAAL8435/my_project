import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarPacienteComponent } from '../agregar-paciente/agregar-paciente.component';
import { UniAtencionComponent } from '../uni-atencion/uni-atencion.component';

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
  imports: [CommonModule, FormsModule, AgregarPacienteComponent, UniAtencionComponent],
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  @Output() editar = new EventEmitter<Paciente>();
  @Output() eliminar = new EventEmitter<Paciente>();
  @Output() historial = new EventEmitter<Paciente>();
  @Output() atencion = new EventEmitter<Paciente>();

  // Variables para búsqueda
  terminoBusqueda: string = '';
  pacientesFiltrados: Paciente[] = [];

  // Variables para modales
  mostrarModal = false;
  mostrarModalUnidadAtencion = false;
  pacienteEditando: Paciente | null = null;
  pacienteUnidadAtencion: Paciente | null = null;

  // Lista completa de pacientes
  pacientes: Paciente[] = [
    {
      nombre: 'Guadalupe de los Ángeles María Victoria',
      apellidos: 'Huchim Morales',
      folio: 'F-081',
      genero: 'Femenino',
      icono: 'female',
      color: 'text-pink-600',
      fechaRegistro: new Date('2024-01-15'),
      telefono: '555-1234'
    },
    {
      nombre: 'Guadalupe',
      apellidos: 'Morales',
      folio: 'F-082',
      genero: 'Femenino',
      icono: 'female',
      color: 'text-pink-600',
      fechaRegistro: new Date('2024-01-16'),
      telefono: '555-5678'
    },
    {
      nombre: 'Carlos',
      apellidos: 'Rodríguez Pérez',
      folio: 'F-083',
      genero: 'Masculino',
      icono: 'male',
      color: 'text-blue-600',
      fechaRegistro: new Date('2024-01-17'),
      telefono: '555-9012'
    },
    {
      nombre: 'Ana María',
      apellidos: 'Gutiérrez López',
      folio: 'F-084',
      genero: 'Femenino',
      icono: 'female',
      color: 'text-pink-600',
      fechaRegistro: new Date('2024-01-18'),
      telefono: '555-3456'
    },
    {
      nombre: 'Roberto',
      apellidos: 'Silva Mendoza',
      folio: 'F-085',
      genero: 'Masculino',
      icono: 'male',
      color: 'text-blue-600',
      fechaRegistro: new Date('2024-01-19'),
      telefono: '555-7890'
    }
  ];

  constructor() {
    this.pacientesFiltrados = [...this.pacientes];
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

  onGuardarUnidadAtencion(datosUnidadAtencion: any): void {
    // Aquí iría la lógica para guardar la unidad de atención
    console.log('Guardando unidad de atención:', datosUnidadAtencion);
    alert('Unidad de atención guardada exitosamente');
    this.cerrarModalUnidadAtencion();
  }

  // Métodos de acciones de pacientes
  editarPaciente(paciente: Paciente): void {
    this.pacienteEditando = paciente;
    this.mostrarModal = true;
    this.editar.emit(paciente);
  }

  eliminarPaciente(paciente: Paciente): void {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${paciente.nombre} ${paciente.apellidos}?`)) {
      this.pacientes = this.pacientes.filter(p => p.folio !== paciente.folio);
      this.filtrarPacientes();
      this.eliminar.emit(paciente);
    }
  }

  verHistorial(paciente: Paciente): void {
    this.historial.emit(paciente);
  }

  onGuardarPaciente(datosPaciente: any): void {
    if (this.pacienteEditando) {
      const index = this.pacientes.findIndex(p => p.folio === this.pacienteEditando?.folio);
      if (index !== -1) {
        this.pacientes[index] = { ...this.pacientes[index], ...datosPaciente };
      }
    } else {
      const nuevoPaciente: Paciente = {
        ...datosPaciente,
        folio: `F-${String(this.pacientes.length + 81).padStart(3, '0')}`,
        icono: datosPaciente.genero === 'Femenino' ? 'female' : 'male',
        color: datosPaciente.genero === 'Femenino' ? 'text-pink-600' : 'text-blue-600',
        fechaRegistro: new Date()
      };
      this.pacientes.unshift(nuevoPaciente);
    }
    
    this.filtrarPacientes();
    this.cerrarModal();
  }
}