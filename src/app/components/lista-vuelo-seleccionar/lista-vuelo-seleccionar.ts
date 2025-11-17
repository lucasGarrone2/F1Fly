import { Component, inject, signal } from '@angular/core';
import { VueloClient } from '../vuelo/vuelo-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReservaClient } from '../../clients/reserva-client';
import { AuthService } from '../../auth/auth-service';
import { IVuelo } from '../../interfaces/ivuelo';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lista-vuelo-seleccionar',
  imports: [CommonModule],
  templateUrl: './lista-vuelo-seleccionar.html',
  styleUrl: './lista-vuelo-seleccionar.css'
})
export class ListaVueloSeleccionar {
protected readonly client = inject(VueloClient);
  protected readonly router = inject(Router);
  protected readonly vuelo = toSignal(this.client.getVuelos());

  constructor(
    protected reserva: ReservaClient,
    private auth: AuthService
  ) {}

  get vuelosFiltrados(): IVuelo[] {
    const vuelos = this.vuelo();
    const carrera = this.reserva.getCarrera();
    if (!vuelos || !carrera) return vuelos ?? [];

    return vuelos.filter(v =>
      v.pais_destino.toLowerCase().trim() === carrera.pais_carrera.toLowerCase().trim(),
      
  )};

  seleccionarVuelo(vuelo: IVuelo) {
    this.reserva.setVuelo(vuelo);
  }
          
}

