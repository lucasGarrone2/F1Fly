import { Component, inject, input,output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrera } from '../carrera/carrera-interface';
import { CarreraClient } from '../carrera/carrera-client';
import { CarreraAbm } from '../carrera-abm/carrera-abm';
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
  
  constructor(){
    effect(()=>{
      if(this.carrera_edicion() && this.estadoEdicion()){
        this.form.patchValue(this.carrera_edicion()!);
      }
    })
  }
  protected readonly form = this.formBuilder.nonNullable.group({
    nombre_carrera: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    fecha_carrera: ['2026-01-01', [Validators.required]],
    capacidad_carrera: [0, [Validators.required, Validators.min(5000)]],
    descripcion_carrera: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    cantidad_vueltas_carrera: [0, [Validators.required, Validators.min(50)]],
    ciudad_carrera: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(40)]],
    pais_carrera: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(40)]],
    precio_carrera: [0,[Validators.required, Validators.min(80)]],
    imageUrl_carrera: ['', [Validators.required,Validators.minLength(2)]]
  });

  get nombre_carrera(){
    return this.form.controls.nombre_carrera;
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
  get precio_carrera(){
    return this.form.controls.precio_carrera;
  }

   handleSubmit() {
    if (this.form.invalid) {
      alert("El formulario está inválido");
      return;
    }

    if (confirm("Desea confirmar los datos?")) {
      const carrera = this.form.getRawValue() as Carrera;

      if (!this.estadoEdicion()) {
        this.carreraClient.addCarrera(carrera).subscribe(() => {
          alert('Carrera agregada con éxito!');
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
    this.carreraABM.editando.set(false);
  } else {
    this.carreraABM.botonAgregar();
  }
}

botonReiniciar(){
  this.form.reset();
}
  
}

