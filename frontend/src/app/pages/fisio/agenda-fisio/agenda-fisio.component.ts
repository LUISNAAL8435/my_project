import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda-fisio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-fisio.component.html',
  styleUrls: ['./agenda-fisio.component.scss']
})
export class AgendaFisioComponent implements OnInit {
  selectedDate: Date | null = null;
  selectHora: string = '';
  contenedor = 0;
  mes: string = '';
  selecOptin: string = '';
  datos: any[] = [];
  agendaa: any[] = [];
  citasFiltradas: any[] = [];
  uidd: string = '';
  botonVerificar: string = 'white';
  selectedDay: number = 0;
  selectedMonth: number = 0;
  selectedYear: number = 0;
  estado1: boolean = false;
  
  // Variables para filtros
  filtroEstado: string = '';
  filtroPaciente: string = '';

  // Variables para el modal de edición
  showEditModal: boolean = false;
  citaEditada: any = {};
  citaOriginal: any = {};

  horas: string[] = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  constructor() {}

  async ngOnInit() {
    this.buscarPaciente();
    this.getAgenda();
  }

  getAgenda() {
    // Datos actualizados con nuevos estados
    this.agendaa = [
      {
        id: '1',
        nombre: 'Juan Pérez García',
        fecha: new Date('2024-12-15'),
        hora: '10:00 - 11:00',
        estado: 'confirmada'
      },
      {
        id: '2', 
        nombre: 'María López Hernández',
        fecha: new Date('2024-12-16'),
        hora: '15:00 - 16:00',
        estado: 'pendiente'
      },
      {
        id: '3', 
        nombre: 'Carlos Rodríguez Martínez',
        fecha: new Date('2024-12-16'),
        hora: '16:00 - 17:00',
        estado: 'cancelada'
      },
      {
        id: '4', 
        nombre: 'Ana García Silva',
        fecha: new Date('2024-12-17'),
        hora: '9:00 - 10:00',
        estado: 'no-presentado'
      },
      {
        id: '5', 
        nombre: 'Pedro Sánchez Ruiz',
        fecha: new Date('2024-12-17'),
        hora: '11:00 - 12:00',
        estado: 'pendiente'
      }
    ];
    
    // Inicializar las citas filtradas con todas las citas
    this.citasFiltradas = [...this.agendaa];
  }

  // Método para aplicar filtros ACTUALIZADO
  aplicarFiltros() {
    this.citasFiltradas = this.agendaa.filter(cita => {
      // Filtro por estado
      let coincideEstado = true;
      if (this.filtroEstado) {
        coincideEstado = cita.estado === this.filtroEstado;
      }
      
      // Filtro por paciente
      let coincidePaciente = true;
      if (this.filtroPaciente) {
        coincidePaciente = cita.nombre.toLowerCase().includes(this.filtroPaciente.toLowerCase());
      }
      
      return coincideEstado && coincidePaciente;
    });
  }

  buscarPaciente() {
    this.datos = [
      {
        id: '1',
        nombres: 'Juan',
        apellidos: 'Pérez García'
      },
      {
        id: '2',
        nombres: 'María',
        apellidos: 'López Hernández'
      },
      {
        id: '3',
        nombres: 'Carlos',
        apellidos: 'Rodríguez Martínez'
      }
    ];
  }

  onDateChange(event: any) {
    const dateValue = event.target.value;
    
    if (dateValue) {
      const [year, month, day] = dateValue.split('-');
      this.selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      this.selectedDate = null;
    }
    
    if (this.selectedDate !== null && !isNaN(this.selectedDate.getTime())) {
      this.selectedDay = this.selectedDate.getDate();
      this.selectedMonth = this.selectedDate.getMonth() + 1;
      this.selectedYear = this.selectedDate.getFullYear();
      this.contenedor = 1;
    }
  }

  agregar() {
    if (!this.selectedDate || !this.selecOptin || !this.selectHora) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Nueva cita con estado por defecto "pendiente"
    const nuevaCita = {
      id: Date.now().toString(),
      nombre: this.selecOptin,
      fecha: new Date(this.selectedDate),
      hora: this.selectHora,
      estado: 'pendiente' // Estado por defecto
    };

    this.agendaa.unshift(nuevaCita);
    
    // Actualizar las citas filtradas
    this.aplicarFiltros();
    
    // Limpiar formulario
    this.selecOptin = '';
    this.selectHora = '';
    this.selectedDate = null;
    
    alert('Cita agendada exitosamente');
  }

  eliminarAgenda(id: string) {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (confirmacion) {
      this.agendaa = this.agendaa.filter(agenda => agenda.id !== id);
      this.aplicarFiltros();
      console.log('Cita eliminada:', id);
    }
  }

  // Métodos para el modal de edición
  abrirModalEdicion(cita: any) {
    this.citaOriginal = { ...cita };
    this.citaEditada = {
      id: cita.id,
      nombre: cita.nombre,
      fecha: this.formatDateForInput(cita.fecha),
      hora: cita.hora,
      estado: cita.estado
    };
    this.showEditModal = true;
  }

  guardarEdicion() {
    if (!this.citaEditada.fecha || !this.citaEditada.nombre || !this.citaEditada.hora) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Encontrar y actualizar la cita en el array
    const index = this.agendaa.findIndex(cita => cita.id === this.citaEditada.id);
    if (index !== -1) {
      this.agendaa[index] = {
        ...this.agendaa[index],
        nombre: this.citaEditada.nombre,
        fecha: new Date(this.citaEditada.fecha),
        hora: this.citaEditada.hora,
        estado: this.citaEditada.estado
      };
      
      this.aplicarFiltros();
      this.showEditModal = false;
      alert('Cita actualizada exitosamente');
    }
  }

  cancelarEdicion() {
    this.showEditModal = false;
    this.citaEditada = {};
    this.citaOriginal = {};
  }

  // Helper para formatear fecha para input date
  formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Pipe personalizado para fecha en español
  formatDateSpanish(date: Date): string {
    if (!date || isNaN(date.getTime())) return 'Selecciona una fecha';
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
  }
}