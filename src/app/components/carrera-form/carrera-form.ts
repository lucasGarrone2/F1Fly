import { Component, inject, input,output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrera } from '../carrera/carrera-interface';
import { CarreraClient } from '../carrera/carrera-client';
import { CarreraAbm } from '../carrera-abm/carrera-abm';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'app-carrera-form',
  imports: [ReactiveFormsModule],
  templateUrl: './carrera-form.html',
  styleUrl: './carrera-form.css'
})
export class CarreraForm {
  private readonly carreraClient = inject(CarreraClient);
  private readonly carreraABM = inject(CarreraAbm);
  private readonly formBuilder= inject(FormBuilder);

  readonly carrera_edicion = input<Carrera>();
  readonly estadoEdicion = input(false);
  readonly out_carrera_edicion = output<Carrera>();
  
  constructor(public notify: NotificationService){
    effect(()=>{
      if(this.carrera_edicion() && this.estadoEdicion()){
        this.form.patchValue(this.carrera_edicion()!);
      }
    })
  }

  protected readonly tipos_ent = ['Regular','Premium', 'VIP'];

  protected readonly form = this.formBuilder.nonNullable.group({
  nombre_carrera: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
  fecha_carrera: ['2026-01-01', [Validators.required]],
  capacidad_carrera: [5000, [Validators.required, Validators.min(5000)]],
  descripcion_carrera: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
  cantidad_vueltas_carrera: [50, [Validators.required, Validators.min(50)]],
  ciudad_carrera: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
  pais_carrera: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
  imageUrl_carrera: ['', [Validators.required, Validators.minLength(2)]],
  precio_entrada_regular: [80, [Validators.required, Validators.min(80), Validators.max(150)]],
  precio_entrada_premium: [150, [Validators.required, Validators.min(150), Validators.max(300)]],
  precio_entrada_vip: [300, [Validators.required, Validators.min(300), Validators.max(800)]],
  tipo_entrada: ['', [Validators.required]],
  ubicacionEnMapa: this.formBuilder.nonNullable.group({
    latitud:[0,[Validators.required]],
    longitud:[0, [Validators.required]]
  })
});

  get nombre_carrera(){
    return this.form.controls.nombre_carrera;
  }

  get precio_entrada_regular(){
    return this.form.controls.precio_entrada_regular;
  }

get precio_entrada_premium(){
    return this.form.controls.precio_entrada_premium;
  }
  
  get precio_entrada_vip(){
    return this.form.controls.precio_entrada_vip;
  }
  get cantidad_vueltas_carrera(){
    return this.form.controls.cantidad_vueltas_carrera;
  }
  get capacidad_carrera(){
    return this.form.controls.capacidad_carrera;
  }
  get ciudad_carrera(){
    return this.form.controls.ciudad_carrera;
  }
  get descripcion_carrera(){
    return this.form.controls.descripcion_carrera;
  }
  get fecha_carrera(){
    return this.form.controls.fecha_carrera;
  }
  get imageUrl_carrera(){
    return this.form.controls.imageUrl_carrera;
  }
  get pais_carrera(){
    return this.form.controls.pais_carrera;
  }
 
  get tipoEntradaSeleccionada() {
  return this.form.controls.tipo_entrada.value;
  }

  get tipo_entrada(){
    return this.form.controls.tipo_entrada;
  }

  get latitud(){
    return this.form.controls.ubicacionEnMapa.controls.latitud;
  }

  get longitud(){
    return this.form.controls.ubicacionEnMapa.controls.longitud;
  }

   handleSubmit() {
    if (this.form.invalid) {
      this.notify.show("Error al completar el formulario", "error")
      return;
    }

    if (confirm("Desea confirmar los datos?")) {
      const carrera = this.form.getRawValue() as Carrera;

      if (!this.estadoEdicion()) {
        this.carreraClient.addCarrera(carrera).subscribe(() => {
          this.notify.show("Carrera agregada con exito", "success")
          this.carreraABM.botonAgregar();
          this.form.reset();
          window.location.reload();
        });
      } else {
          this.carreraClient.updateCarrera(carrera, this.carrera_edicion()?.id!).subscribe((c) => {
            this.out_carrera_edicion.emit(c);
            this.form.reset();
            window.location.reload();
          });
      }
    }
  }

  cerrarFormulario(){
  if (this.estadoEdicion()) {
    this.carreraABM.carreraSeleccionada.set(null);
  } else {
    this.carreraABM.botonAgregar();
  }
}

botonReiniciar(){
  this.form.reset();
}
  
}

