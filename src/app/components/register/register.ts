import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { User } from '../../interfaces/user';
import { NotificationService } from '../../services/notification-service';
import { AuthService } from '../../auth/auth-service';
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
    'Yuki Tsunoda',
    'Nico Hülkenberg',
    'Liam Lawson',
    'Isack Hadjar',
    'Andrea Kimi Antonelli',
    'Gabriel Bortoleto',
    'Oliver Bearman'
    
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
  
  constructor(public notify: NotificationService){}
  protected readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required]],
    username: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8), Validators.max(16)]],
   password2: ['', [Validators.required, Validators.min(8), Validators.max(16)]],
    dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
    nacionalidad: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18)]],
    fecha_nacimiento: ['', [Validators.required,]],
    listaPilotos: ['', Validators.required],
    ListaEscuderias: ['', Validators.required],
  });

  handleSubmit()
  {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    
    const {nombre, username,apellido, email, password, password2,dni, nacionalidad, edad, fecha_nacimiento, listaPilotos, ListaEscuderias}= this.form.getRawValue();

    if(password!== password2)
    {
     
      this.notify.show("Las contraseñas no coinciden", "error")
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
    listaPilotos,
    ListaEscuderias
  };
  try
  {
    this.auth.register(newUser); /**Esto lo guarda en auth service */
    this.router.navigateByUrl("/inicio_sesion");
  }
  catch(error: any)
  {
    this.notify.show("Error", "error")
  }
  
  }

}
