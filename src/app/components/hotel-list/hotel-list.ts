import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';

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
}
