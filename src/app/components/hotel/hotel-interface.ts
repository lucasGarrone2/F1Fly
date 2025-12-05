export interface Hotel {
  id?: string | number | undefined; 
  nombre_hotel: string;
  carrera_id: number;
  pais: string;
  ciudad: string;
  fechas_disponibles: string[];
  precio_promedio_habitacion_eur: number;
  tieneAmenities: boolean;
  tieneTransporte: boolean;
  imagenUrl: string; 
  direccionExacta: string;
  ubicacionEnMapa: {
    latitud: number;
    longitud: number;
  };
}