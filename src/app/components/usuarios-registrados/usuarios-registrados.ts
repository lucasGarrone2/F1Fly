import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserClient } from '../../clients/user-client';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-usuarios-registrados',
  imports: [],
  templateUrl: './usuarios-registrados.html',
  styleUrl: './usuarios-registrados.css'
})
export class UsuariosRegistrados {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly client = inject(UserClient)
  protected readonly user= toSignal(this.client.getUsers());

  volver()
  {
    this.router.navigateByUrl("/");
  }
  
}
