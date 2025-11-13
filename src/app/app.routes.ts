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
import { VueloList } from './components/vuelo-list/vuelo-list';

export const routes: Routes = [

  // RUTAS GENERALES
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'registro', component: Register },
  { path: 'inicio_sesion', component: Login },
  { path: 'gestion-carrera', component: CarreraAbm, canActivate: [authGuardGuard] },
  { path: 'lista-de-carreras', component: RaceList },
  { path: 'gestion-hoteles', component: HotelAbm },
  { path: 'lista-hoteles', component: HotelList },

  // RUTAS DEL LAYOUT "RESERVAR"
  {
    path: 'reservar',
    component: ReservarLayoutComponent,
    children: [
      { path: 'carreras', component: RaceList },
      { path: 'hoteles', component: HotelList },
      { path: 'vuelos', component: VueloList },
      { path: '', redirectTo: 'carreras', pathMatch: 'full' }
    ]
  }
];
