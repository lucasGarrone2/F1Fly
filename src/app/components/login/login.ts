import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth-service';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected readonly formBuilder= inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
   protected readonly form = this.formBuilder.nonNullable.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  protected readonly wrongCredentials= signal(false);
  public  passwordVisible= false;

constructor(public notify: NotificationService)
{
  if (this.auth.isLoggedin()) {
      this.router.navigateByUrl("");
} 
}

   login() {
    if (this.form.invalid) {
      this.notify.show("Error al completar el formulario", "error")
      return;
    }

    const { usuario, password } = this.form.getRawValue();

    this.auth.login(usuario, password).subscribe({
      next: () => {
       
        this.router.navigateByUrl("");
      },
      error: () => {
        this.notify.show("Credenciales incorrectas", "error")
        this.wrongCredentials.set(true);
        setTimeout(() => {
          this.wrongCredentials.set(false);
        }, 3000);
      }
    });
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
  
