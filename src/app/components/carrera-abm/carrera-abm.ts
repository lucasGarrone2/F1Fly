import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarreraForm } from '../carrera-form/carrera-form';
import { CarreraStore } from '../carrera/carrera-store';
import { CarreraClient } from '../carrera/carrera-client';


@Component({
  selector: 'app-carrera-abm',
  imports: [CarreraForm],
  templateUrl: './carrera-abm.html',
  styleUrl: './carrera-abm.css'
})
export class CarreraAbm {
  private readonly carreraStore = inject(CarreraStore);
  private readonly carreraClient = inject(CarreraClient);
  protected readonly carreras = toSignal(this.carreraClient.getCarreras());
  
  protected readonly agregarCarrera = signal(false);

  activarFormulario_Carrera(){
    this.agregarCarrera.set(!this.agregarCarrera());
  }
  
}
