import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-header', 
  standalone: true, 
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
 protected readonly auth= inject(AuthService);
 private readonly router= inject(Router);

 logout()
 {
  this.auth.logout();
  this.router.navigateByUrl("/inicio_sesion");
 }
}
