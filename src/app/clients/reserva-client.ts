import { computed, Injectable, signal } from '@angular/core';
import { IReserva } from '../interfaces/ireserva';
import { Carrera } from '../components/carrera/carrera-interface';
import { Hotel } from '../components/hotel/hotel-interface';
import { IVuelo } from '../interfaces/ivuelo';

@Injectable({
  providedIn: 'root'
})
export class ReservaClient {

  private readonly _reserva = signal<IReserva>({});

  readonly reserva = computed(() => this._reserva());

   setHabitacion(data: {
    tipoHabitacion: string,
    cantPersonas: number,
    precioTotal: number
  }) {
    this._reserva.update(r => ({
      ...r,
      habitacion: data   
    }));
  }

  getHabitacion() {
    return this._reserva().habitacion;
  }

  // CONTROL DEL CUPÓN
  readonly tieneDescuento = signal(false);
  private readonly porcentaje = 20;


  aplicarCupon(codigo: string): boolean {
    if (this.tieneDescuento()) return false; 

    if (codigo.toUpperCase() === 'F1FLY20') {
      this.tieneDescuento.set(true);
      return true;
    }

    return false; 
  }

  readonly subtotal = computed(() => {
    const r = this._reserva();
    return (
      (r.carrera?.precio_carrera ?? 0) +
      (r.vuelo?.precio_promedio_ticket_eur ?? 0) +
      (r.habitacion?.precioTotal ?? 0) 
    );
  });

  readonly total = computed(() => {
    const sub = this.subtotal();
    if (this.tieneDescuento()) {
      return sub - (sub * this.porcentaje / 100);
    }
    return sub;
  });

  setCarrera(carrera: Carrera) {
  this._reserva.update(r => ({
    carrera,
    hotel: undefined,       
    habitacion: undefined, 
    vuelo: undefined,         
  }));

  this.tieneDescuento.set(false);
}

  setHotel(hotel: Hotel) {
    this._reserva.update(r => ({ ...r, hotel }));
    this.tieneDescuento.set(false);
  }

  setVuelo(vuelo: IVuelo) {
    this._reserva.update(r => ({ ...r, vuelo }));
    this.tieneDescuento.set(false);
  }

  getCarrera(): Carrera | undefined {
    return this._reserva().carrera;
  }

  getHotel(): Hotel | undefined {
    return this._reserva().hotel;
  }

  getVuelo(): IVuelo | undefined {
    return this._reserva().vuelo;
  }

  reset() {
    this._reserva.set({});
    this.tieneDescuento.set(false);
  }
}
