import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaClient } from '../../clients/reserva-client';

@Component({
  selector: 'app-reserva-rechazada',
  imports: [],
  templateUrl: './reserva-rechazada.html',
  styleUrl: './reserva-rechazada.css'
})
export class ReservaRechazada {

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
