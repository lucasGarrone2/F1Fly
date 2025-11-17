export interface IVuelo {
    id?: number | string,
    carrera_id: number | string,
    pais_origen: string,
    ciudad_origen: string,
    pais_destino: string,
    ciudad_destino: string,
    aerolinea: string,
    fecha_disponible: string,
    tipo_avion: string,
    clase_asiento: string,
    precio_promedio_ticket_eur: number

}
