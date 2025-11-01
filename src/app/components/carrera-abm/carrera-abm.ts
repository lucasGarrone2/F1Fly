import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarreraForm } from '../carrera-form/carrera-form';

@Component({
  selector: 'app-carrera-abm',
  imports: [CarreraForm],
  templateUrl: './carrera-abm.html',
  styleUrl: './carrera-abm.css'
})
export class CarreraAbm {
  protected readonly agregarCarrera = signal(false);

  activarFormulario_Carrera(){
    this.agregarCarrera.set(!this.agregarCarrera());
  }
  
}
