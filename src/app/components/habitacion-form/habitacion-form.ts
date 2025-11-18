
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaClient } from '../../clients/reserva-client'; // Su inyección
import { Subscription } from 'rxjs';

/// PRECIO BASE POR NOCHE Y PERSONA
const tarifas: { [key: string]: number } = {
  estandar: 200,
  premium: 500,
  vip: 1000 
};

@Component({
  selector: 'app-habitacion-form',
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DecimalPipe, DatePipe],
  templateUrl: './habitacion-form.html',
  styleUrl: './habitacion-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitacionForm implements OnInit, OnDestroy {

  hotelNombre = input.required<string>();
  hotelId = input.required<string>();
  fechasDisponibles = input<string[]>([]);

  cerrarFormulario = output<void>();
  habitacionSeleccionada = output<any>(); 

  readonly tarifas = tarifas;
  private subs = new Subscription();

  minFechaSalida = signal<string | null>(null); 
  maxFechaSalida = signal<string | null>(null); 

  formu = new FormGroup({
    tipoHabitacion: new FormControl('estandar', { nonNullable: true, validators: [Validators.required] }),
    cantPersonas: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(6)] }), 
    fechaEntrada: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fechaSalida: new FormControl({ value: '', disabled: true }, { nonNullable: true, validators: [Validators.required] }) 
  });


  // Verifica que las noches sean válidas y la duración esté dentro del rango (1-3)
  calcularNoches = computed((): number => {
    const fechaEntradaStr = this.formu.controls.fechaEntrada.value;
    const fechaSalidaStr = this.formu.getRawValue().fechaSalida; 
    
    if (fechaEntradaStr && fechaSalidaStr) {
      const entrada = new Date(fechaEntradaStr + 'T00:00:00');
      const salida = new Date(fechaSalidaStr + 'T00:00:00');

      if (isNaN(entrada.getTime()) || isNaN(salida.getTime()) || salida <= entrada) {
          return 0;
      }
      
      const diffTime = salida.getTime() - entrada.getTime();
      const noches = Math.round(diffTime / (1000 * 60 * 60 * 24)); 

      if (noches >= 1 && noches <= 3) {
          return noches;
      }
    }
    return 0;
  });

  precioTotal = computed(() => {
    const tipoHab = this.formu.controls.tipoHabitacion.value;
    const personas = this.formu.controls.cantPersonas.value; 
    const noches = this.calcularNoches();

    let tarifa = this.tarifas[tipoHab as keyof typeof this.tarifas];

    if (typeof tarifa === 'number' && noches > 0 && personas >= 1) {
      return tarifa * personas * noches; 
    }
    return 0;
  });

  getTarifa(tipo: string): number {
    return tarifas[tipo] || 0;
  }

  
  ngOnInit(): void {
    const disponibles = this.fechasDisponibles();
    
    if (disponibles && disponibles.length >= 2) {
        // 1. Inicializar la Fecha de Entrada con la primera disponible
        this.formu.controls.fechaEntrada.setValue(disponibles[0]);
        
        // 2. Establecer el efecto de cambio de entrada
        this.subs.add(
            this.formu.controls.fechaEntrada.valueChanges.subscribe(() => {
                this.actualizarFechasDeSalida(true); 
            })
        );
        
        this.actualizarFechasDeSalida(true);
        
    } else {
        this.formu.controls.fechaEntrada.disable();
        this.formu.controls.fechaSalida.disable();
    }
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  
  actualizarFechasDeSalida(forceDefaultValue: boolean = false): void {
    const entradaStr = this.formu.controls.fechaEntrada.value;
    const disponibles = this.fechasDisponibles();

    if (!entradaStr || !disponibles || disponibles.length < 2) {
      this.minFechaSalida.set(null);
      this.maxFechaSalida.set(null);
      this.formu.controls.fechaSalida.disable();
      this.formu.controls.fechaSalida.setValue(''); 
      return;
    }

    const indexEntrada = disponibles.indexOf(entradaStr);
    const minSalidaIndex = indexEntrada + 1; // Mínimo: 1 noche después
    
    // Si la fecha de entrada no está en la lista (indexEntrada = -1) o no hay una fecha posterior
    if (indexEntrada === -1 || minSalidaIndex >= disponibles.length) {
        // La fecha de entrada no es válida o es la última disponible
        this.minFechaSalida.set(null);
        this.maxFechaSalida.set(null);
        this.formu.controls.fechaSalida.disable();
        this.formu.controls.fechaSalida.setValue(''); 
        return;
    }


    // Hay al menos una noche disponible
    this.formu.controls.fechaSalida.enable();
    
    // 1. Establecer el MÍNIMO (1 noche después)
    const minValida = disponibles[minSalidaIndex];
    this.minFechaSalida.set(minValida);

    // 2. Establecer el MÁXIMO (Máximo 3 noches después O la última fecha disponible)
    // La fecha de salida para 3 noches es indexEntrada + 3.
    const maxIndexNoches = indexEntrada + 3; 
    const salidaMaxIndex = Math.min(maxIndexNoches, disponibles.length - 1);
    const maxValida = disponibles[salidaMaxIndex];
    this.maxFechaSalida.set(maxValida);

    // 3. Si se fuerza (ej. al cambiar la entrada), establecer el valor por defecto (1 noche)
    if (forceDefaultValue) {
        // Asegurarse de que el valor por defecto no sea mayor que el máximo permitido
        const currentValue = this.formu.controls.fechaSalida.value;
        if (!currentValue || currentValue < minValida || currentValue > maxValida) {
           this.formu.controls.fechaSalida.setValue(minValida);
        } else {
           // Si el valor actual es válido, lo mantenemos (esto puede pasar en un ngOnInit inicial)
           // Sin embargo, si la fecha de entrada cambió, debemos resetear a minValida
           if (forceDefaultValue) {
              this.formu.controls.fechaSalida.setValue(minValida);
           }
        }
    }
  }


  reserva = inject(ReservaClient); // Esto es una suposición del servicio
  seleccionarHabitacion() {
    this.formu.markAllAsTouched();
    const noches = this.calcularNoches();
    
    // Validar duración y establecer error si es 0 noches (por rangos inválidos, no por requerimiento)
    if (noches === 0 && this.formu.controls.fechaEntrada.valid && this.formu.controls.fechaSalida.valid) {
        this.formu.controls.fechaSalida.setErrors({ 'invalidDuration': true });
    } else if (this.formu.controls.fechaSalida.hasError('invalidDuration')) {
        this.formu.controls.fechaSalida.setErrors(null);
    }
    
    if (this.formu.valid && noches > 0) {
      this.formu.controls.fechaSalida.setErrors(null); // Asegurar que no quede el error
      
      const seleccion = {
        tipoHabitacion: this.formu.controls.tipoHabitacion.value,
        cantPersonas: this.formu.controls.cantPersonas.value,
        fechaEntrada: this.formu.controls.fechaEntrada.value,
        fechaSalida: this.formu.controls.fechaSalida.value,
        noches: noches,
        precioTotal: this.precioTotal()
      }
      this.reserva.setHabitacion(seleccion);

      this.habitacionSeleccionada.emit(seleccion);
      this.cerrarFormularioHabitacion();
    } else {
        console.warn('Formulario no válido o duración incorrecta.');
    }
  }

  cerrarFormularioHabitacion() {
    this.cerrarFormulario.emit();
  }
}

