import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { CarreraAbm } from './components/carrera-abm/carrera-abm';
import { RaceList } from './components/race-list/race-list';
import { authGuardGuard } from './guard/auth-guard-guard';
import { HotelAbm } from './components/hotel-abm/hotel-abm';
import { HotelList } from './components/hotel-list/hotel-list';
import { ReservarLayoutComponent } from './components/reservar-layout-component/reservar-layout-component';
import { ListaFavoritosCarrera } from './lista-favoritos-carrera/lista-favoritos-carrera';
import { PerfilUsuario } from './components/perfil-usuario/perfil-usuario';
import { EditarPerfilUsuario } from './components/editar-perfil-usuario/editar-perfil-usuario';
import { ListaVueloSeleccionar } from './components/lista-vuelo-seleccionar/lista-vuelo-seleccionar';
import { VueloABM } from './components/vuelo-abm/vuelo-list';
import { UsuariosRegistrados } from './components/usuarios-registrados/usuarios-registrados';
import { Reserva } from './components/reserva/reserva';
import { DetailsCarrera } from './components/details-carrera/details-carrera';

export const routes: Routes = [

  { path: '', component: Home, pathMatch: 'full' },
  { path: 'registro', component: Register },
  { path: 'inicio_sesion', component: Login },
  { path: 'lista-de-carreras', component: RaceList },
  { path: 'gestion-carrera', component: CarreraAbm, canActivate: [authGuardGuard] },
  { path: 'gestion-hoteles', component: HotelAbm, canActivate: [authGuardGuard] },
  { path: 'lista-hoteles', component: HotelList },
 {path: 'gestion-vuelos', component: VueloABM, canActivate: [authGuardGuard]},
{path: 'mi-informacion', component: PerfilUsuario,  canActivate: [authGuardGuard]},
{path: 'editar-perfil', component: EditarPerfilUsuario,  canActivate: [authGuardGuard]},
{path: 'gestionar-usuarios', component: UsuariosRegistrados, canActivate: [authGuardGuard] },
{ path: 'vuelos', component: ListaVueloSeleccionar, canActivate: [authGuardGuard] },
{ path: 'reserva-confirmada', component: Reserva, canActivate: [authGuardGuard]},
  {
    path:"lista-favoritos/:id",
    title: 'Lista favoritos',
    component: ListaFavoritosCarrera
  },{
    path: 'carrera-details/:id',
    title: 'Detalles Carrera',
    component: DetailsCarrera
  },
  // RUTAS DEL LAYOUT "RESERVAR"
  {
    path: 'reservar',
    component: ReservarLayoutComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'carreras', component: RaceList },
      { path: 'hoteles', component: HotelList },
     { path: 'vuelos', component: ListaVueloSeleccionar },
      { path: '', redirectTo: 'carreras', pathMatch: 'full' }
    ]
  }
];
