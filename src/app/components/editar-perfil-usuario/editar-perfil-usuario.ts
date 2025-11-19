import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification-service';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-editar-perfil-usuario',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil-usuario.html',
  styleUrl: './editar-perfil-usuario.css'
})
export class EditarPerfilUsuario {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

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
  
  constructor(public notify: NotificationService){}

  protected form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    listaPilotos: [''],
    ListaEscuderias: ['']
  });

  ngOnInit() {
    const user = this.auth.activeUser();
    if (user) {
      this.form.patchValue({
        username: user.username,
        email: user.email,
        password: user.password,
        listaPilotos: user.listaPilotos,
        ListaEscuderias: user.ListaEscuderias
      });
    }
  }

  guardarCambios() {
    if (this.form.invalid) {
      this.notify.show("Ocurrio un error al enviar el formulario", "error")
      return;
    }

    const cambios = this.form.getRawValue();

    this.auth.updateUser(cambios)?.subscribe({
      next: () => {
        
        this.notify.show("Datos actualizados correctamente", "info")
        this.router.navigateByUrl("/mi-informacion");
      },
      error: () => this.notify.show("Error al actualizar el perfil", "error")
    });
  }
}