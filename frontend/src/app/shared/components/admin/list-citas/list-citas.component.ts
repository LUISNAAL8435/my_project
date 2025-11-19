import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service.service';
import { GenericServiceService } from '../../../../services/serviFisio/generic-service.service';
@Component({
  selector: 'app-list-citas',
  imports: [NgFor,CommonModule, FormsModule],
  templateUrl: './list-citas.component.html',
  styleUrl: './list-citas.component.scss'
})
export class ListCitasComponent implements OnInit {
    selectedDate: Date | null = null;
    selectedDay: number = 0;
    citasFiltradas: any[] = [];
    selectedMonth: number = 0;
    selectedYear: number = 0;
    citasRealizas:any[]=[];
    citasVencidasList:any[] = [];
    agendas: any[] = [];
    contenedor = 0;
    @Output() cancelar = new EventEmitter<void>();
    @Input() id:number=0;
    @Input() paciente: any = null;
  constructor(private Service:GenericServiceService) {}
async ngOnInit() {
  if (this.id==null) {
    console.warn("Paciente no recibido");
    return;
  }

  console.log("Paciente ID:", this.id);
  this.getAgenda(this.id);
  this.getCitasRealizadasEjemplo();
  this.getCitasVencidasEjemplo();
}
  private getCitasVencidasEjemplo(){
  this.Service.getById<any>("ScheduleAppointments",this.id).subscribe({
    next: (data) => {

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);  // Normalizar día

      this.citasVencidasList = data.filter((cita: any) => {

        const fechaCita = new Date(cita.fecha_cita);
        fechaCita.setHours(0, 0, 0, 0);

        // Cita vencida = fecha ya pasó
        return fechaCita < hoy && cita.estado_cita != "confirmada";
      });

      console.log("Citas vencidas:", this.citasVencidasList);
    },
    error: (err) => console.error(err)
  });
  }
private getCitasRealizadasEjemplo() {
  this.Service.getById<any>("ScheduleAppointments", this.id).subscribe({
    next: (data) => {

      // Filtrar solo las citas confirmadas
      this. citasRealizas = data.filter((cita: any) => cita.estado_cita === "confirmada");

      console.log("Citas realizadas:", this. citasRealizas);
    },
    error: (err) => console.error(err)
  });
}
    onCancelar(): void {
    this.cancelar.emit();
    }
  getAgenda(id:number) {
   this.Service.getById<any>("ScheduleAppointments",this.id).subscribe({
    next:(data)=>{
      this.agendas=data;
      this.citasFiltradas=data;
    }
   })
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
}
