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
  private cantidadPesonas: number | null = null;
  private vuelo: IVuelo | null = null;
  private cantidadEntradas: number = 1;
  private codigoCuponAplicado: string | null = null;
  private porcentajeDescuento = 0;

  private readonly cuponesValidos: Record<string, number>={
    'F1FLY20':20,
    'QUIZ15':15
  }

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
    const codigoUpper= codigo.toUpperCase();
    if (this.tieneDescuento()) return false; 

    if(this.cuponesValidos[codigoUpper])
    {
      this.tieneDescuento.set(true);
      this.codigoCuponAplicado= codigoUpper;
      this.porcentajeDescuento= this.cuponesValidos[codigoUpper];
      return true;
    }

    return false; 
  }

  getCuponAplicado(): string | null
  {
    return this.codigoCuponAplicado;
  }
  
  setCantidadPersonas(cantidad: number): void {
        this.cantidadPesonas = cantidad;
    }

    getCantidadPersonas(): number | null {
        return this.cantidadPesonas;
    }

    getPrecioTotalVuelo(): number | null {
        if (this.vuelo && this.cantidadPesonas) {
            return this.vuelo.precio_promedio_ticket_eur * this.cantidadPesonas;
        }
        return null;
    }

  
readonly subtotal = computed(() => {
    const r = this._reserva();
    
    const precioCarrera = this.getPrecioCarreraSeleccionada() ?? 0;
    
    const precioVueloTotal = this.getPrecioTotalVuelo() ?? 0;
    
    const precioHabitacion = r.habitacion?.precioTotal ?? 0;
    
    return precioCarrera +
           precioVueloTotal + 
           precioHabitacion;
});

  readonly total = computed(() => {
    const sub = this.subtotal();
    if (this.tieneDescuento()) {
      return sub - (sub * this.porcentajeDescuento / 100);
    }
    return sub;
  });

  

  setCarrera(carrera: Carrera, cantidad: number) {
    this.cantidadEntradas = cantidad;

    this._reserva.update(r => ({
      id: undefined,
      id_user: undefined,
      precio_total_reserva: undefined,
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
     this.vuelo = vuelo;  
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

    resetReserva() {
  this._reserva.set({
    id: undefined,
    id_user: undefined,
    precio_total_reserva: undefined,
    carrera: undefined,
    hotel: undefined,
    habitacion: undefined,
    vuelo: undefined
  });
 
}

getPrecioCarreraSeleccionada(): number {
    const r = this._reserva();

    const cant = this.cantidadEntradas; 

    if (!r.carrera || !r.carrera.tipo_entrada) return 0;

    let precioUnitario = 0;

    switch (r.carrera.tipo_entrada) {
        case 'Regular': precioUnitario = r.carrera.precio_entrada_regular; break;
        case 'Premium': precioUnitario = r.carrera.precio_entrada_premium; break;
        case 'VIP': precioUnitario = r.carrera.precio_entrada_vip; break;
    }

    return precioUnitario * cant;
  }

}
