import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarreraForm } from '../carrera-form/carrera-form';
import { CarreraClient } from '../carrera/carrera-client';
import { Carrera } from '../carrera/carrera-interface';


@Component({
  selector: 'app-carrera-abm',
  imports: [CarreraForm],
  templateUrl: './carrera-abm.html',
  styleUrl: './carrera-abm.css'
})
export class CarreraAbm {
  private readonly carreraClient = inject(CarreraClient);
  protected readonly carreras = toSignal(this.carreraClient.getCarreras());
  
  protected readonly activarFormulzarioCarrera = signal(false);
  readonly edicionCarrera = signal(false);
  protected readonly carrera_editar = signal<Carrera | undefined>(undefined);
  
  activarFormulario_Carrera(){
    this.activarFormulzarioCarrera.set(!this.activarFormulzarioCarrera());
  }

  activarEdicion_Carrera(id_bus : string | number){
    this.edicionCarrera.set(!this.edicionCarrera());
   this.carreraClient.getCarrera_ID(id_bus).subscribe(carrera => {
    this.carrera_editar.set(carrera);
  });
  }

  
}
