import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericServiceService } from '../../../services/serviFisio/generic-service.service';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 form!: FormGroup;
  verPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Service:GenericServiceService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.verPassword = !this.verPassword;
  }

  entrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.Service.create<any>('auth/login',this.form.value).subscribe({
      next: (user) => {
        console.log('Usuario logueado:', user);
        this.auth.login(user);
        // Redirigir a perfil usando su id
        if(user.rol==='admin'){
        this.router.navigate(['/admin/homeAdmin']);
      }else{
        this.router.navigate(['/fisio'])
      }

      },
      error: (err) => alert('Gmail o contraseña incorrectos')
    });
  }

  crearCuenta() {
    this.router.navigate(['/create-account']);
  }
}
