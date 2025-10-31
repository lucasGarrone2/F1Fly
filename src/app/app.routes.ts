import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Home} from './components/home/home';
import {Login} from './components/login/login'
import { Carrera } from './components/carrera/carrera';
import { RaceList } from './components/race-list/race-list';
export const routes: Routes = [

   { path: '', component: Home},
    {path: 'registro', component: Register}, //Ruta al registro
    {path: "inicio_sesion", component:Login},
    {path: "gestion-carrera", component: Carrera},
    {path: "lista-de-carreras", component: RaceList},
];

