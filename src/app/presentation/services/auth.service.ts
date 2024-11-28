import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/owners/auth`;
  private _user = signal<any | null>(null);
  constructor() {}

  login(form: Object) {
    return this.http
      .post<{ token: string }>(this.url, form)
      .pipe(map(({ token }) => this._setAuthentication(token)));
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{
        token: string;
      }>(this.url, { headers })
      .pipe(
        tap((resp) => console.log(resp)),
        map(({ token }) => {
          return this._setAuthentication(token);
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  private _setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this._user.set(null);
  }
}
