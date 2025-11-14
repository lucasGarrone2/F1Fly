import { Carrera } from "../components/carrera/carrera-interface";

export interface FavCarrera {
    id?: string | number,
    id_user: string | number,
    carrera: Carrera;
}
