export interface Client{
    id?: string | number,
    nombre: string,
    apellido: string,
    email: string,
    dni: number,
    nacionalidad: string,
    edad: number,
    fecha_nacimiento: Date,
    piloto: string
    escuderia: string
};

//timestamp para la fecha