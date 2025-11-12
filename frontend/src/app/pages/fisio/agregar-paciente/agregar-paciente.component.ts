import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.scss']
})
export class AgregarPacienteComponent implements OnInit {
  @Input() paciente: any = null; // Si es null = nuevo, si tiene datos = editar
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;
  modoEdicion: boolean = false;
  sexoSeleccionado: string = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.crearFormulario();
  }

  ngOnInit() {
    if (this.paciente) {
      this.modoEdicion = true;
      this.cargarDatosPaciente();
    }
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      folio: ['', [Validators.required]],
      fechaValoracion: [''],
      fechaAlta: [''],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      telefono: [''],
      diagnostico: [''],
      motivoConsulta: ['']
    });
  }

  cargarDatosPaciente() {
    // Mapear los datos del paciente al formulario
    this.formulario.patchValue({
      folio: this.paciente.folio,
      nombres: this.paciente.nombre,
      apellidos: this.paciente.apellidos,
      sexo: this.paciente.genero === 'Femenino' ? 'Femenino' : 'Masculino'
    });
    
    this.sexoSeleccionado = this.paciente.genero === 'Femenino' ? 'Femenino' : 'Masculino';
  }

  seleccionarSexo(sexo: string) {
    this.sexoSeleccionado = sexo;
    this.formulario.patchValue({ sexo });
  }

  onGuardar(): void {
    if (this.formulario.valid) {
      const datosPaciente = {
        ...this.formulario.value,
        // Para mantener compatibilidad con la lista
        nombre: this.formulario.value.nombres,
        genero: this.formulario.value.sexo,
        icono: this.formulario.value.sexo === 'Femenino' ? 'female' : 'male',
        color: this.formulario.value.sexo === 'Femenino' ? 'text-pink-600' : 'text-blue-600',
        // Si está editando, mantener el ID original
        ...(this.modoEdicion && { id: this.paciente.id })
      };
      
      this.guardar.emit(datosPaciente);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}