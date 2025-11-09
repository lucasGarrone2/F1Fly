import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vuelo } from '../vuelo/vuelo-interface';
import { VueloService } from '../vuelo/vuelo-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { VueloForm } from '../vuelo-form/vuelo-form';


@Component({
  selector: 'app-vuelo-abm',
  imports: [ CommonModule, VueloForm ],
  templateUrl: './vuelo-abm.html',
  styleUrl: './vuelo-abm.css'
})
export class VueloAbm {

  private readonly vueloService = inject(VueloService);
  protected readonly vuelos= this.vueloService.vuelo;
  protected readonly isLoading = this.vueloService.isLoading;

  readonly activarFormVuelo = signal(false);
  readonly editarVuelo = signal(false);
  protected readonly vueloEditar = signal<Vuelo | undefined>(undefined);

  toggleFormulario(): void{
    this.activarFormVuelo.set(!this.activarFormVuelo());
    if(this.activarFormVuelo()){
      this.editarVuelo.set(false);
      this.vueloEditar.set(undefined);
    }
  }

  activarEditarVuelo(id: string): void{
    this.editarVuelo.set(true);
    this.activarFormVuelo.set(true);

    this.vueloService.getVueloPorId(id).subscribe({
      next:(vuelo) =>{
        this.vueloEditar.set(vuelo);
      },
      error:(error) =>{
        console.error('Error al cargar vuelo para edicion', error);
      }
    });
  }

  activarElimVuelo(id: string): void{
    console.log(`Intentando eliminar el vuelo a traves del ID, ${id}`);

    this.vueloService.deleteVuelo(id).subscribe({
      next:()=>{
        console.log("Vuelo eliminado con exito");
      },
      error:(error) =>{
        console.error('Error al eliminar el vuelo',error);
      }
    });
  } 

}
