import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { GenericServiceService } from '../../../../services/serviFisio/generic-service.service';


@Component({
  selector: 'app-pacientes-list',
  imports: [NgFor],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent implements OnInit {
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  @Input() id:number=0;
  @Output() cancelar = new EventEmitter<void>();

  constructor(private Service:GenericServiceService) {
    
  }
  ngOnInit(): void {
    this.cargarPacientes();
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
      onCancelar(): void {
    this.cancelar.emit();
    }
}
