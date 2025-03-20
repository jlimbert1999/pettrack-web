import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { user } from '../../infrastructure';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/owners-portal`;
  private _user = signal<user | null>(null);
  user = computed(() => this._user());

  login(form: Object) {
    return this.http
      .post<{ token: string }>(`${this.url}/auth`, form)
      .pipe(map(({ token }) => this.setAuthentication(token)));
  }

  logout() {
    localStorage.removeItem('token');
    this._user.set(null);
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<user>(`${this.url}/auth`, { headers }).pipe(
      tap((resp) => this._user.set(resp)),
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  private setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }
}
