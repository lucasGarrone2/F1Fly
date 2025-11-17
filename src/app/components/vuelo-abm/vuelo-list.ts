import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IVuelo } from '../../interfaces/ivuelo';
import { VueloClient } from '../vuelo/vuelo-service';
import { VueloFormComponent } from "../vuelo-form/vuelo-form";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vuelo-abm',
  standalone: true,
  imports: [CommonModule, VueloFormComponent, RouterLink],
  templateUrl: './vuelo-list.html',
  styleUrls: ['./vuelo-list.css']
})
export class VueloAbm implements OnInit {

  vueloSrv = inject(VueloClient);

  vuelos = signal<IVuelo[]>([]);
  mostrarForm = signal<boolean>(false);
  modoEdicion = signal<boolean>(false);
  vueloSeleccionado = signal<IVuelo | null>(null);

  ngOnInit(): void {
    this.cargarVuelos();
  }

  cargarVuelos() {
    this.vueloSrv.getVuelos().subscribe({
      next: (data) => this.vuelos.set(data),
      error: (err) => console.error("Error cargando vuelos", err)
    });
  }

  abrirFormulario() {
    this.vueloSeleccionado.set(null);
    this.modoEdicion.set(false);
    this.mostrarForm.set(true);
  }

  editarVuelo(vuelo: IVuelo) {
    this.vueloSeleccionado.set(vuelo);
    this.modoEdicion.set(true);
    this.mostrarForm.set(true);
  }

  cerrarFormulario() {
    this.mostrarForm.set(false);
  }

  eliminarVuelo(id_vuelo: string | number | undefined) {
  if (id_vuelo === undefined || id_vuelo === null) {
    console.error("Error: ID de vuelo inválido (undefined).");
    return;
  }

  if (!confirm("¿Seguro que deseas eliminar este vuelo?")) return;

  this.vueloSrv.deleteVuelo(id_vuelo).subscribe({
    next: () => this.cargarVuelos(),
    error: (err) => console.error("Error al eliminar vuelo", err)
  });
}

  // -----------------------------------------------------------
//  MÉTODOS QUE NECESITA EL HTML (alias de tus propios métodos)
// -----------------------------------------------------------

activarFormularioVuelo() {
 return this.abrirFormulario();
}

activarEdicionVuelo(id: string | number) {
  // buscamos el vuelo por ID para que funcione igual que en carreras
  const vuelo = this.vuelos().find(v => v.id == id);
  if (vuelo) this.editarVuelo(vuelo);
}

activarEliminarVuelo(id: string | number) {
  return this.eliminarVuelo(id);
}

activarFormularioActivo() {
  return this.mostrarForm();
}
vuelo_editar() {
  return this.vueloSeleccionado();  
}
// editarVuelo(vueloOrId: IVuelo | string | number | undefined) {
//   // debug
//   console.log('editarVuelo llamado con:', vueloOrId);

//   // obtener id
//   const id = typeof vueloOrId === 'object' ? vueloOrId?.id : vueloOrId;
//   if (id === undefined || id === null) {
//     console.error('ID inválido para editar', vueloOrId);
//     return;
//   }

//   // traemos el vuelo real desde el backend (asegura datos completos)
//   this.vueloSrv.getVuelo_ID(id).subscribe({
//     next: (vuelo) => {
//       this.vueloSeleccionado.set(vuelo);
//       this.modoEdicion.set(true);
//       this.mostrarForm.set(true);
//       console.log('Vuelo cargado para editar:', vuelo);
//     },
//     error: (err) => {
//       console.error('Error trayendo vuelo para editar', err);
//     }
//   });
// }


}

