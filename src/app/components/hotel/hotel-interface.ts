export interface Hotel {
  id: string | undefined; 
  nombre_hotel: string;
  carrera_id: number;
  pais: string;
  ciudad: string;
  fechas_disponibles: string[];
  precio_promedio_habitacion_eur: number;
  tieneAmenities: boolean;
  tieneTransporte: boolean;
  imagenUrl: string; 
  ubicacion_mapa: {
    latitud: number;
    longitud: number;
  };
}