import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { pet, petDetail, treatment } from '../../infrastructure';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/owners-portal`;

  getPetTreatments(petId: string, category?: string) {
    return this.http.get<treatment[]>(`${this.url}/treatments/${petId}`);
  }

  getPetDetail(id: string) {
    return this.http.get<petDetail>(`${this.url}/detail/${id}`);
  }

  getPets() {
    return this.http.get<pet[]>(`${this.url}/pets`);
  }
}
