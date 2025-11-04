import { Component, inject } from '@angular/core';
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

   handleSubmit() {
    if (this.form.invalid) {
      alert("El formulario está invalido");
      return;
    }

    if (confirm("Desea confirmar los datos?")) {
      const carrera = this.form.getRawValue() as Carrera;
      this.carreraClient.addCarrera(carrera).subscribe(() => {
          alert('Carrera agregada con éxito!');
          this.carreraABM.activarFormulario_Carrera();
          this.form.reset();
          window.location.reload();
        });
    }
  }
 
  cerrarFormulario(){
     this.carreraABM.activarFormulario_Carrera();
  }
  
}


