import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FormsModule, CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  username: string = '';
  datos: any[] = [];
  contenedor = 0;
  uidd: string = '';
  nombre: string = '';
  datosrecibid: any[] = [];
  public dato: any[] = [];
  idPaciente: string = '';

  constructor(
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  irEliminarCuneta() {
    console.log('Abrir diálogo eliminar cuenta');
  }

  irNotaRapida(datoss: any) {
    console.log('Abrir notas rápidas para:', datoss);
  }

  Mostrarcontenido(opcion: number) {
    this.contenedor = opcion;
  }

  async ngOnInit() {
    const email = localStorage.getItem('emailUsuario');
    this.username = email ?? 'Usuario Test';
    this.buscarPaciente();
  }

  buscarPaciente() {
    // Datos de ejemplo - solo 1 como pediste
    this.datos = [
      { id: '1', nombres: 'Juan', apellidos: 'Pérez', folio: '001' }
    ];
    
    if (this.nombre) {
      // Simular búsqueda
      console.log('Buscando:', this.nombre);
    }
  }

  editar(idd: string) {
    console.log('Editar paciente:', idd);
  }

  getDatosFisio() {
    console.log('Abrir registro de paciente');
  }

  eliminarPacientee(id: string) {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este paciente?');
    if (confirmacion) {
      console.log("Eliminando paciente:", id);
    }
  }

  verHistorial(id: string) {
    console.log('Ver historial del paciente:', id);
  }

  
}