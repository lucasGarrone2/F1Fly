import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Carrera} from './carrera-interface';


@Injectable({ providedIn: 'root' })

export class CarreraClient{
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/movies';









}