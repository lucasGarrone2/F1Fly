import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaClient } from '../../clients/reserva-client';
import { CommonModule } from '@angular/common';
import { IReserva } from '../../interfaces/ireserva';
import { ListadoReservas } from '../../listado-reservas/listado-reservas';
import { ClientListaReservas } from '../../client-lista-reservas';
import { AuthService } from '../../auth/auth-service';
import { User } from '../../interfaces/user';

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

  protected readonly client = inject(ClientListaReservas);
  protected readonly auth = inject(AuthService);


  agregarReserva(nueva_reserva: IReserva) {
    this.client.addReserva(nueva_reserva).subscribe(() => {
      console.log('Reserva agregada al listado');
    });
  }


  ngOnInit(): void {
    const user = this.auth.activeUser(); 
    if (this.reserva) {
      this.reserva.precio_total_reserva= this.total;
      this.reserva.id_user = user?.id;
      this.agregarReserva(this.reserva);
    }
  }
}
