import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { HotelAbm } from '../hotel-abm/hotel-abm';

@Component({
  selector: 'app-hotel-form',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.css'
})
export class HotelForm {

  private readonly hotelService = inject(HotelService);
  private readonly hotelABM = inject(HotelAbm);
  private readonly formBuilder = inject(FormBuilder);

  readonly hotelEditar = input<Hotel>();
  readonly estadoEdicion = input(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    nombre_hotel:['',[Validators.required, Validators.minLength(3)]],
    carrera_id:[0, [Validators.required, Validators.min(1)]],
    pais:['', [Validators.required]],
    ciudad:['',[Validators.required]],
    fechas_disponibles_text:['', [Validators.required]],
    precio_promedio_habitacion_eur:[0, [Validators.required, Validators.min(50)]],
    tieneAmenities:[false, [Validators.required]],
    tieneTransporte:[false, [Validators.required]],
    latitud:[0,[Validators.required]],
    longitud:[0, [Validators.required]],
    id: ['']
  });

  constructor(){
    effect(()=>{
      const hotel = this.hotelEditar();
      const editando = this.estadoEdicion();

      if(editando && hotel){
        this.form.patchValue({
          nombre_hotel: hotel.nombre_hotel,
          carrera_id: hotel.carrera_id,
          pais: hotel.pais,
          ciudad: hotel.ciudad,
          fechas_disponibles_text: hotel.fechas_disponibles.join(', '),
          precio_promedio_habitacion_eur: hotel.precio_promedio_habitacion_eur,
          tieneAmenities: hotel.tieneAmenities,
          tieneTransporte: hotel.tieneTransporte,
          latitud: hotel.ubicacion_mapa.latitud,
          longitud: hotel.ubicacion_mapa.longitud,
          id: hotel.id?.toString()
        });
      }
      else if(!editando){
        this.form.reset();
      } 
    });
  }

  handleSubmit(): void{
    if(this.form.invalid){
      alert("El formulario es invalido. Por favor revise los campos.");
      return;
    }
    if(confirm("Desea guardar los datos del hotel?")){
      const formValue = this.form.getRawValue();
      const hotel: Hotel = {
        id: formValue.id ? Number(formValue.id) : undefined,
        nombre_hotel: formValue.nombre_hotel,
        carrera_id: formValue.carrera_id,
        pais: formValue.pais,
        ciudad: formValue.ciudad,
        fechas_disponibles: formValue.fechas_disponibles_text.split(',').map(fecha => fecha.trim()),
        precio_promedio_habitacion_eur: formValue.precio_promedio_habitacion_eur,
        tieneAmenities: formValue.tieneAmenities,
        tieneTransporte: formValue.tieneTransporte,
        ubicacion_mapa: {
          latitud: formValue.latitud,
          longitud: formValue.longitud
        }
      };
      if(!this.estadoEdicion()){
        this.hotelService.addHotel(hotel).subscribe({
          next:()=>{
            alert('Hotel agregado con exito!');
            this.finalizarOperacion();
          },
          error: (error) => console.error('Error al agregar el hotel', error)
        });
      }

      else{
        const idaActualizar = this.hotelEditar()?.id;

        if(idaActualizar){
          this.hotelService.updateHotel(hotel, idaActualizar).subscribe({
            next:()=>{
              alert("Hotel actualizado/modificado con exito!");
              this.finalizarOperacion();
            },
            error:(error) => console.error('Error al actualizar el hotel', error)
          });
        }
      }
    }
  } 

  finalizarOperacion(): void{
    if(this.estadoEdicion()){
      this.hotelABM.editarHotel.set(false);
    }
    this.hotelABM.activarFormularioHotel.set(false);
    this.form.reset();
    window.location.reload();
  }

  cerrarForm(): void{
    this.finalizarOperacion();
  }

}
