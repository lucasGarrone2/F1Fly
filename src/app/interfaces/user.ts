export interface User {
    id?: string | number,
    email: string,
    password: string
    username: string,
    isAdmin: boolean,
    nombre: string
    apellido: string,
    dni: string,
    nacionalidad: string,
    edad: number,
    fecha_nacimiento: string,
    listaPilotos: string,
    ListaEscuderias?: string
}
