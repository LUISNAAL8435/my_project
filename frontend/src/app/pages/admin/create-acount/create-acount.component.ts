import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { Fisio } from '../../../core/interfaces/fisio/patients.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-acount',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './create-acount.component.html',
  styleUrl: './create-acount.component.scss'
})
export class CreateAcountComponent implements OnInit {
 form!: FormGroup;
  verPassword: boolean = false;

  constructor(private fb: FormBuilder,private Service:GenericServiceService,private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      gmail: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['admin']
    });
  }
login(){
 this.router.navigate([''])
}
  togglePassword() {
    this.verPassword = !this.verPassword;
  }

  enviar() {
    if (this.form.valid) {
      const user: Fisio = this.form.value;
      this.Service.create('user',user).subscribe({
        next:()=>{
          alert('Admin creado')
          this.router.navigate([''])
        },
        error: (err) => console.error('Error al crear', err)
      })
    }


  }
}
