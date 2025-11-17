// import { Component, effect, inject, input, signal } from '@angular/core';
// import { VueloClient } from '../vuelo/vuelo-service';
// import { VueloAbm } from '../vuelo-abm/vuelo-list';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { IVuelo } from '../../interfaces/ivuelo';

// @Component({
//   selector: 'app-vuelo-form',
//   imports: [ReactiveFormsModule],
//   templateUrl: './vuelo-form.html',
//   styleUrl: './vuelo-form.css'
// })
// export class VueloForm {

//   private readonly formBuilder = inject(FormBuilder);
//   private readonly vueloClient = inject(VueloClient); // Usando VueloClient como en tu VueloAbm
//   protected readonly router = inject(Router);
//   protected readonly route = inject(ActivatedRoute);
//   private readonly vueloABM = inject(VueloAbm);

//   // Detecta los parámetros de la URL
//   private readonly params = toSignal(this.route.paramMap);
//   readonly estadoEdicion = signal(false);
//   private vueloId: string | number | undefined;

//   // Definición del formulario basado en IVuelo
//   protected readonly form = this.formBuilder.nonNullable.group({
//     pais_destino: ['', [Validators.required]],
//     ciudad_destino: ['', [Validators.required]],
//     pais_origen: ['', [Validators.required]],
//     ciudad_origen: ['', [Validators.required]],
//     aerolinea: ['', [Validators.required]],
//     fecha_disponible: ['2026-01-01', [Validators.required]],
//     tipo_avion: ['', [Validators.required]],
//     clase_asiento: ['', [Validators.required]],
//     precio_promedio_ticket_eur: [0, [Validators.required, Validators.min(10)]]
//   });


//   constructor() {
//     // Este effect reacciona a los cambios en la URL (los parámetros)
//     effect(() => {
//       const id = this.params()?.get('id'); // Busca un 'id' en la URL
//       if (id) {
//         // MODO EDICIÓN
//         this.estadoEdicion.set(true);
//         this.vueloId = id;
        
//         // Llama al servicio para obtener el vuelo y rellenar el formulario
//         this.vueloClient.getVuelo_ID(id).subscribe(vuelo => {
//           this.form.patchValue(vuelo);
//         });
//       } else {
//         // MODO CREACIÓN
//         this.estadoEdicion.set(false);
//         this.form.reset(); // Resetea el form por si acaso
//       }
//     }, { allowSignalWrites: true });
//   }

//   handleSubmit() {
//     if (this.form.invalid) {
//       alert("El formulario está inválido");
//       Object.values(this.form.controls).forEach(control => {
//         if (control.invalid) {
//           console.error('Control inválido:', control);
//         }
//       });
//       return;
//     }

//     if (confirm("Desea confirmar los datos?")) {
//       const vuelo = this.form.getRawValue() as IVuelo;

//       if (!this.estadoEdicion()) {
//         // LÓGICA DE CREAR
//         this.vueloClient.addVuelo(vuelo).subscribe(() => {
//           alert('Vuelo agregado con éxito!');
//           this.vueloABM.activarFormulario_Vuelo();
//           this.form.reset();
//           window.location.reload();
//         });
//       } else {

//         if (this.vueloId) {
//           this.vueloClient.updateVuelo(vuelo, this.vueloId).subscribe(() => {
//             alert("Vuelo actualizado con éxito!");
//             this.vueloABM.activarFormulario_Vuelo();
//             this.form.reset();
//             window.location.reload();
//           });
//         }
//       }
//     }
//   }
//   cerrarFormulario(){
//   if (this.estadoEdicion()) {
//     this.vueloABM.editarVuelo.set(false);
//   } else {
//     this.vueloABM.activarFormulario_Vuelo;
//   }
// }
// }

import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- [LA SOLUCIÓN 1]

import { VueloClient } from '../vuelo/vuelo-service';
import { VueloAbm } from '../vuelo-abm/vuelo-list';
import { IVuelo } from '../../interfaces/ivuelo';

@Component({
  selector: 'app-vuelo-form',
  standalone: true, // Asumo que es standalone
  imports: [
    ReactiveFormsModule,
    CommonModule // <-- [LA SOLUCIÓN 1] ¡¡PARA QUE FUNCIONE EL @if DEL HTML!!
  ],
  templateUrl: './vuelo-form.html',
  styleUrl: './vuelo-form.css'
})
export class VueloForm {

  private readonly formBuilder = inject(FormBuilder);
  private readonly vueloClient = inject(VueloClient);
  private readonly vueloABM = inject(VueloAbm); // Inyectado para cerrarse

  // [CORRECCIÓN 2] Usamos Inputs, como en Carreras.
  readonly estadoEdicion = input(false);
  readonly vuelo_edicion = input<IVuelo | undefined>(undefined);

  // [CORRECCIÓN 3] Quitamos toda la lógica de ActivatedRoute, Router, params, etc.

  protected readonly form = this.formBuilder.nonNullable.group({
    pais_destino: ['', [Validators.required]],
    ciudad_destino: ['', [Validators.required]],
    pais_origen: ['', [Validators.required]],
    ciudad_origen: ['', [Validators.required]],
    aerolinea: ['', [Validators.required]],
    fecha_disponible: ['2026-01-01', [Validators.required]],
    tipo_avion: ['', [Validators.required]],
    clase_asiento: ['', [Validators.required]],
    precio_promedio_ticket_eur: [0, [Validators.required, Validators.min(10)]]
  });

  constructor() {
    // [CORRECCIÓN 4] Usamos el 'effect' de Carreras
    // Escucha los cambios del input 'vuelo_edicion'
    effect(() => {
      const vuelo = this.vuelo_edicion();
      if (this.estadoEdicion() && vuelo) {
        // Rellena el formulario si estamos en modo edición
        this.form.patchValue(vuelo);
      }
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      alert("El formulario está inválido");
      return;
    }

    if (confirm("Desea confirmar los datos?")) {
      const vuelo = this.form.getRawValue() as IVuelo;

      // [CORRECCIÓN 5] Usamos 'this.estadoEdicion()'
      if (!this.estadoEdicion()) {
        // LÓGICA DE CREAR
        this.vueloClient.addVuelo(vuelo).subscribe(() => {
          alert('Vuelo agregado con éxito!');
          this.vueloABM.activarFormulario_Vuelo(); // Cierra el form de creación
          this.form.reset();
          window.location.reload(); // Dejamos el reload si así lo quieres
        });
      } else {
        // LÓGICA DE EDITAR
        const vueloEdit = this.vuelo_edicion(); // Obtenemos el vuelo del input
        if (vueloEdit && vueloEdit.id) {
          this.vueloClient.updateVuelo(vuelo, vueloEdit.id).subscribe(() => {
            alert("Vuelo actualizado con éxito!");
            this.vueloABM.editarVuelo.set(false); // Cierra el form de edición
            this.form.reset();
            window.location.reload();
          });
        }
      }
    }
  }

  // [CORRECCIÓN 6] Lógica de 'cerrarFormulario' de Carreras
  cerrarFormulario() {
    if (this.estadoEdicion()) {
      this.vueloABM.editarVuelo.set(false);
    } else {
      this.vueloABM.activarFormulario_Vuelo(); // Llama al método que hace toggle
    }
  }
}