import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Home} from './components/home/home';
import {Login} from './components/login/login'
export const routes: Routes = [

   { path: '', component: Home},
    {path: 'registro', component: Register}, //Ruta al registro
    {path: "inicio_sesion", component:Login}
];

