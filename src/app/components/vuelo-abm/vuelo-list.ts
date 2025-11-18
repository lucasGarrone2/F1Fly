import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderGestionAdmin } from '../../header-gestion-admin/header-gestion-admin';
import { toSignal } from '@angular/core/rxjs-interop';
import { VueloClient } from '../vuelo/vuelo-service';
import { IVuelo } from '../../interfaces/ivuelo';
import { VueloForm } from "../vuelo-form/vuelo-form";


@Component({
  selector: 'app-vuelo-list',
  imports: [ReactiveFormsModule, HeaderGestionAdmin, VueloForm],
  templateUrl: './vuelo-list.html',
  styleUrls: ['./vuelo-list.css']
})
export class VueloABM {
  private readonly vueloClient = inject(VueloClient);
  protected readonly vuelos = toSignal(this.vueloClient.getVuelos());
  protected readonly activarFormulzarioVuelo = signal(false);
  readonly edicionVuelo = signal(false);
  protected readonly vuelo_editar = signal<IVuelo | undefined>(undefined);

  activarFormulario_Vuelo() {
    this.activarFormulzarioVuelo.set(!this.activarFormulzarioVuelo());
  }

  activarEdicion_Vuelo(id_vuelo: string | number) {
    this.edicionVuelo.set(!this.edicionVuelo());
    this.vueloClient.getVuelo_ID(id_vuelo).subscribe((vuelo) => {
      this.vuelo_editar.set(vuelo);
    });
  }
  activarEliminar_Vuelo(id_vuelo: string | number) {
    if (confirm("¿Está seguro que desea eliminar este vuelo?")) {
      this.vueloClient.deleteVuelo(id_vuelo).subscribe(() => {
        alert("Vuelo eliminado con éxito");
        window.location.reload();
      });
    }
  }
  //HAY 2 DUPLICADOS NO SE SI EL CORRECTO ES ESTE O EL DE ARRIBA
   //activarEdicion_Vuelo(id_bus: string | number) {
   // this.editarVuelo.set(!this.editarVuelo());
   // this.vueloService.getVuelo_ID(id_bus).subscribe(vuelos => {
   //   this.vueloEdicion.set(vuelos);
   // });
  }
