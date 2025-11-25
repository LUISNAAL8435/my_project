import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';

@Component({
  selector: 'app-agenda-fisio',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidationActionsComponent],
  templateUrl: './agenda-fisio.component.html',
  styleUrls: ['./agenda-fisio.component.scss']
})
export class AgendaFisioComponent implements OnInit {
  selectedDate: Date | null = null;
  id: number = 0;
  selectHora: string = '';
  contenedor = 0;
  mes: string = '';
  selecOptin: any = null;
  datos: any[] = [];
  agendaa: any[] = [];
  citasFiltradas: any[] = [];
  uidd: string = '';
  botonVerificar: string = 'white';
  selectedDay: number = 0;
  selectedMonth: number = 0;
  selectedYear: number = 0;
  estado1: boolean = false;
  pacientes: any[] = [];
  
  filtroEstado: string = '';
  filtroPaciente: string = '';

  showEditModal: boolean = false;
  citaEditada: any = {};
  citaOriginal: any = {};
  agendas: any[] = [];

  // Variables para confirmaciones
  showAddConfirmation: boolean = false;
  showDeleteConfirmation: boolean = false;
  showUpdateConfirmation: boolean = false;
  nuevaCitaData: any = null;
  citaAEliminar: any = null;
  citaAActualizar: any = null;

  horas: string[] = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  constructor(private auth: AuthService, private Service: GenericServiceService, private route: ActivatedRoute) {}

  async ngOnInit() {
    const userId = this.auth.userId;
    
    if (!userId) {
      alert("No hay usuario logueado");
      return;
    } else {
      this.id = userId;
    }
    this.buscarPaciente(this.id);
    this.getAgenda(this.id);
  }

  getAgenda(id: number) {
    this.Service.getById<any>("ScheduleAppointments", this.id).subscribe({
      next: (data) => {
        this.agendas = data;
        this.citasFiltradas = data;
      },
      error: () => alert('Error al cargar la agenda')
    });
  }

  aplicarFiltros() {
    this.citasFiltradas = this.agendas.filter(cita => {
      let coincideEstado = true;
      if (this.filtroEstado) {
        coincideEstado = cita.estado_cita === this.filtroEstado;
      }
      
      let coincidePaciente = true;
      if (this.filtroPaciente) {
        coincidePaciente = cita.paciente.toLowerCase().includes(this.filtroPaciente.toLowerCase());
      }
      
      return coincideEstado && coincidePaciente;
    });
  }

  buscarPaciente(id: number) {
    this.Service.getById<any>('patients/list', id).subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: () => alert('Error al cargar pacientes')
    });
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

  // AGREGAR CITA - CONFIRMACIÓN
  agregar() {
    if (!this.selectedDate || !this.selecOptin || !this.selectHora) {
      return;
    }

    const fechaIso = new Date(this.selectedDate).toISOString().split("T")[0];

    this.nuevaCitaData = {
      paciente_id: this.selecOptin.id,
      fisio_id: this.id,
      fecha_cita: fechaIso,
      hora_cita: this.selectHora,
      paciente: `${this.selecOptin.nombre} ${this.selecOptin.apellidos}`,
      estado_cita: 'pendiente'
    };

    this.showAddConfirmation = true;
  }

  // CONFIRMAR AGREGAR CITA
  confirmarAgregarCita() {
    this.Service.create("ScheduleAppointments", this.nuevaCitaData).subscribe({
      next: () => {
        this.getAgenda(this.id);
        this.limpiarFormulario();
        this.cancelarAgregarCita();
      },
      error: () => alert('Error al crear la cita')
    });
  }

  // CANCELAR AGREGAR CITA
  cancelarAgregarCita() {
    this.showAddConfirmation = false;
    this.nuevaCitaData = null;
  }

  // ELIMINAR CITA - CONFIRMACIÓN
  eliminarAgenda(cita: any) {
    this.citaAEliminar = cita;
    this.showDeleteConfirmation = true;
  }

  // CONFIRMAR ELIMINACIÓN
  confirmarEliminacionCita() {
    this.Service.delete(`ScheduleAppointments`, this.citaAEliminar.id).subscribe({
      next: () => {
        this.getAgenda(this.id);
        this.cancelarEliminacionCita();
      },
      error: () => alert('Error al eliminar la cita')
    });
  }

  // CANCELAR ELIMINACIÓN
  cancelarEliminacionCita() {
    this.showDeleteConfirmation = false;
    this.citaAEliminar = null;
  }

  // ABRIR MODAL DE EDICIÓN
  abrirModalEdicion(cita: any) {
    this.citaOriginal = { ...cita };
    this.citaEditada = {
      id: cita.id,
      nombre: cita.paciente,
      fecha: cita.fecha_cita,
      hora: cita.hora_cita,
      estado: cita.estado_cita
    };
    this.showEditModal = true;
  }

  // CONFIRMAR EDICIÓN (abre modal de confirmación)
  confirmarEdicion() {
    if (!this.citaEditada.fecha || !this.citaEditada.nombre || !this.citaEditada.hora) {
      return;
    }
    this.citaAActualizar = { ...this.citaEditada };
    this.showUpdateConfirmation = true;
  }

  // CONFIRMAR ACTUALIZACIÓN (ejecuta la actualización)
  confirmarActualizacionCita() {
    const fechaIso = new Date(this.citaEditada.fecha).toISOString().split("T")[0];

    const payload = {
      paciente_id: this.citaOriginal.paciente_id,
      fisio_id: this.id,
      fecha_cita: fechaIso,
      hora_cita: this.citaEditada.hora,
      paciente: this.citaEditada.nombre,
      estado_cita: this.citaEditada.estado
    };

    this.Service.update(`ScheduleAppointments`, this.citaEditada.id, payload).subscribe({
      next: () => {
        this.getAgenda(this.id);
        this.showEditModal = false;
        this.cancelarActualizacionCita();
      },
      error: () => alert('Error al actualizar la cita')
    });
  }

  // CANCELAR ACTUALIZACIÓN
  cancelarActualizacionCita() {
    this.showUpdateConfirmation = false;
    this.citaAActualizar = null;
  }

  // CANCELAR EDICIÓN
  cancelarEdicion() {
    this.showEditModal = false;
    this.citaEditada = {};
    this.citaOriginal = {};
  }

  // LIMPIAR FORMULARIO
  limpiarFormulario() {
    this.selecOptin = null;
    this.selectHora = '';
    this.selectedDate = null;
  }

  formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

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