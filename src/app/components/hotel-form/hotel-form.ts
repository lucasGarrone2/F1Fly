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
    fecha_inicio_disponible:['', [Validators.required]],
    fecha_fin_disponible:['', [Validators.required]],
    precio_promedio_habitacion_eur: [0, [Validators.required, Validators.min(50)]],
    tieneAmenities: [false, [Validators.required]],
    tieneTransporte: [false, [Validators.required]],
    imagenUrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    direccionExacta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    ubicacionEnMapa: this.formBuilder.nonNullable.group({
      latitud:[0,[Validators.required]],
      longitud:[0,[Validators.required]]
    }),
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

get fecha_inicio_disponible(){
  return this.form.controls.fecha_inicio_disponible;
}

get fecha_fin_disponible(){
  return this.form.controls.fecha_fin_disponible;
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

get latitud() {
  return this.form.controls.ubicacionEnMapa.controls.latitud;
}

get longitud() {
  return this.form.controls.ubicacionEnMapa.controls.longitud;
}

get id() {
  return this.form.controls.id;
}



  constructor(public notify: NotificationService) {
    effect(() => {
      const hotel = this.hotelEditar();
      const editando = this.estadoEdicion();
      const fechas = hotel?.fechas_disponibles || [];

      if (editando && hotel) {

        const incioDisp = fechas.length > 0? fechas[0]: '';
        const finDisp = fechas.length > 0? fechas[fechas.length-1]:'';

        this.form.patchValue({
          nombre_hotel: hotel.nombre_hotel,
          carrera_id: hotel.carrera_id,
          pais: hotel.pais,
          ciudad: hotel.ciudad,
          fecha_inicio_disponible: incioDisp,
          fecha_fin_disponible: finDisp,
          precio_promedio_habitacion_eur: hotel.precio_promedio_habitacion_eur,
          tieneAmenities: hotel.tieneAmenities,
          tieneTransporte: hotel.tieneTransporte,
          imagenUrl: hotel.imagenUrl,
          direccionExacta: hotel.direccionExacta,
          ubicacionEnMapa:{
            latitud: hotel.ubicacionEnMapa?.latitud,
            longitud: hotel.ubicacionEnMapa?.longitud
          },
          id: hotel.id?.toString()
        });
      }
      else if (!editando) {
        this.form.reset();
      }
    });
  }

  private generarFechasDisp(inicio: string, fin: string): string[]{
    if(!inicio || !fin) return [];
    const fechas = [];
    let actual = new Date(inicio + 'T00:00:00');
    const finn = new Date(fin + 'T00:00:00');

    while(actual <= finn){
      fechas.push(actual.toISOString().split('T')[0]);
      actual.setDate(actual.getDate() + 1);
    }
    return fechas;
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
        fechas_disponibles: this.generarFechasDisp(
          formValue.fecha_inicio_disponible,
          formValue.fecha_fin_disponible
        ),
        precio_promedio_habitacion_eur: formValue.precio_promedio_habitacion_eur,
        tieneAmenities: formValue.tieneAmenities,
        tieneTransporte: formValue.tieneTransporte,

        imagenUrl: formValue.imagenUrl,
        direccionExacta: formValue.direccionExacta,
        ubicacionEnMapa:{
          latitud: formValue.ubicacionEnMapa.latitud,
          longitud: formValue.ubicacionEnMapa.longitud
        }
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