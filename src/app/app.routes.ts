import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Home} from './components/home/home';
import {Login} from './components/login/login'
import { CarreraAbm } from './components/carrera-abm/carrera-abm';
import { RaceList } from './components/race-list/race-list';
import { authGuardGuard } from './guard/auth-guard-guard';
import { HotelAbm } from './components/hotel-abm/hotel-abm';
import { HotelList } from './components/hotel-list/hotel-list';

export const routes: Routes = [

    { path: '', component: Home},
    { path: 'registro', component: Register}, //Ruta al registro
    { path: "inicio_sesion", component:Login},
    { path: "gestion-carrera", component: CarreraAbm, canActivate: [authGuardGuard]},
    { path: "lista-de-carreras", component: RaceList},
    { path: "gestion-hoteles", component: HotelAbm, canActivate: [authGuardGuard]},
    { path: "lista-hoteles", component: HotelList}
];

