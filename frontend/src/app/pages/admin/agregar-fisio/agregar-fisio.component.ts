import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Fisio } from '../../../core/interfaces/fisio/patients.models';

@Component({
  selector: 'app-agregar-fisio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-fisio.component.html',
  styleUrl: './agregar-fisio.component.scss'
})
export class AgregarFisioComponent implements OnInit {
    formulario!: FormGroup;
    @Input() fisio: any = null;
    @Input() id:number=0;
    @Output() guardar = new EventEmitter<any>();
    @Output() cancelar = new EventEmitter<void>();
   modoEdicion: boolean = false;
    constructor(private fb: FormBuilder, private Service:GenericServiceService) {
  }
  ngOnInit() {
    this.formulario = this.crearFormulario();
    if (this.fisio) {
      this.modoEdicion = true;
      this.cargarDatosPaciente();
          this.formulario.get('password')?.clearValidators();
          this.formulario.get('password')?.updateValueAndValidity();
    }
  }
    crearFormulario(): FormGroup {
    return this.fb.group({
      admin_id:[this.id, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]],
      genero:['', Validators.required],
      telefono:['',[Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['fisio']
    });
  }
   onGuardar(): void {
    if (this.formulario.valid) {
      const user: Fisio = this.formulario.value;
  
      if (this.modoEdicion) {
      // ❗ No enviar password si está vacío
      if (!user.password || user.password.trim() === '') {
        delete user.password;
      }
      console.log("modoEdicion:", user);
        this.Service.update<any>('user', this.fisio.id, user).subscribe({
          next: () => {
            alert('Fisio actualizado correctamente');
            this.guardar.emit(); // ✅ solo notifica
          },
          error: (err) => console.error('Error al actualizar', err)
        });
      } else {
        this.Service.create('user', user).subscribe({
          next: () => {
            alert('Fisio creado correctamente');
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
      cargarDatosPaciente() {
    // Mapear los datos del paciente al formulario
    this.formulario.patchValue({
      admin_id: this.fisio.admin_id,
      nombre:this.fisio.nombre,
      apellidos:this.fisio.apellidos,
      gmail: this.fisio.gmail,
      genero:this.fisio.genero,
      telefono:this.fisio.telefono,
      rol: this.fisio.rol
    });
  }
      onCancelar(): void {
    this.cancelar.emit();
  }
}
