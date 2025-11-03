import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Carrera } from '../components/carrera/carrera-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceClient {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/carreras';

  getRaces(): Observable<Carrera[]> 
  {
    return this.http.get<Carrera[]>(this.baseUrl);
  }

  getRaceById(id: string | number): Observable<Carrera[]>
  {
    return this.http.get<Carrera[]>(`${this.baseUrl}/${id}`);
  }

  addRace(race: Carrera): Observable<Carrera>
  {
    return this.http.post<Carrera>(this.baseUrl, race);
  }

  updateRace(id: string | number, race: Carrera): Observable<Carrera[]>
  {
    return this.http.put<Carrera[]>(`${this.baseUrl}/${id}`, race);
  }

  deleteRace(id: string | number)
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
