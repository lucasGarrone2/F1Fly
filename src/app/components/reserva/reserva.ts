import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaClient } from '../../clients/reserva-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva',
  imports: [CommonModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css'
})
export class Reserva implements OnDestroy {
  private readonly router = inject(Router);
  private readonly reservaCliente = inject(ReservaClient)

  reserva = this.reservaCliente.reserva();
  total= this.reservaCliente.total();


  ngOnDestroy(): void {
    console.log("Limpiando datos de la reserva...");
    this.reservaCliente.resetReserva();
  }
  

  volver()
  {
    this.router.navigateByUrl("");
  }
}
