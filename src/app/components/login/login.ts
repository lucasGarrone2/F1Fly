import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected readonly formBuilder= inject(FormBuilder);
   protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
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