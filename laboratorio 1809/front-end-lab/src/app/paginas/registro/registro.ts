import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <-- Este módulo habilita <mat-select> y <mat-option>

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule // <-- Debe estar declarado aquí
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private http = inject(HttpClient);
  private router = inject(Router);

  nombre = '';
  email = '';
  clave = '';
  rol_id = 2; 
  errorMensaje = '';

  registrar() {
    const payload = {
      nombre: this.nombre,
      email: this.email,
      clave: this.clave,
      password: this.clave, 
      contrasena: this.clave,
      rol_id: this.rol_id
    };

    this.http.post<any>('/api/auth/registrar', payload).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.errorMensaje = err.error?.message || 'Error al crear la cuenta. Intenta con otro correo.'
    });
  }
}