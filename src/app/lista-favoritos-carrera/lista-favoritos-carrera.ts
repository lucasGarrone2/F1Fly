import { Component, computed, inject, signal } from '@angular/core';
import { CarreraClient } from '../components/carrera/carrera-client';
import { RaceCardComponent } from '../components/race-card/race-card';
import { HttpClient } from '@angular/common/http';
import { FavCarrera } from '../interfaces/fav-carrera';
import { ListaFavClient } from '../services/lista-fav-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { Carrera } from '../components/carrera/carrera-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-favoritos-carrera',
  imports: [RaceCardComponent],
  templateUrl: './lista-favoritos-carrera.html',
  styleUrl: './lista-favoritos-carrera.css'
})


export class ListaFavoritosCarrera {
  protected readonly client = inject(ListaFavClient);
  protected readonly router = inject(Router);

  protected readonly lista_fav = toSignal(this.client.getListaFavoritos()); 
  protected readonly isLoading = computed(()=>this.lista_fav===undefined);

  readonly eliminar = signal(false);


  botonEliminar(){
  this.eliminar.set(!this.eliminar());
  }

  eliminarCarreraFav(cf: string | number){
    this.client.deleteCarreraFavoritos(cf).subscribe(()=>{
      alert('Carrera eliminada con exito!');
      window.location.reload();
    });
  }


  botonListaCarreras(){
    this.router.navigateByUrl("lista-de-carreras");
  }

}
