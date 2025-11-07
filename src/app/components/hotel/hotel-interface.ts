export interface UbicacionMapa{
    latitud: number,
    longitud: number
}

export interface Hotel{
    id?: number,
    nombre_hotel: string,
    carrera_id: number,
    pais: string,
    ciudad: string,
    fechas_disponibles: string[],
    precio_promedio_habitacion_eur: number,
    tieneAmenities: boolean,
    tieneTransporte: boolean,
    ubicacion_mapa: UbicacionMapa
}