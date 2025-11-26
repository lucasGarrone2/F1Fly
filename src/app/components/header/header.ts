import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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

 menuOpen= false;

 // computed property providing the profile image observable/value
 protected readonly profileImg = computed(() => this.auth.getProfileImage());

closeMenu()
{
  this.menuOpen = false;
}

 toggleMenu()
 {
  this.menuOpen= !this.menuOpen;
 }

 verListadoFavoritos(){
  const user = this.auth.activeUser(); 
  this.router.navigateByUrl('lista-favoritos/' + user?.id);
  this.closeMenu();
 }


 verInfo()
 {
  this.router.navigateByUrl("/mi-informacion");
  this.closeMenu();
 }

 verMisReservas()
 {
  const user = this.auth.activeUser(); 
  this.router.navigateByUrl('lista-reservas/' + user?.id);
  this.closeMenu();
 }

 modificarPerfil()
 {
  this.router.navigateByUrl("/editar-perfil")
  this.closeMenu();
 }

 gestionarUsuarios()
 {
  this.router.navigateByUrl("/gestionar-usuarios")
  this.closeMenu();
 }
 logout()
 {
  this.auth.logout();
  this.router.navigateByUrl("/inicio_sesion");
  this.closeMenu();
 }

 gestionABM(){
  this.router.navigateByUrl('/gestion-carrera');
  this.closeMenu();
 }

 verInfoTemporada()
 {
  this.router.navigateByUrl("/info-temporada")
  this.closeMenu();
 }
}
