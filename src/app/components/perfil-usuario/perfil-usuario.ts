import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css'
})
export class PerfilUsuario {
  private readonly router= inject(Router);
  private readonly auth= inject(AuthService);

   user = this.auth.activeUser();

   volver()
   {
    this.router.navigateByUrl("/");
   }
   public  passwordVisible= false;
   
    togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
