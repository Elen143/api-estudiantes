import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private http = inject(HttpClient);

  listar() {
    return this.http.get<any[]>('/api/estudiante');
  }

  obtener(id: number | string) {
    return this.http.get<any>(`/api/estudiante/${id}`);
  }

  crear(estudiante: any) {
    return this.http.post('/api/estudiante', estudiante);
  }

  editar(id: number | string, estudiante: any) {
    return this.http.put(`/api/estudiante/${id}`, estudiante);
  }

  eliminar(id: number | string) {
    return this.http.delete(`/api/estudiante/${id}`);
  }
}