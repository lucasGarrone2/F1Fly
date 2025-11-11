import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth-service';
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
  login()
  {
     if(this.form.invalid)
    {
      alert("Error al completar el formulario");
      return;
    }
    const {usuario, password} = this.form.getRawValue();
    this.auth.login(usuario, password);
    if(this.auth.isLoggedin())
    {
      this.router.navigateByUrl("/");
    }
    else
    {
      this.wrongCredentials.set(true);
      setTimeout(()=>{
        this.wrongCredentials.set(false);
      },3000);
    }
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
  
