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
import { VueloAbm } from './components/vuelo-abm/vuelo-list';
import { ListaFavoritosCarrera } from './lista-favoritos-carrera/lista-favoritos-carrera';
import { PerfilUsuario } from './components/perfil-usuario/perfil-usuario';
import { EditarPerfilUsuario } from './components/editar-perfil-usuario/editar-perfil-usuario';
import { ListaVueloSeleccionar } from './components/lista-vuelo-seleccionar/lista-vuelo-seleccionar';


export const routes: Routes = [

  // RUTAS GENERALES
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'registro', component: Register },
  { path: 'inicio_sesion', component: Login },
  { path: 'gestion-carrera', component: CarreraAbm, canActivate: [authGuardGuard] },
  { path: 'lista-de-carreras', component: RaceList },
  { path: 'gestion-hoteles', component: HotelAbm, canActivate: [authGuardGuard] },
  { path: 'lista-hoteles', component: HotelList },
  {path: 'gestion-vuelos', component: VueloAbm, canActivate: [authGuardGuard]},
{path: 'mi-informacion', component: PerfilUsuario,  canActivate: [authGuardGuard]},
{path: 'editar-perfil', component: EditarPerfilUsuario,  canActivate: [authGuardGuard]},
{ path: 'vuelos', component: ListaVueloSeleccionar },
  {
    path:"lista-favoritos/:id",
    title: 'Lista favoritos',
    component: ListaFavoritosCarrera
  },
  // RUTAS DEL LAYOUT "RESERVAR"
  {
    path: 'reservar',
    component: ReservarLayoutComponent,
    children: [
      { path: 'carreras', component: RaceList },
      { path: 'hoteles', component: HotelList },
      { path: 'vuelos', component: ListaVueloSeleccionar },
      { path: '', redirectTo: 'carreras', pathMatch: 'full' }
    ]
  }
];
