export interface User {
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
    piloto?: string,
    escuderia?: string
}
