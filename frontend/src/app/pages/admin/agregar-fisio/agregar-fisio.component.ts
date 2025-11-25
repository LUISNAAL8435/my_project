import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Fisio } from '../../../core/interfaces/fisio/patients.models';
import { ValidationActionsComponent } from '../../../shared/components/validation-actions/validation-actions.component';

@Component({
  selector: 'app-agregar-fisio',
  imports: [CommonModule, ReactiveFormsModule, ValidationActionsComponent],
  templateUrl: './agregar-fisio.component.html',
  styleUrl: './agregar-fisio.component.scss'
})
export class AgregarFisioComponent implements OnInit, OnChanges {
  formulario!: FormGroup;
  @Input() fisio: any = null;
  @Input() id: number = 0;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  modoEdicion: boolean = false;

  // Modal de guardar/actualizar
  showSaveConfirmation: boolean = false;

  constructor(private fb: FormBuilder, private Service: GenericServiceService) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fisio'] || changes['id']) {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.formulario = this.crearFormulario();
    
    if (this.fisio) {
      this.modoEdicion = true;
      this.cargarDatosFisio();
    } else {
      this.modoEdicion = false;
      this.limpiarFormulario();
    }
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      admin_id: [this.id, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.minLength(6)]],
      rol: ['fisio']
    });
  }

  limpiarFormulario() {
    this.formulario.reset({
      admin_id: this.id,
      nombre: '',
      apellidos: '',
      gmail: '',
      genero: '',
      telefono: '',
      password: '',
      rol: 'fisio'
    });
  }

  solicitarGuardar(): void {
    if (this.formulario.valid) {
      if (!this.modoEdicion && !this.formulario.get('password')?.value) {
        this.formulario.get('password')?.setErrors({ 'required': true });
        return;
      }
      this.showSaveConfirmation = true;
    } else {
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }

  confirmarGuardar(): void {
    const user: Fisio = { ...this.formulario.value };

    if (this.modoEdicion && (!user.password || user.password.trim() === '')) {
      delete user.password;
    }

    if (this.modoEdicion) {
      this.Service.update<any>('user', this.fisio.id, user).subscribe({
        next: () => {
          this.guardar.emit();
          this.showSaveConfirmation = false;
        }
      });
    } else {
      this.Service.create('user', user).subscribe({
        next: () => {
          this.guardar.emit();
          this.showSaveConfirmation = false;
        }
      });
    }
  }

  cancelarGuardar(): void {
    this.showSaveConfirmation = false;
  }

  cargarDatosFisio() {
    this.formulario.patchValue({
      admin_id: this.fisio.admin_id,
      nombre: this.fisio.nombre,
      apellidos: this.fisio.apellidos,
      gmail: this.fisio.gmail,
      genero: this.fisio.genero,
      telefono: this.fisio.telefono,
      rol: this.fisio.rol,
      password: '' 
    });
  }

  onCancelar(): void {
    this.cancelar.emit();
  }
}