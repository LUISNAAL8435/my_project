import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-agenda-fisio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-fisio.component.html',
  styleUrls: ['./agenda-fisio.component.scss']
})
export class AgendaFisioComponent implements OnInit {
  selectedDate: Date | null = null;
  id:number=0;
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
  // Variables para filtros
  filtroEstado: string = '';
  filtroPaciente: string = '';

  // Variables para el modal de edición
  showEditModal: boolean = false;
  citaEditada: any = {};
  citaOriginal: any = {};
  agendas: any[] = [];

  horas: string[] = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  constructor(private auth:AuthService,private Service:GenericServiceService,private route: ActivatedRoute) {}

  async ngOnInit() {
  const userId = this.auth.userId;
  
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }else{
    this.id=userId;
  }
    this.buscarPaciente(this.id);
    this.getAgenda(this.id);
  }

  getAgenda(id:number) {
   this.Service.getById<any>("ScheduleAppointments",this.id).subscribe({
    next:(data)=>{
      this.agendas=data;
      this.citasFiltradas=data;
    }
   })
  }

  // Método para aplicar filtros ACTUALIZADO
  aplicarFiltros() {
    this.citasFiltradas = this.agendas.filter(cita => {
      // Filtro por estado
      let coincideEstado = true;
      if (this.filtroEstado) {
        coincideEstado = cita.estado === this.filtroEstado;
      }
      
      // Filtro por paciente
      let coincidePaciente = true;
      if (this.filtroPaciente) {
        coincidePaciente = cita.paciente.toLowerCase().includes(this.filtroPaciente.toLowerCase());
      }
      
      return coincideEstado && coincidePaciente;
    });
  }

  buscarPaciente(id:number) {
    this.Service.getById<any>('patients/list',id).subscribe({
      next: (data) => {
        this.pacientes = data;

      },
      error: (err) => console.error('Error al cargar pacientes', err)
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

  agregar() {
    if (!this.selectedDate || !this.selecOptin || !this.selectHora) {
      alert('Por favor completa todos los campos');
      return;
    }
    const fechaIso = new Date( this.selectedDate).toISOString().split("T")[0];

    // Nueva cita con estado por defecto "pendiente"
    const nuevaCita = {
      paciente_id: this.selecOptin.id,
      fisio_id:this.id,
      fecha_cita: fechaIso,
      hora_cita: this.selectHora,
      paciente:  `${this.selecOptin.nombre} ${this.selecOptin.apellidos}`,
      estado_cita: 'pendiente' // Estado por defecto
    };
    console.log("JSON enviado:", nuevaCita);
    this.Service.create("ScheduleAppointments",nuevaCita).subscribe({
      next:()=>{
        alert('Agenda creada correctamente')
        this.getAgenda(this.id);
      }
    })
    
    // Actualizar las citas filtradas
    this.aplicarFiltros();
    // Limpiar formulario
    this.selecOptin = '';
    this.selectHora = '';
    this.selectedDate = null;
  }

  eliminarAgenda(id: string) {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (confirmacion) {
      this.Service.delete(`ScheduleAppointments`,id).subscribe({
        next:()=>{
          alert('Agenda eliminada');
          this.getAgenda(this.id);
        },
        error:(err)=>{
          alert('Ocurrió un error al eliminar el paciente.');
        }
      })
    }
  }

  // Métodos para el modal de edición
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

guardarEdicion() {
  if (!this.citaEditada.fecha || !this.citaEditada.nombre || !this.citaEditada.hora) {
    alert('Por favor completa todos los campos');
    return;
  }

  const fechaIso = new Date(this.citaEditada.fecha).toISOString().split("T")[0];

  // JSON EXACTO que espera tu endpoint AgendaCreate
  const payload = {
    paciente_id: this.citaOriginal.paciente_id,  // EL PACIENTE REAL
    fisio_id: this.id,
    fecha_cita: fechaIso,
    hora_cita: this.citaEditada.hora,
    paciente: this.citaEditada.nombre,
    estado_cita: this.citaEditada.estado
  };

  console.log("JSON enviado (UPDATE):", payload);

  // IMPORTANTE: enviar el ID de la cita a actualizar
  this.Service.update(`ScheduleAppointments`,this.citaEditada.id, payload).subscribe({
    next: () => {
      alert('Cita actualizada correctamente');
      this.getAgenda(this.id);        // recarga la lista
      this.showEditModal = false;
    },
    error: (err) => {
      console.error("Error al actualizar:", err);
      alert("Error al actualizar la cita");
    }
  });
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