import { Component, computed, inject, input, signal } from '@angular/core';
import { Reserva } from '../components/reserva/reserva';
import { ClientListaReservas } from '../client-lista-reservas';
import { toSignal } from '@angular/core/rxjs-interop';
import { IReserva } from '../interfaces/ireserva';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
@Component({
  selector: 'app-listado-reservas',
  imports: [],
  templateUrl: './listado-reservas.html',
  styleUrl: './listado-reservas.css'
})
export class ListadoReservas {
  protected readonly client = inject(ClientListaReservas);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  protected readonly id_bus = this.route.snapshot.paramMap.get('id');
  
  protected readonly reservas_bus = (() => {
    if (this.id_bus !== '1') {
      return toSignal(this.client.getFavoritosByUser(this.id_bus!));
    } else {
      return toSignal(this.client.getReservas());
    }
  })();

  protected readonly isLoading = computed(()=>this.reservas_bus===undefined);
  protected readonly user = this.auth.activeUser();
  protected readonly cancelado = signal(false);

  botonEliminar(reserva_id : string | number){
    if(confirm('Desea cancelar su reserva?')){
    this.client.deleteReserva(reserva_id).subscribe(()=>{
      this.cancelado.set(true);
    });
  }
  }

  botonCerrarCuadro(){
    this.cancelado.set(false);
    window.location.reload();
  }


}
