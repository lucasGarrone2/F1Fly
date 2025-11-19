import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hotel } from '../hotel/hotel-interface';
import { HotelService } from '../hotel/hotel-service';
import { HotelAbm } from '../hotel-abm/hotel-abm';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-hotel-form',
  standalone: true, 
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.css'
})
export class HotelForm {

  private readonly hotelService = inject(HotelService);
  private readonly formBuilder = inject(FormBuilder);

  readonly hotelEditar = input<Hotel>();
  readonly estadoEdicion = input(false);

  @Output() formularioGuardado = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();


  protected readonly form = this.formBuilder.nonNullable.group({
    nombre_hotel:['',[Validators.required, Validators.minLength(3)]],
    carrera_id:[0, [Validators.required, Validators.min(1)]],
    pais:['', [Validators.required]],
    ciudad:['',[Validators.required]],
    fechas_disponibles_text:['', [Validators.required]],
    precio_promedio_habitacion_eur:[0, [Validators.required, Validators.min(50)]],
    tieneAmenities:[false, [Validators.required]],
    tieneTransporte:[false, [Validators.required]],
    imagenUrl: ['', [Validators.required]], 
    direccionExacta:['', [Validators.required, Validators.minLength(10)]],
    id: ['']
  });

  constructor(public notify: NotificationService){
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
          imagenUrl: hotel.imagenUrl, 
          direccionExacta: hotel.direccionExacta,
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
      this.form.markAllAsTouched();
      return;
    }
    
    if (confirm("Desea guardar los datos del hotel?")) {
        const formValue = this.form.getRawValue();
        
        const hotel: Hotel = {
            id: formValue.id ? String(formValue.id) : undefined, 
            nombre_hotel: formValue.nombre_hotel,
            carrera_id: formValue.carrera_id,
            pais: formValue.pais,
            ciudad: formValue.ciudad,
            fechas_disponibles: formValue.fechas_disponibles_text ? 
                                formValue.fechas_disponibles_text.split(',').map((fecha: string) => fecha.trim()) : 
                                [],
            precio_promedio_habitacion_eur: formValue.precio_promedio_habitacion_eur,
            tieneAmenities: formValue.tieneAmenities,
            tieneTransporte: formValue.tieneTransporte,
            
            imagenUrl: formValue.imagenUrl, 
            direccionExacta: formValue.direccionExacta
        };

        if (!this.estadoEdicion()) {
            this.hotelService.addHotel(hotel).subscribe({
                next: () => {
                  this.notify.show("Hotel agregado con exito", "success")
                  this.form.reset();
                  this.formularioGuardado.emit();
                },
                error: (error) => this.notify.show("Error al agregar el hotel", "error")
            });
        }
        else{
          const idActualizar = this.hotelEditar()?.id;
          if(!idActualizar){
           
            this.notify.show("No se pudo actualizar el hotel por falta de ID", "error")
            return;
          }  
          this.hotelService.updateHotel(hotel, idActualizar).subscribe({
            next:()=>{
              
              this.notify.show("Hotel modificado con exito!", "info")
              this.form.reset();
              this.formularioGuardado.emit();
            },
           error: (error) => this.notify.show("Error al modificar el hotel", "error")
          });
        }
    }
  } 

  cerrarForm(): void{
    this.form.reset();
    this.cancelar.emit();
  }


} 