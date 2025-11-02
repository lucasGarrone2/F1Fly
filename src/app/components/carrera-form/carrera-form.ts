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
    nombre_circuito: ['', [Validators.required]],
    fecha_circuito: ['', [Validators.required]],
    capacidad_circuito: ['', [Validators.required, Validators.min(5000)]],
    descripcion_circuito: ['', [Validators.required]],
    cantidad_vueltas: ['', [Validators.required, Validators.min(50)]],
    ciudad_circuito: ['',[Validators.required]],
    pais_circuito: ['',[Validators.required]],
    precio_entrada: ['',[Validators.required, Validators.min(80)]]
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


