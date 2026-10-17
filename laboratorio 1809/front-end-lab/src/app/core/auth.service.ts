import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Verifica si hay un token guardado (sesión iniciada)
  autenticado(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  // Verifica si el usuario logueado es Administrador (rol_id === 1)
  esAdmin(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Desencripta la información (payload) del token JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol_id === 1; // 1 = Admin, 2 = Usuario
    } catch (e) {
      return false;
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Expulsa al login
    }
  }
}