import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Carrera} from './carrera-interface';


@Injectable({ providedIn: 'root' })

export class CarreraClient{
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/movies';

    getCarreas(){
        return this.http.get<Carrera[]>(this.baseUrl);
    }


    getCarrera_ID(id_bus: string | number){
        return this.http.get<Carrera>(this.baseUrl + '/' + id_bus);
    }


    addCarrera(carrera_nueva: Carrera){
        return this.http.post<Carrera>(this.baseUrl, carrera_nueva);
    }

    updateCarrera(carrera_actualizada: Carrera, id_carrera_actualizada: string | number ){
        return this.http.put<Carrera>(this.baseUrl + '/' + id_carrera_actualizada, carrera_actualizada);
    }


    deleteCarrera(id_carrera: string | number){
        return this.http.delete(this.baseUrl + '/' + id_carrera);
    }

}