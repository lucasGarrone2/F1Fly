import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { ReservaClient } from '../../clients/reserva-client';
import { AuthService } from '../../auth/auth-service';
import { HabitacionForm } from '../habitacion-form/habitacion-form';
import { signal } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  imports: [ CommonModule, RouterLink, HabitacionForm],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelList {
    private readonly hotelService = inject(HotelService);
    protected hotelSource = toSignal(this.hotelService.getHoteles()); 

    ///HABITACION NUEVO
    activarFormHabitacion = signal(false);
    hotelSeleccionadoId = signal<string | undefined>(undefined);
    hotelSeleccNombre = signal<string | undefined>(undefined);
   
    onImageError(event: Event): void {
        const imgElement = event.target as HTMLImageElement;
        const fallbackSrc = 'assets/default-hotel.jpg'; 

        // Solo cambiamos si la imagen que falló no es la de fallback, para prevenir bucles
        if (imgElement.src.indexOf(fallbackSrc) === -1) {
            imgElement.src = fallbackSrc;
        }
    }

    constructor(
      protected reserva: ReservaClient, 
      private router: Router, 
      private auth: AuthService
    ){}

    get HotelesFiltrados(): Hotel[] {
    const hoteles = this.hotelSource();
    const carrera = this.reserva.getCarrera();

    if (!hoteles || !carrera) return hoteles ?? [];

    return hoteles.filter(h =>
      h.pais.toLowerCase().trim() === carrera.pais_carrera.toLowerCase().trim() &&
      h.ciudad.toLowerCase().trim() === carrera.ciudad_carrera.toLowerCase().trim()
    );
  }
  
   get hayCarreraSeleccionada(): boolean {
      return this.reserva.getCarrera() !== undefined;
    }


    seleccionarHotel(hotel: Hotel) {
        this.reserva.setHotel(hotel); 
        
        ////nuevo hbitacion
        if (hotel.id) { 
          this.hotelSeleccionadoId.set(String(hotel.id));
          this.hotelSeleccNombre.set(String(hotel.nombre_hotel));
          this.activarFormHabitacion.set(true);
        } else {
            console.error('El hotel seleccionado no tiene ID válido.');
        }
    }
        cerrarHab() {
        this.activarFormHabitacion.set(false);
        this.hotelSeleccionadoId.set(undefined);
        this.hotelSeleccNombre.set(undefined);
    }
}
