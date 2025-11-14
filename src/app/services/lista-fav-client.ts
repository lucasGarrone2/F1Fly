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

  getIDCarreraFav(id_bus : string | number){
    return this.http.get<Carrera>(this.url + "/" + id_bus);
  }

  addFavoritos(carrera_fav : FavCarrera){
    return this.http.post<FavCarrera>(this.url,carrera_fav);
  }

  deleteCarreraFavoritos(id_bus : string | number){
    return this.http.delete<Carrera>(this.url +'/'+id_bus);
  }

  
  
}
