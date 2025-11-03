import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly formBuilder= inject(FormBuilder);
protected readonly listaPilotos = [
    'Max Verstappen',
    'Sergio Pérez',
    'Lewis Hamilton',
    'George Russell',
    'Charles Leclerc',
    'Carlos Sainz',
    'Lando Norris',
    'Oscar Piastri',
    'Fernando Alonso',
    'Lance Stroll',
    'Esteban Ocon',
    'Pierre Gasly',
    'Alexander Albon',
    'Franco Colapinto',
    'Daniel Ricciardo',
    'Yuki Tsunoda',
    'Valtteri Bottas',
    'Guanyu Zhou',
    'Nico Hülkenberg',
    'Kevin Magnussen',
    'Michael Schumacher',
    'Ayrton Senna',
    'Juan Manuel Fangio',
    'Alain Prost',
    'Niki Lauda',
  ];

  protected readonly listaEscuderias = [
    "Ferrari",
    "Haas",
    "Mercedes",
    "Alpine",
    "Sauber",
    "Williams",
    "Aston Martin",
    "Red Bull",
    "Racing Bulls",
    "McLaren"
  ];
  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.min(10000000)]],
    nacionalidad: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18)]],
    fecha_nacimiento: ['', [Validators.required]],
    piloto: [''],
    escuderia: [''],
  });

  handleSubmit()
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }
  }

}
