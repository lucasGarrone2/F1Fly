import { Component, effect, inject, input } from "@angular/core";
import { VueloClient } from "../vuelo/vuelo-service";
import { VueloABM } from "../vuelo-abm/vuelo-list";
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { IVuelo } from "../../interfaces/ivuelo";


@Component({
  selector: 'app-vuelo-form',
  templateUrl: './vuelo-form.html',
  styleUrls: ['./vuelo-form.css'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule]
})
export class VueloForm {

  private readonly vueloClient = inject(VueloClient);
  private readonly vueloABM = inject(VueloABM);
  private readonly formBuilder= inject(FormBuilder);

  readonly vuelo_edicion = input<IVuelo>();
  readonly estadoEdicion = input(false);
  
  protected readonly form = this.formBuilder.nonNullable.group({
    carrera_id: ['', [Validators.required]],
    pais_origen: ['', [Validators.required]],
    ciudad_origen: ['', [Validators.required]],
    pais_destino: ['', [Validators.required]],
    ciudad_destino: ['', [Validators.required]],
    aerolinea: ['', [Validators.required]],
    fecha_disponible: ['2026-01-01', [Validators.required]],
    tipo_avion: ['', [Validators.required]],
    clase_asiento: ['', [Validators.required]],
    precio_promedio_ticket_eur: [0, [Validators.required, Validators.min(50)]],
  });

  constructor() {
    effect(() => {
      const vuelo = this.vuelo_edicion();
      if (this.estadoEdicion() && vuelo) {
        this.form.patchValue({
          carrera_id: vuelo.carrera_id?.toString() ?? '',
          pais_origen: vuelo.pais_origen ?? '',
          ciudad_origen: vuelo.ciudad_origen ?? '',
          pais_destino: vuelo.pais_destino ?? '',
          ciudad_destino: vuelo.ciudad_destino ?? '',
          aerolinea: vuelo.aerolinea ?? '',
          fecha_disponible: vuelo.fecha_disponible ?? '2026-01-01',
          tipo_avion: vuelo.tipo_avion ?? '',
          clase_asiento: vuelo.clase_asiento ?? '',
          precio_promedio_ticket_eur: vuelo.precio_promedio_ticket_eur ?? 0,
        });
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

    if (!this.estadoEdicion()) {
      this.vueloClient.addVuelo(vuelo).subscribe(() => {
        alert('Vuelo agregado con éxito!');
        this.vueloABM.activarFormulario_Vuelo();
        this.form.reset();
        window.location.reload();
      });
    } else {
      const vueloEdit = this.vuelo_edicion();
      if (vueloEdit && vueloEdit.id !== undefined) {
        this.vueloClient.updateVuelo(vuelo, vueloEdit.id).subscribe(() => {
          this.vueloABM.activarFormulario_Vuelo();
          this.form.reset();
          window.location.reload();
          alert("Vuelo actualizado con éxito!");
        });
      } else {
        alert("No se puede actualizar el vuelo: ID no definido.");
      }
    }
  }
} 
cerrarFormulario(){
  if (this.estadoEdicion()) {
    this.vueloABM.edicionVuelo.set(false);
  } else {
    this.vueloABM.activarFormulario_Vuelo();
  }
}
}
