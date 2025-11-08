export interface Vuelo{
    id: string,
    carrera_id: number,
    pais_origen: string,
    pais_destino: string,
    ciudad_destino: string,
    aerolinea: string,
    fecha_disponible: string,
    tipo_avion: string,
    clase_asiento: 'Economy' | 'Business' | 'Premiun Economy' | 'First Class',
    precio_promedio_ticket_eur: number
}

