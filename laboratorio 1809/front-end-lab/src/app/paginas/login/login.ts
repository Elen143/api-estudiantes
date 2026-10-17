import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  clave = '';
  errorMensaje = '';

  iniciarSesion() {
    // Enviamos todas las variantes de la contraseña para evitar el error del backend
    const payload = {
      email: this.email,
      clave: this.clave,
      password: this.clave,
      contrasena: this.clave
    };

    this.http.post<any>('/api/auth/login', payload).subscribe({
      next: (res) => {
        if (res.token) {
          // Guardamos el token de seguridad en el navegador
          localStorage.setItem('token', res.token);
          // Redirigimos a la tabla de estudiantes
          this.router.navigate(['/estudiantes']);
        }
      },
      error: (err) => {
        this.errorMensaje = err.error?.message || 'Error al iniciar sesión. Revisa tus datos.';
        console.error('Detalle del error:', err);
      }
    });
  }
}