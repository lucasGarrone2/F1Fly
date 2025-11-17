import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs";
import { IVuelo } from "../../interfaces/ivuelo";

@Injectable({
    providedIn: 'root'
})

export class VueloClient{
    private readonly http = inject(HttpClient);
    private urlBase = "http://localhost:3000/vuelos";   
   getVuelos(){
    return this.http.get<IVuelo[]>(this.urlBase);
   }
    getVuelo_ID(id_bus: string | number){
        return this.http.get<IVuelo>(this.urlBase + '/' + id_bus);
    }
    
    addVuelo(vuelo_nuevo: IVuelo){
        return this.http.post<IVuelo>(this.urlBase, vuelo_nuevo);
    }
    updateVuelo(vuelo_actualizado: IVuelo, id_vuelo_actualizado: string | number ){
        return this.http.put<IVuelo>(this.urlBase + '/' + id_vuelo_actualizado, vuelo_actualizado);
    }
    deleteVuelo(id_vuelo: string | number){
        return this.http.delete(this.urlBase + '/' + id_vuelo);
    }
}