import { inject, Injectable } from '@angular/core';
import { Reserva } from './components/reserva/reserva';
import { HttpClient } from '@angular/common/http';
import { IReserva } from './interfaces/ireserva';

@Injectable({
  providedIn: 'root'
})
export class ClientListaReservas {
  protected readonly http = inject(HttpClient);
  protected readonly url = "http://localhost:3000/listado-reservas";

  getReservas(){
    return this.http.get<IReserva[]>(this.url);
  }

  getReservaByID(id_bus: string | number){
    return this.http.get<IReserva>(this.url + '/' + id_bus);
  }

  getFavoritosByUser(id_user: number | string) {
    return this.http.get<IReserva[]>(this.url + "?id_user=" + id_user);
  }

  addReserva(nueva_reserva : IReserva){
    return this.http.post<IReserva>(this.url,nueva_reserva);
  }

  deleteReserva(id_bus : string | number){
    return this.http.delete(this.url + '/' + id_bus);
  }



}
