import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { ReservaClient } from '../../clients/reserva-client';
import { HabitacionForm } from '../habitacion-form/habitacion-form';
import { signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule, RouterLink,NgOptimizedImage, HabitacionForm],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelList {
  private readonly hotelService = inject(HotelService);
  protected hotelSource = toSignal(this.hotelService.getHoteles());

  activarFormHabitacion = signal(false);
  hotelSeleccionado = signal<Hotel | undefined>(undefined);

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const fallbackSrc = 'assets/default-hotel.jpg';

    if (imgElement.src.indexOf(fallbackSrc) === -1) {
      imgElement.src = fallbackSrc;
    }
  }

  constructor(
    protected reserva: ReservaClient,
    private router: Router,
    private auth: AuthService
  ) { }

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

    if (hotel.id!== undefined && hotel.id!==null) {
      this.hotelSeleccionado.set(hotel);
      this.activarFormHabitacion.set(true);  
    } else {
      console.error('El hotel seleccionado no tiene ID válido.');
      return;
    }
  }

  cerrarHab() {
    this.activarFormHabitacion.set(false);
    this.hotelSeleccionado.set(undefined);
  }

  irAVuelos() {
    const carrera = this.reserva.getCarrera();
    if (!carrera) {
      console.error("No hay carrera seleccionada, no se puede ir a vuelos");
      return;
    }

    this.router.navigate(['/reservar/vuelos']);
  }

}
