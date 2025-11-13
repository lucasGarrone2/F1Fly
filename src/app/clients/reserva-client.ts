import { computed, Injectable, signal } from '@angular/core';
import { IReserva } from '../interfaces/ireserva';
import { Carrera } from '../components/carrera/carrera-interface';
import { Hotel } from '../components/hotel/hotel-interface';
import { IVuelo } from '../interfaces/ivuelo';
@Injectable({
  providedIn: 'root'
})

export class ReservaClient {
  
  private readonly _reserva= signal<IReserva>({});

   readonly reserva = computed(()=> this._reserva());
   readonly total= computed(()=>{
    const r = this._reserva();
    return(
      (r.carrera?.precio_carrera ?? 0)
      +
      (r.hotel?.precio_promedio_habitacion_eur ?? 0)
      +
      (r.vuelo?.precio_promedio_ticket_eur ?? 0)
  );
  })

    setCarrera(carrera: Carrera)
    {
      this._reserva.update(r=> ({...r,carrera}));
    }

    setHotel(hotel: Hotel)
    {
      this._reserva.update(r=> ({...r,hotel}));
    }

    setVuelo(vuelo: IVuelo)
    {
      this._reserva.update(r=> ({...r, vuelo}));
    }

    reset()
    {
      this._reserva.set({});
    }
}
