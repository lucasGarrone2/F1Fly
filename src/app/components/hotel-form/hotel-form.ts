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
  imports: [ReactiveFormsModule, CommonModule],
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
    nombre_hotel: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    carrera_id: [0, [Validators.required, Validators.min(1)]],
    pais: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    ciudad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    fechas_disponibles_text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    precio_promedio_habitacion_eur: [0, [Validators.required, Validators.min(50)]],
    tieneAmenities: [false, [Validators.required]],
    tieneTransporte: [false, [Validators.required]],
    imagenUrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    direccionExacta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    id: ['']
  });

get nombre_hotel() {
  return this.form.controls.nombre_hotel;
}

get carrera_id() {
  return this.form.controls.carrera_id;
}

get pais() {
  return this.form.controls.pais;
}

get ciudad() {
  return this.form.controls.ciudad;
}

get fechas_disponibles_text() {
  return this.form.controls.fechas_disponibles_text;
}

get precio_promedio_habitacion_eur() {
  return this.form.controls.precio_promedio_habitacion_eur;
}

get tieneAmenities() {
  return this.form.controls.tieneAmenities;
}

get tieneTransporte() {
  return this.form.controls.tieneTransporte;
}

get imagenUrl() {
  return this.form.controls.imagenUrl;
}

get direccionExacta() {
  return this.form.controls.direccionExacta;
}

get id() {
  return this.form.controls.id;
}



  constructor(public notify: NotificationService) {
    effect(() => {
      const hotel = this.hotelEditar();
      const editando = this.estadoEdicion();

      if (editando && hotel) {
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
      else if (!editando) {
        this.form.reset();
      }
    });
  }

  handleSubmit(): void {
    if (this.form.invalid) {
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
      else {
        const idActualizar = this.hotelEditar()?.id;
        if (!idActualizar) {

          this.notify.show("No se pudo actualizar el hotel por falta de ID", "error")
          return;
        }
        this.hotelService.updateHotel(hotel, idActualizar).subscribe({
          next: () => {

            this.notify.show("Hotel modificado con exito!", "info")
            this.form.reset();
            this.formularioGuardado.emit();
          },
          error: (error) => this.notify.show("Error al modificar el hotel", "error")
        });
      }
    }
  }

  cerrarForm(): void {
    this.form.reset();
    this.cancelar.emit();
  }


} 