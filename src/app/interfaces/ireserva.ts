import { Carrera } from "../components/carrera/carrera-interface"
import { Hotel } from "../components/hotel/hotel-interface"
import { IVuelo } from "./ivuelo"
import { Injectable } from "@angular/core"
export interface IReserva {
    carrera?: Carrera;
    hotel?:Hotel;
    vuelo?:IVuelo;
}

