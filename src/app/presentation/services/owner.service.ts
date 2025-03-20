import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { pet } from '../../infrastructure';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/owners-portal`;

  getPetTreatments(petId: string, category?: string) {
    return this.http.get<any[]>(`${this.url}/treatments/${petId}`);
  }

  getPets() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<pet[]>(`${this.url}/pets`, { headers }).pipe(
      map((resp) =>
        resp.map(({ image, ...props }) => ({
          ...props,
          image: image ?? 'images/no-image.png',
        }))
      )
    );
  }
}
