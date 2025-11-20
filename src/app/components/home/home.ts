import { Component, inject, input, linkedSignal } from '@angular/core';
import {CommonModule} from "@angular/common";
import { Carrera } from '../carrera/carrera-interface';
import { RaceCardComponent } from '../race-card/race-card';
import { RouterLink } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { CarreraClient } from '../carrera/carrera-client';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home {
  private readonly client = inject(CarreraClient);
  protected raceSource = toSignal(this.client.getCarreras());

  constructor(protected auth:AuthService){}
  protected readonly router = inject(Router);
  botonExplorar(){
    this.router.navigateByUrl('lista-de-carreras');
  }

}
