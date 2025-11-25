import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';

@Component({
  selector: 'app-dashboard-fisio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-fisio.component.html',
  styleUrls: ['./dashboard-fisio.component.scss']
})
export class DashboardFisioComponent implements OnInit {
  fisioId: number;
  citasHoy: any[] = [];
  pacientes: any[] = [];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private genericService: GenericServiceService
  ) {
    this.fisioId = this.authService.userId!;
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    
    // Cargar citas del fisioterapeuta
    this.genericService.getAll(`ScheduleAppointments/${this.fisioId}`)
      .subscribe({
        next: (citas) => {
          this.citasHoy = citas;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error cargando citas:', error);
          this.checkLoadingComplete();
        }
      });

    // Cargar pacientes del fisioterapeuta  
    this.genericService.getAll(`patients/list/${this.fisioId}`)
      .subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error cargando pacientes:', error);
          this.checkLoadingComplete();
        }
      });
  }

  private checkLoadingComplete() {
    // Simular que ambas llamadas completaron
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  getCitasHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citasHoy.filter(cita => cita.fecha_cita === hoy);
  }

  getCitasHoyCount() {
    return this.getCitasHoy().length;
  }

  getProximasCitasCount() {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citasHoy.filter(cita => cita.fecha_cita > hoy).length;
  }

  getEstadoCitaClass(estado: string) {
    const classes: {[key: string]: string} = {
      'Confirmada': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelada': 'bg-red-100 text-red-800',
      'Completada': 'bg-blue-100 text-blue-800'
    };
    return classes[estado] || 'bg-gray-100 text-gray-800';
  }

  getHombresCount(): number {
  return this.pacientes.filter(p => p.sexo === 'Masculino' || p.sexo === 'Hombre').length;
}

getMujeresCount(): number {
  return this.pacientes.filter(p => p.sexo === 'Femenino' || p.sexo === 'Mujer').length;
}

getHombresPercentage(): number {
  if (this.pacientes.length === 0) return 0;
  return Math.round((this.getHombresCount() / this.pacientes.length) * 100);
}

getMujeresPercentage(): number {
  if (this.pacientes.length === 0) return 0;
  return Math.round((this.getMujeresCount() / this.pacientes.length) * 100);
}

}