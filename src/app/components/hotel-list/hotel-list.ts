import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { ReservaClient } from '../../clients/reserva-client';

@Component({
  selector: 'app-hotel-list',
  imports: [ CommonModule, RouterLink],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelList {
    private readonly hotelService = inject(HotelService);
    protected hotelSource = toSignal(this.hotelService.getHoteles()); 

   
    onImageError(event: Event): void {
        const imgElement = event.target as HTMLImageElement;
        const fallbackSrc = 'assets/default-hotel.jpg'; 

        // Solo cambiamos si la imagen que falló no es la de fallback, para prevenir bucles
        if (imgElement.src.indexOf(fallbackSrc) === -1) {
            imgElement.src = fallbackSrc;
        }
    }

    constructor(private reserva: ReservaClient, private router: Router){}

     get HotelesFiltrados(): Hotel[] {
    const hoteles = this.hotelSource();
    const carrera = this.reserva.getCarrera();

    if (!hoteles || !carrera) return hoteles ?? [];

    return hoteles.filter(h =>
      h.pais.toLowerCase().trim() === carrera.pais_carrera.toLowerCase().trim() &&
      h.ciudad.toLowerCase().trim() === carrera.ciudad_carrera.toLowerCase().trim()
    );
  }
  
    seleccionarHotel(hotel: Hotel)
    {
        this.reserva.setHotel(hotel);
        this.router.navigate(['/reserva/vuelos']);
    }
}
