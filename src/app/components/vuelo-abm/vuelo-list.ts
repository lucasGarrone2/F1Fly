
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VueloClient } from '../vuelo/vuelo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IVuelo } from '../../interfaces/ivuelo';
import { VueloForm } from "../vuelo-form/vuelo-form";

@Component({
  selector: 'app-vuelo-list',
  imports: [ReactiveFormsModule, RouterLink, VueloForm],
  templateUrl: './vuelo-list.html',
  styleUrl: './vuelo-list.css'
})
export class VueloAbm {
  private vueloService = inject(VueloClient);
  protected router = inject(Router);
  protected isLoading = signal(false);
  readonly editarVuelo = signal(false);
  protected readonly vueloEdicion = signal<IVuelo | undefined >(undefined);
  protected readonly vuelos = toSignal(this.vueloService.getVuelos());

  protected readonly activarFormularioVuelo = signal(false);

  constructor() { }


  activarFormulario_Vuelo() {
    this.activarFormularioVuelo.set(true);
  }
  cerrarFormulario_Vuelo() {
    this.activarFormularioVuelo.set(false);
  }
  eliminarVuelo(id: string | number | undefined): void {
    if (!id) {
      console.error('El ID de vuelo proporcionado es inválido.');
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar este vuelo?')) {
      this.vueloService.deleteVuelo(id.toString()).subscribe({
        next: () => {
          console.log(`Vuelo con ID ${id} eliminado correctamente.`);
        },
        error: (error) => {
          console.error(`Error al eliminar el vuelo con ID ${id}:`, error);
        }
      });
    }
  }
  activarEdicion_Vuelo(id_bus: string | number) {
    this.editarVuelo.set(!this.editarVuelo());
    this.vueloService.getVuelo_ID(id_bus).subscribe(vuelos => {
      this.vueloEdicion.set(vuelos);
    });
  }

}