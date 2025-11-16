import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VueloService } from '../vuelo/vuelo-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vuelo-list',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vuelo-list.html',
  styleUrl: './vuelo-list.css'
})
export class VueloAbm {
  private vueloService = inject(VueloService);
  private router = inject(Router);

  public vuelos = this.vueloService.vuelo;
  public isLoading = this.vueloService.isLoading;
    protected readonly activarFormularioVuelo = signal(false);

  constructor() { }

  editarVuelo(id: string | number | undefined): void {
    if (!id) return;
    this.router.navigate(['/vuelo-edit', id]);
  }

activarFormulario_Vuelo(){
this.activarFormularioVuelo.set(!this.activarFormularioVuelo());
}
  eliminarVuelo(id: string | number | undefined): void {
    if (!id) {
      console.error('El ID de vuelo proporcionado es inválido.');
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar este vuelo?')) {
      this.vueloService.deleteVuelo(id.toString()).subscribe({
        next: () => {
          console.log(`Vuelo con ID ${id} eliminado correctamente.`);
        },
        error: (error) => {
          console.error(`Error al eliminar el vuelo con ID ${id}:`, error);
        }
      });
    }
  }
}