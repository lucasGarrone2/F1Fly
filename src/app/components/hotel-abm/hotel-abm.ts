import { Component, inject, signal } from '@angular/core';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HotelForm } from '../hotel-form/hotel-form';
import { Router, RouterLink } from '@angular/router';
import { HabitacionForm } from '../habitacion-form/habitacion-form';



@Component({
  selector: 'app-hotel-abm',
  imports: [HotelForm, RouterLink, HabitacionForm],
  templateUrl: './hotel-abm.html',
  styleUrl: './hotel-abm.css'
})
export class HotelAbm {

  private readonly hotelService = inject(HotelService);
  
  protected readonly hoteles = toSignal(this.hotelService.getHoteles());

  readonly activarFormularioHotel = signal(false);
  readonly editarHotel = signal(false);
  protected readonly hotelEditar = signal<Hotel | undefined> (undefined);


  //NUEVO: SEÑALES PARA EL FORM D SELEC D HABI
  activarFormHabitacion = signal(false);
  hotelSeleccionadoId = signal<string | undefined>(undefined);
  hotelSeleccNombre = signal<string | undefined>(undefined);

  activarFormHotel(): void{
    this.activarFormularioHotel.set(!this.activarFormularioHotel());
    if(this.activarFormularioHotel()){
      this.editarHotel.set(false);
      this.hotelEditar.set(undefined);
    }
  }

  activarEditHotel(id: number|string):void{
    this.editarHotel.set(true);
    this.activarFormularioHotel.set(true);

    this.hotelService.getHotelesById(id).subscribe({
      next:(hotel) =>{
        this.hotelEditar.set(hotel);
      },
      error:(error) =>{
        console.error('Error al cargar hotel para edicion:', error);
      }
    });
  }

  activarElimHotel(id: number|string): void{
    if(confirm("Desea borrar este hotel? Esta accion es irreversible")){
      this.hotelService.deleteHotel(id).subscribe({
        next:()=>{
          alert("Hotel borrado con exito!");
          window.location.reload();
        },
        error:(error) =>{
          console.error('Error al eliminar el hotel', error);
          alert("Ocurrio un error al intentar eliminar el hotel.");
        }
      });
    }
  }

  ///NUEVAS FUNCIONES PARA HABITACION
  activarSelecHabi(hotel: Hotel){
    if( hotel.id && hotel.nombre_hotel){
      this.hotelSeleccionadoId.set(String(hotel.id));
      this.hotelSeleccNombre.set(hotel.nombre_hotel);
      this.activarFormHabitacion.set(true);
    }
    else{
      console.error('El hotel non tiene ID o nombre definido');
    }
  }

  cerrarFormHabitacion(){
    this.activarFormHabitacion.set(false);
    this.hotelSeleccionadoId.set(undefined);
    this.hotelSeleccNombre.set(undefined);
  }
}
