import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Paciente } from '../../../core/interfaces/fisio/patients.models';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
@Component({
  selector: 'app-agregar-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.scss']
})
export class AgregarPacienteComponent implements OnInit {
  @Input() paciente: any = null; // Si es null = nuevo, si tiene datos = editar
  @Input() id:number=0;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  formulario!: FormGroup;
  modoEdicion: boolean = false;
  sexoSeleccionado: string = '';

  constructor(private fb: FormBuilder, private Service:GenericServiceService) {
  }

  ngOnInit() {
    console.error(this.id)
    this.formulario = this.crearFormulario();
      this.formulario.patchValue({ admin_id: this.id });
    if (this.paciente) {
      this.modoEdicion = true;
      this.cargarDatosPaciente();
    }
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      admin_id:[this.id],
      folio: ['', Validators.required],
      edad: ['', Validators.required],
      fecha_valoracion: [''],
      fecha_alta: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: [''],
      diagnostic_medic: [''],
      motivo_consulta: ['']
    });
  }
  

  cargarDatosPaciente() {
    // Mapear los datos del paciente al formulario
    this.formulario.patchValue({
      folio: this.paciente.folio,
      edad: this.paciente.edad,
      fecha_valoracion:this.paciente.fecha_valoracion,
      fecha_alta:this.paciente.fecha_alta,
      nombre: this.paciente.nombre,
      apellidos: this.paciente.apellidos,
      sexo: this.paciente.sexo === 'Femenino' ? 'Femenino' : 'Masculino',
      telefono:this.paciente.telefono,
      diagnostic_medic:this.paciente.diagnostic_medic,
      motivo_consulta:this.paciente.motivo_consulta
    });
    
    this.sexoSeleccionado = this.paciente.sexo === 'Femenino' ? 'Femenino' : 'Masculino';
  }

  seleccionarSexo(sexo: string) {
    this.sexoSeleccionado = sexo;
    this.formulario.patchValue({ sexo });
  }

  onGuardar(): void {
   if (this.formulario.valid) {
    const paciente: Paciente = this.formulario.value;
    if (!paciente.fecha_alta) {
      delete paciente.fecha_alta;
    }
    if (this.modoEdicion) {
      this.Service.update<any>('patients', this.paciente.id, paciente).subscribe({
        next: () => {
          alert('Paciente actualizado correctamente');
          this.guardar.emit(); // ✅ solo notifica
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.Service.create('patients', paciente).subscribe({
        next: () => {
          alert('Paciente creado correctamente');
          this.guardar.emit(); // ✅ solo notifica
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  } else {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.markAsTouched();
    });
  }
  }
  onCancelar(): void {
    this.cancelar.emit();
  }
}