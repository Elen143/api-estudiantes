import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista implements OnInit {
  private http = inject(HttpClient);
  authService = inject(AuthService); // Debe ser pública
  
  estudiantes = signal<any[]>([]);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>('/api/estudiante').subscribe(res => this.estudiantes.set(res));
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este estudiante?')) {
      this.http.delete('/api/estudiante/' + id).subscribe({
        next: () => this.cargar(), // Recarga la tabla silenciosamente
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
