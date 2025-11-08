import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth-service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly formBuilder= inject(FormBuilder);
  private readonly auth= inject(AuthService);
  private readonly router= inject(Router);

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
    username: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8), Validators.max(16)]],
   password2: ['', [Validators.required, Validators.min(8), Validators.max(16)]],
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

    const {nombre, username,apellido, email, password, password2,dni, nacionalidad, edad, fecha_nacimiento, piloto, escuderia}= this.form.getRawValue();

    if(password!== password2)
    {
      alert("Las contraseñas no coinciden");
      return;
    }

   const newUser: User = {
    nombre,
    apellido,
    username,
    email,
    password,
    isAdmin: false,
    dni: dni.toString(), 
    nacionalidad,
    edad:  Number(edad),
    fecha_nacimiento,
    piloto,
    escuderia
  };
  try
  {
    this.auth.register(newUser); /**Esto lo guarda en auth service */
    this.router.navigateByUrl("/inicio_sesion");
  }
  catch(error: any)
  {
    alert(error.message);
  }
  
  }

}
