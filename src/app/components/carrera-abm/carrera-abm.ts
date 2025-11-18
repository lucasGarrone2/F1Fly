import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarreraForm } from '../carrera-form/carrera-form';
import { CarreraClient } from '../carrera/carrera-client';
import { Carrera } from '../carrera/carrera-interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HeaderGestionAdmin } from "../../header-gestion-admin/header-gestion-admin";

@Component({
  selector: 'app-carrera-abm',
  imports: [CarreraForm, NgOptimizedImage, HeaderGestionAdmin],
  templateUrl: './carrera-abm.html',
  styleUrl: './carrera-abm.css'
})
export class CarreraAbm {
  protected readonly carreraClient = inject(CarreraClient);

  protected readonly carreras = toSignal(this.carreraClient.getCarreras());
  protected readonly isLoading = computed(()=>this.carreras() === undefined);

  protected readonly activarFormulario = signal(false);
  readonly carreraSeleccionada = signal<Carrera | null>(null);    
  
  botonAgregar(){
    this.activarFormulario.set(!this.activarFormulario());
  }

  botonEditar(carrera: Carrera) {
    this.carreraSeleccionada.set(carrera);
  }

  finzalizarEdicion(carreraEditada: Carrera) {
    this.carreraSeleccionada.set(null);
    alert("Carrera actualizada con éxito!");
  }

  botonEliminar(id_bus : string | number){
    if(confirm("Desea borrar esta carrera?")){
    this.carreraClient.deleteCarrera(id_bus).subscribe(()=>{
      alert("Carrera borrada con EXITO!");
      window.location.reload();
    });
  }
  }

  
}
