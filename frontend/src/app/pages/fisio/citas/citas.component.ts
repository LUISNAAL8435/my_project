import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';

export interface Cita {
  id: string;
  nombre: string;
  fecha: Date;
  hora: string;
  estado?: boolean;
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  // Inputs para recibir datos desde el componente padre
id:number=0;
  private Service=inject(GenericServiceService)
  // Datos de ejemplo para demostración
  citasRealizas:any[]=[];
  citasVencidasList:any[] = [];

  constructor(private auth:AuthService,private route:ActivatedRoute) {}

  ngOnInit(): void {
  const userId = this.auth.userId;
  
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }else{
    this.id=userId;
  }
     this.getCitasRealizadasEjemplo();
     this.getCitasVencidasEjemplo();
  }

  // Métodos para datos de ejemplo (solo para desarrollo/demo)
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

  // Métodos de utilidad para el template
  tieneCitasRealizadas(): boolean {
    return this.citasRealizas.length > 0;
  }

  tieneCitasVencidas(): boolean {
    return this.citasVencidasList.length > 0;
  }
}