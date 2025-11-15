import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../../fisio/logo/logo.component';// Ajusta la ruta según tu estructura

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // ← Debe apuntar a login.component.html
  imports: [FormsModule, LogoComponent]
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  nombre: string = '';
  rol: string = '';
  adminUid: string = '';

  // Credenciales genéricas para testing
  private readonly CREDENCIALES_VALIDAS = [
    { email: 'admin@fisiocenter.com', password: 'admin123', nombre: 'Administrador' },
    { email: 'fisio@fisiocenter.com', password: 'fisio123', nombre: 'Fisioterapeuta' },
    { email: 'usuario@fisiocenter.com', password: 'user123', nombre: 'Usuario' },
    { email: 'test@test.com', password: 'test', nombre: 'Usuario Test' }
  ];

  constructor(private router: Router) {}

  async iniciarSesion() {
    console.log('Intentando login con:', this.email, this.contrasena);
    
    // Validar credenciales genéricas
    const credencialValida = this.CREDENCIALES_VALIDAS.find(
      cred => cred.email === this.email && cred.password === this.contrasena
    );

    if (credencialValida) {
      // Login exitoso
      localStorage.setItem('emailUsuario', credencialValida.nombre);
      console.log('Login exitoso, redirigiendo al home...');
      this.router.navigate(['/home']);
    } else {
      // Login fallido
      console.log('Credenciales incorrectas');
      alert('Credenciales incorrectas. Usa: test@test.com / test');
    }
  }

  irArecuperar() {
    this.router.navigate(['recuperar']);
  }

  irAotrapagina() {
    this.router.navigate(['registro']);
  }

  // Método para autocompletar credenciales de prueba (opcional)
  autocompletarCredenciales(tipo: string) {
    switch(tipo) {
      case 'admin':
        this.email = 'admin@fisiocenter.com';
        this.contrasena = 'admin123';
        break;
      case 'fisio':
        this.email = 'fisio@fisiocenter.com';
        this.contrasena = 'fisio123';
        break;
      case 'test':
        this.email = 'test@test.com';
        this.contrasena = 'test';
        break;
    }
  }
}