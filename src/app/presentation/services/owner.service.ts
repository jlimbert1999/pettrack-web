import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { pet } from '../../infrastructure';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/owners-portal`;
  private _user = signal<any | null>(null);

  login(form: Object) {
    return this.http
      .post<{ token: string }>(`${this.url}/auth`, form)
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
      }>(`${this.url}/auth`, { headers })
      .pipe(
        tap((resp) => console.log(resp)),
        map(({ token }) => true),
        catchError(() => {
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._user.set(null);
  }

  getDetail(id: string) {
    return this.http.get(`${this.url}/detail/${id}`);
  }

  getPetTreatments(petId: string, category?: string) {
    return this.http.get<any[]>(`${this.url}/treatments/${petId}`);
  }

  getPets() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<pet[]>(`${this.url}/pets`, { headers })
      .pipe(
        map((resp) =>
          resp.map(({ image, ...props }) => ({ ...props, image: image?? 'images/no-image.png' }))
        )
      );
  }

  private _setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }
}
