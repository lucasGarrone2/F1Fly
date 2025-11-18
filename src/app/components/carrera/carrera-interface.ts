export interface Carrera{
    id?: string | number,
    nombre_carrera: string,
    pais_carrera: string,
    ciudad_carrera:string,
    fecha_carrera:string,
    capacidad_carrera: number,
    cantidad_vueltas_carrera: number,
    descripcion_carrera: string,
    tipo_entrada: string,
    precio_entrada_regular: number,
    precio_entrada_premium: number,
    precio_entrada_vip: number,
    precio_carrera: number,
    imageUrl_carrera: string
};