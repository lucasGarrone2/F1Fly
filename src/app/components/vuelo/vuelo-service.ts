import { Injectable, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Vuelo } from "./vuelo-interface";
import { map, finalize } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class VueloService{

    private urlBase = "http://localhost:3000/vuelos";   
    vuelo: WritableSignal<Vuelo[]> = signal([]);
    isLoading: WritableSignal<boolean> = signal(false);

    constructor(private http: HttpClient){
        this.fetchVuelos();
    }

    fetchVuelos(): void{
        this.isLoading.set(true);
        this.http.get<Vuelo[]>(this.urlBase).pipe(
            finalize(()=> this.isLoading.set((false)))
        ).subscribe({
            next:(datos: Vuelo[])=>{
                console.log('Vuelos obtenidos', datos);
                this.vuelo.set(datos);
            },
            error:(error) => console.error('Error al obtener los vuelos', error)
        });
    }

    getVueloPorId(id: string): Observable<Vuelo>{
        return this.http.get<Vuelo>(`${this.urlBase}/${id}`);
    }

    addVuelo(vueloNuevo: Vuelo): Observable<Vuelo>{
        return this.http.post<Vuelo>(this.urlBase, vueloNuevo).pipe(
            map(vueloNuevo =>{
                this.vuelo.update(vuelos =>[...vuelos, vueloNuevo]);
                return vueloNuevo;
            })
        );
    }

    updateVuelo(vuelo: Vuelo): Observable<Vuelo>{
        return this.http.post<Vuelo>(`${this.urlBase}/${vuelo.id}`, vuelo).pipe(
            map(vueloActualizado =>{
                this.vuelo.update(vuelos=> vuelos.map(
                    v => v.id === vueloActualizado.id? vueloActualizado: v
                ));
                return vueloActualizado;
            })
        );
    }

    deleteVuelo(id: string): Observable<any>{
        return this.http.delete<any>(`${this.urlBase}/${id}`).pipe(
            map(()=>{
                this.vuelo.update(vuelos=> vuelos.filter(v => v.id!== id));
            })
        );
    }


    
}