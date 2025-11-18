import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaClient } from '../../clients/reserva-client';

/// PRECIO HABITACIONES
const tarifas: { [key: string]: number } = {
  estandar: 200,
  premium: 500,
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
  fechasDisponibles = input<string[]>([]);
  cerrarFormulario = output<void>();
  habitacionSeleccionada = output<void>();

  minFechaSalida = signal<string | null>(null); // Primer día disponible después de la entrada
  maxFechaSalida = signal<string | null>(null); // Máximo 3 noches después o el final de disponibles
  esSalidaValida = signal<boolean>(false);     // Indica si el control de salida debe estar habilitado

  formu = new FormGroup({
    tipoHabitacion: new FormControl('estandar', { nonNullable: true, validators: [Validators.required] }),
    cantPersonas: new FormControl('1', { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(6)] }),
    fechaEntrada: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaSalida: new FormControl({ value: '', disabled: true }, { nonNullable: true, validators: [Validators.required] })
  });


  precioTotal = computed(() => {
    const tipoHab = this.formu.controls.tipoHabitacion.value;
    const personas = Number(this.formu.controls.cantPersonas.value);
    const noches = this.calcularNoches();

    let tarifa = tarifas[tipoHab as keyof typeof tarifas];

    if (typeof tarifa === 'number' && !isNaN(personas) && personas >= 1 && noches > 0) {
      return tarifa * personas * noches;
    } else if (typeof tarifa === 'number' && !isNaN(personas) && personas >= 1) {
       return tarifa * personas;
    }

    return 0;
  });

  getTarifa(tipo: string): number {
    return tarifas[tipo] || 0;
  }

  // verifica que las noches sean válidas y la duración esté dentro del rango (1-3)
  calcularNoches(): number {
    const fechaEntradaStr = this.formu.controls.fechaEntrada.value;
    const fechaSalidaStr = this.formu.controls.fechaSalida.value;
    if (fechaEntradaStr && fechaSalidaStr) {
      // Normaliza la zona horaria para un cálculo de días preciso
      const entrada = new Date(fechaEntradaStr + 'T00:00:00');
      const salida = new Date(fechaSalidaStr + 'T00:00:00');

      const diffTime = salida.getTime() - entrada.getTime();
      const noches = Math.round(diffTime / (1000 * 60 * 60 * 24)); 

      // más de 0 y máximo 3 noches.
      if (noches > 0 && noches <= 3) {
          // salida existe en las fechas disponibles
          if (!this.fechasDisponibles().includes(fechaSalidaStr)) {
             return 0; 
          }
          return noches;
      }
    }
    return 0;
  }


  ngOnInit(): void {
    if (this.fechasDisponibles().length > 0) {
      this.formu.controls.fechaEntrada.setValue(this.fechasDisponibles()[0]);
    }
    
    this.formu.controls.fechaSalida.disable(); 
    this.actualizarFechasDeSalida(); 

    this.formu.controls.fechaEntrada.valueChanges.subscribe(() => {
        this.formu.controls.fechaSalida.setValue(''); 
        this.actualizarFechasDeSalida();
    });
  }

  actualizarFechasDeSalida(): void {
    const entradaStr = this.formu.controls.fechaEntrada.value;
    const disponibles = this.fechasDisponibles();
    this.esSalidaValida.set(false); // Por defecto, deshabilitar

    if (!entradaStr || disponibles.length === 0) {
      this.minFechaSalida.set(null);
      this.maxFechaSalida.set(null);
      this.formu.controls.fechaSalida.disable();
      return;
    }

    const indexEntrada = disponibles.indexOf(entradaStr);
    
    const minSalidaIndex = indexEntrada + 1;

    if (minSalidaIndex < disponibles.length) {
        // Hay al menos una noche disponible
        this.esSalidaValida.set(true);
        this.formu.controls.fechaSalida.enable();
        
        // minFechaSalida con la fecha disponible
        this.minFechaSalida.set(disponibles[minSalidaIndex]);

        //MÁXIMO 
        const maxIndex = indexEntrada + 4; 
        const salidaMaxIndex = Math.min(maxIndex, disponibles.length);
        
        this.maxFechaSalida.set(disponibles[salidaMaxIndex - 1]);
        
    } else {
        // No hay días posteriores disponibles, deshabilitar y limpiar
        this.minFechaSalida.set(null);
        this.maxFechaSalida.set(null);
        this.formu.controls.fechaSalida.disable();
        this.formu.controls.fechaSalida.setValue(''); 
    }
  }


  cerrarFormularioHabitacion() {
    this.cerrarFormulario.emit();
  }

  reserva = inject(ReservaClient);
  seleccionarHabitacion() {
    this.formu.markAllAsTouched();
    const noches = this.calcularNoches();
    
    if (this.formu.controls.fechaEntrada.value && this.formu.controls.fechaSalida.value && noches === 0) {
        this.formu.controls.fechaSalida.setErrors({ 'invalidDuration': true });
    }

    if (this.formu.valid && noches > 0) {
      this.formu.controls.fechaSalida.setErrors(null);
      
      const seleccion = {
        tipoHabitacion: this.formu.controls.tipoHabitacion.value,
        cantPersonas: Number(this.formu.controls.cantPersonas.value),
        fechaEntrada: this.formu.controls.fechaEntrada.value,
        fechaSalida: this.formu.controls.fechaSalida.value,
        precioTotal: this.precioTotal()
      }
      this.reserva.setHabitacion(seleccion);

      this.habitacionSeleccionada.emit();
      this.cerrarFormularioHabitacion();
    } else {
        console.warn('Formulario no válido o duración incorrecta.');
    }
  }
}