import { Component, inject, signal } from "@angular/core";
import { VueloClient } from "../vuelo/vuelo-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { IVuelo } from "../../interfaces/ivuelo";
import { RouterLink } from "@angular/router";
import { VueloForm } from "../vuelo-form/vuelo-form";

@Component({
  selector: 'app-vuelo-list',
  templateUrl: './vuelo-list.html',
  imports: [RouterLink, VueloForm],
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
}
