import { Component, inject } from '@angular/core';
import { CarreraClient } from '../components/carrera/carrera-client';
import { RaceCardComponent } from '../components/race-card/race-card';
import { HttpClient } from '@angular/common/http';
import { FavCarrera } from '../interfaces/fav-carrera';
import { Injectable } from '@angular/core';
import { Carrera } from '../components/carrera/carrera-interface';


@Injectable({
  providedIn: 'root'
})
export class ListaFavClient {
   protected readonly http = inject(HttpClient);
  protected readonly url = "http://localhost:3000/listadoFavoritos";


  getListaFavoritos(){
    return this.http.get<FavCarrera[]>(this.url);
  }

  getFavoritosByUser(id_user: number) {
  return this.http.get<FavCarrera[]>(this.url + "?id_user=" + id_user);
}

  getFavoritosByCarreraId(id_carrera: string | number) {
  return this.http.get<FavCarrera[]>(this.url + "?carrera.id=" + id_carrera);
}


  addFavoritos(carrera_fav : FavCarrera){
    return this.http.post<FavCarrera>(this.url,carrera_fav);
  }

  deleteCarreraFavoritos(id_bus : string | number){
    return this.http.delete<FavCarrera>(this.url +'/'+id_bus);
  }

  
  
}
