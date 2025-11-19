import { Component, computed, inject } from '@angular/core';
import { Reserva } from '../components/reserva/reserva';
import { ClientListaReservas } from '../client-lista-reservas';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-listado-reservas',
  imports: [],
  templateUrl: './listado-reservas.html',
  styleUrl: './listado-reservas.css'
})
export class ListadoReservas {
  protected readonly client = inject(ClientListaReservas);

  protected readonly reservas_todas = toSignal(this.client.getReservas());
  protected readonly isLoading = computed(()=>this.reservas_todas===undefined);


  

}
