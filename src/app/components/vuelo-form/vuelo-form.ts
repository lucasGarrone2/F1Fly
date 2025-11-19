import { Component, effect, inject, input } from "@angular/core";
import { VueloClient } from "../vuelo/vuelo-service";
import { VueloABM } from "../vuelo-abm/vuelo-list";
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { IVuelo } from "../../interfaces/ivuelo";
import { NotificationService } from "../../services/notification-service";

@Component({
  selector: 'app-vuelo-form',
  templateUrl: './vuelo-form.html',
  styleUrls: ['./vuelo-form.css'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule]
})
export class VueloForm {

  private readonly vueloClient = inject(VueloClient);
  private readonly vueloABM = inject(VueloABM);
  private readonly formBuilder = inject(FormBuilder);

  readonly vuelo_edicion = input<IVuelo>();
  readonly estadoEdicion = input(false);

  protected readonly form = this.formBuilder.nonNullable.group({

    carrera_id: ['', [Validators.required]],
    pais_origen: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    ciudad_origen: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    pais_destino: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    ciudad_destino: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    aerolinea: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    fecha_disponible: ['2026-01-01', [Validators.required]],
    tipo_avion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    clase_asiento: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    precio_promedio_ticket_eur: [0, [Validators.required, Validators.min(50)]],
  });

  get carrera_id() {
  return this.form.controls.carrera_id;
}

get pais_origen() {
  return this.form.controls.pais_origen;
}

get ciudad_origen() {
  return this.form.controls.ciudad_origen;
}

get pais_destino() {
  return this.form.controls.pais_destino;
}

get ciudad_destino() {
  return this.form.controls.ciudad_destino;
}

get aerolinea() {
  return this.form.controls.aerolinea;
}

get fecha_disponible() {
  return this.form.controls.fecha_disponible;
}

get tipo_avion() {
  return this.form.controls.tipo_avion;
}

get clase_asiento() {
  return this.form.controls.clase_asiento;
}

get precio_promedio_ticket_eur() {
  return this.form.controls.precio_promedio_ticket_eur;
}


  constructor(public notify: NotificationService) {
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

      this.notify.show("El formulario es invalido", "error")
      return;
    }

    if (confirm("Desea confirmar los datos?")) {
      const vuelo = this.form.getRawValue() as IVuelo;

      if (!this.estadoEdicion()) {
        this.vueloClient.addVuelo(vuelo).subscribe(() => {

          this.notify.show("Vuelo agregado con exito", "success")
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

            this.notify.show("Vuelo actualizado con exito", "info")
          });
        } else {

          this.notify.show("No se puede actualizar el vuelo: ID no definido", "error")
        }
      }
    }
  }
  cerrarFormulario() {
    if (this.estadoEdicion()) {
      this.vueloABM.edicionVuelo.set(false);
    } else {
      this.vueloABM.activarFormulario_Vuelo();
    }
  }
}
