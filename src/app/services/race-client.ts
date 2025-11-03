import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Race } from '../components/carrera/carrera-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceClient {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/carreras';

  getRaces(): Observable<Race[]> 
  {
    return this.http.get<Race[]>(this.baseUrl);
  }

  getRaceById(id: string | number): Observable<Race[]>
  {
    return this.http.get<Race[]>(`${this.baseUrl}/${id}`);
  }

  addRace(race: Race): Observable<Race>
  {
    return this.http.post<Race>(this.baseUrl, race);
  }

  updateRace(id: string | number, race: Race): Observable<Race[]>
  {
    return this.http.put<Race[]>(`${this.baseUrl}/${id}`, race);
  }

  deleteRace(id: string | number)
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
