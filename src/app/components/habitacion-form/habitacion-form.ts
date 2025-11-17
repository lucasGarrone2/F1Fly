import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, input, output } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  // Inicializamos cantPersonas como string '1' para reflejar el comportamiento del input HTML
  formu = new FormGroup({
    tipoHabitacion: new FormControl('estandar', { nonNullable: true, validators: [Validators.required] }),
    // Tipamos el control como string, aunque contenga un número.
    cantPersonas: new FormControl('1', { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(6)] })
  });

  // Señal Computada que recalcula el precio
  precioTotal = computed(() => {
    const tipoHab = this.formu.controls.tipoHabitacion.value;
    
    // 🔥 CLAVE: Usamos Number() para convertir el valor del control (que puede ser string) a un número.
    const personas = Number(this.formu.controls.cantPersonas.value); 

    const tarifa = tarifas[tipoHab as keyof typeof tarifas];

    // Validación y cálculo: 
    if (typeof tarifa === 'number' && !isNaN(personas) && personas >= 1) {
      return tarifa * personas;
    }
        // Si es inválido o 0, devolvemos 0
        return 0;
  });

  getTarifa(tipo: string): number {
    return tarifas[tipo] || 0;
  }

  ngOnInit(): void {
    // La suscripción de seguridad se mantiene por si el problema es la detección de cambios.
    this.formu.valueChanges.subscribe(() => {
        // Esto fuerza la detección de cambios en el componente.
    });
  }

  cerrarFormularioHabitacion() {
    this.cerrarFormulario.emit();
  }

  seleccionarHabitacion() {
    if (this.formu.valid) {
      const seleccion = {
        hotelId: this.hotelId(),
        hotelNombre: this.hotelNombre(),
        tipoHabitacion: this.formu.controls.tipoHabitacion.value,
        // Usamos Number() para asegurar el tipo si fuera necesario al final
        cantPersonas: Number(this.formu.controls.cantPersonas.value), 
        precioTotal: this.precioTotal()
      }
      
      // Reemplazar 'alert' con un modal personalizado en aplicaciones reales
      alert(`Reserva realizada con exito \nHotel: ${seleccion.hotelNombre} \nTipo: ${seleccion.tipoHabitacion} \nPersonas: ${seleccion.cantPersonas} \nTotal: €${seleccion.precioTotal}`);

      this.cerrarFormularioHabitacion();
    }
  }

}