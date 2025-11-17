import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, input, output } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaClient } from '../../clients/reserva-client';

/// PRECIO HABITACIONES
const tarifas: { [key: string]: number } = {
  estandar: 200,
  premiun: 500,
  vip: 1000
};

@Component({
  selector: 'app-habitacion-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habitacion-form.html',
  styleUrl: './habitacion-form.css'
})
export class HabitacionForm implements OnInit {
  
  hotelNombre = input.required<string>();
  hotelId = input.required<string>();

  cerrarFormulario = output<void>(); 

  habitacionSeleccionada = output<void>();

  formu = new FormGroup({
    tipoHabitacion: new FormControl('estandar', { nonNullable: true, validators: [Validators.required] }),
    
    cantPersonas: new FormControl('1', { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(6)] })
  });

 
  precioTotal = computed(() => {
    const tipoHab = this.formu.controls.tipoHabitacion.value;
    
   
    const personas = Number(this.formu.controls.cantPersonas.value); 

    const tarifa = tarifas[tipoHab as keyof typeof tarifas];

   
    if (typeof tarifa === 'number' && !isNaN(personas) && personas >= 1) {
      return tarifa * personas;
    }
        
        return 0;
  });

  getTarifa(tipo: string): number {
    return tarifas[tipo] || 0;
  }

  ngOnInit(): void {
    this.formu.valueChanges.subscribe(() => {
    });
  }

  cerrarFormularioHabitacion() {
    this.cerrarFormulario.emit();
  }

  reserva = inject(ReservaClient);
  seleccionarHabitacion() {
    if (this.formu.valid) {
      const seleccion = {
        tipoHabitacion: this.formu.controls.tipoHabitacion.value,
        cantPersonas: Number(this.formu.controls.cantPersonas.value), 
        precioTotal: this.precioTotal()
      }
      this.reserva.setHabitacion(seleccion);
      
       this.habitacionSeleccionada.emit();  
      this.cerrarFormularioHabitacion();
    }
  }

}