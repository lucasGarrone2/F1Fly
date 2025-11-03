import { HttpClient } from '@angular/common/http';
import { inject, Injectable,signal } from '@angular/core';
import {Carrera} from './carrera-interface';

@Injectable({ providedIn: 'root' })

export class CarreraStore{
     private readonly carreras = signal<Carrera[]>([]);
     
     getCarreras(){
        return this.carreras.asReadonly();
     }

     addCarrera(carrera: Carrera){
        this.carreras.update((carreras)=>{
            return[...carreras,carrera];
        })
     }

}
