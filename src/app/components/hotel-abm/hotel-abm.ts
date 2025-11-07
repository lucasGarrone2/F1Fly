import { Component, inject, signal } from '@angular/core';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HotelForm } from '../hotel-form/hotel-form';



@Component({
  selector: 'app-hotel-abm',
  imports: [HotelForm],
  templateUrl: './hotel-abm.html',
  styleUrl: './hotel-abm.css'
})
export class HotelAbm {

  private readonly hotelService = inject(HotelService);
  
  //carga reactiva de hoteles
  protected readonly hoteles = toSignal(this.hotelService.getHoteles());

  //signals para el estado del form
  readonly activarFormularioHotel = signal(false);
  readonly editarHotel = signal(false);
  protected readonly hotelEditar = signal<Hotel | undefined> (undefined);

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
}
