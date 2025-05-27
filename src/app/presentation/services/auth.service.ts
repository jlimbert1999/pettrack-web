import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { user } from '../../infrastructure';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `${environment.apiUrl}/owners-portal`;
  private http = inject(HttpClient);
  private _user = signal<user | null>(null);
  user = computed(() => this._user());

  private _fullname = signal<string | null>(null);
  fullname = computed(() => this._fullname());
  avatarLetter = computed(() =>
    this._fullname()?.trim()?.charAt(0).toUpperCase()
  );

  constructor() {
    this._fullname.set(localStorage.getItem('fullname'));
  }

  login(form: Object) {
    return this.http
      .post<{ token: string; fullname: string }>(`${this.url}/auth`, form)
      .pipe(
        map(({ token, fullname }) => this.setAuthentication(token, fullname))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    this._user.set(null);
    this._fullname.set(null);
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.http.get<user>(`${this.url}/auth`).pipe(
      tap((resp) => this._user.set(resp)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  private setAuthentication(token: string, fullname: string): boolean {
    localStorage.setItem('token', token);
    localStorage.setItem('fullname', fullname);
    this._fullname.set(fullname);
    return true;
  }
}
