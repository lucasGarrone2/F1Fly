import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrera-form',
  imports: [ReactiveFormsModule],
  templateUrl: './carrera-form.html',
  styleUrl: './carrera-form.css'
})
export class CarreraForm {
  private readonly formBuilder= inject(FormBuilder);
  protected readonly form = this.formBuilder.nonNullable.group({
    nombre_carrera: ['', [Validators.required]],
    fecha_carrera: ['', [Validators.required]],
    capacidad_carrera: ['', [Validators.required, Validators.min(5000)]],
    descripcion_carrera: ['', [Validators.required]],
    cantidad_vueltas_carrera: ['', [Validators.required, Validators.min(50)]],
    ciudad_carrera: ['',[Validators.required]],
    pais_carrera: ['',[Validators.required]],
    precio_carrera: ['',[Validators.required, Validators.min(80)]]
  });

  handleSubmit()
  {
    if(this.form.invalid)
    {
      alert("Error al completar el formulario");
      return;
    }
  }
}


