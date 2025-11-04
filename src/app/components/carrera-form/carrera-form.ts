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
  
  protected readonly form = this.formBuilder.nonNullable.group({
    nombre_carrera: ['', [Validators.required]],
    fecha_carrera: ['2025-01-01', [Validators.required]],
    capacidad_carrera: [0, [Validators.required, Validators.min(5000)]],
    descripcion_carrera: ['', [Validators.required]],
    cantidad_vueltas_carrera: [0, [Validators.required, Validators.min(50)]],
    ciudad_carrera: ['',[Validators.required]],
    pais_carrera: ['',[Validators.required]],
    precio_carrera: [0,[Validators.required, Validators.min(80)]],
    imageUrl_carrera: ['', [Validators.required]]
  });

 constructor() {
  // Escucha los cambios del input carrera_edicion
  effect(() => {
    const carrera = this.carrera_edicion();
    if (this.estadoEdicion() && carrera) {
      this.form.patchValue(carrera);
    }
  });
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
          this.carreraABM.activarFormulario_Carrera();
          this.form.reset();
          window.location.reload();
        });
      } else {
        const carreraEdit = this.carrera_edicion();
        if (carreraEdit) {
          this.carreraClient.updateCarrera(carrera, carreraEdit.id).subscribe(() => {
            alert("Carrera actualizada con éxito!");
            this.carreraABM.activarFormulario_Carrera();
            this.form.reset();
            window.location.reload();
          });
        }
      }
    }
  }

  cerrarFormulario(){
  if (this.estadoEdicion()) {
    this.carreraABM.edicionCarrera.set(false);
  } else {
    this.carreraABM.activarFormulario_Carrera();
  }
}
  
}


