import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() citasRealizadas: Cita[] = [];
  @Input() citasVencidas: Cita[] = [];

  // Datos de ejemplo para demostración
  citasRealizas: Cita[] = [];
  citasVencidasList: Cita[] = [];

  constructor() {}

  ngOnInit(): void {
    // Usar los datos de entrada o los de ejemplo
    this.citasRealizas = this.citasRealizadas.length > 0 ? this.citasRealizadas : this.getCitasRealizadasEjemplo();
    this.citasVencidasList = this.citasVencidas.length > 0 ? this.citasVencidas : this.getCitasVencidasEjemplo();
  }

  // Métodos para datos de ejemplo (solo para desarrollo/demo)
  private getCitasRealizadasEjemplo(): Cita[] {
    return [
      {
        id: '1',
        nombre: 'Juan Pérez García',
        fecha: new Date('2024-01-15'),
        hora: '10:00 AM',
        estado: true
      },
      {
        id: '2', 
        nombre: 'María López Hernández',
        fecha: new Date('2024-01-14'),
        hora: '11:30 AM',
        estado: true
      }
    ];
  }

  private getCitasVencidasEjemplo(): Cita[] {
    return [
      {
        id: '3',
        nombre: 'Carlos Rodríguez',
        fecha: new Date('2024-01-10'),
        hora: '09:00 AM',
        estado: false
      }
    ];
  }

  // Métodos de utilidad para el template
  tieneCitasRealizadas(): boolean {
    return this.citasRealizas.length > 0;
  }

  tieneCitasVencidas(): boolean {
    return this.citasVencidasList.length > 0;
  }
}