import { inject, Injectable } from '@angular/core';
import { Reserva } from './components/reserva/reserva';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientListaReservas {
  protected readonly http = inject(HttpClient);
  protected readonly url = "http://localhost:3000/listado-reservas";

  getReservas(){
    return this.http.get<Reserva[]>(this.url);
  }

  getReservaByID(id_bus: string | number){
    return this.http.get<Reserva>(this.url + '/' + id_bus);
  }

  addReserva(nueva_reserva : Reserva){
    return this.http.post<Reserva>(this.url,nueva_reserva);
  }

  deleteReserva(id_bus : string | number){
    return this.http.delete(this.url + '/' + id_bus);
  }



}
