import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // Aquí declaramos las variables que faltaban
  id: string | null = null;
  estudiante: any = { nombre: '', apellido: '', email: '', carrera: '', edad: null };
  errorMensaje = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // Carga los datos si estamos editando
      this.http.get<any>('/api/estudiante/' + this.id).subscribe(res => {
        this.estudiante = res;
      });
    }
  }

  guardar() {

    if (this.id) {
      this.http.put('/api/estudiante/' + this.id, this.estudiante).subscribe({
        next: () => this.router.navigate(['/estudiantes']),
        error: (err) => this.errorMensaje = err.error?.message || 'Error al editar'
      });
    } else {
   
      this.http.post('/api/estudiante', this.estudiante).subscribe({
        next: () => this.router.navigate(['/estudiantes']),
        error: (err) => this.errorMensaje = err.error?.message || 'Error al crear'
      });
    }
  }

  cancelar() {
    this.router.navigate(['/estudiantes']);
  }
}
