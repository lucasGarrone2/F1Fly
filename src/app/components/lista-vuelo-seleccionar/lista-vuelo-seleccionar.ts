import { Component, inject, signal } from '@angular/core';
import { VueloClient } from '../vuelo/vuelo-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReservaClient } from '../../clients/reserva-client';
import { IVuelo } from '../../interfaces/ivuelo';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification-service';
import { AuthService } from '../../auth/auth-service';
@Component({
  selector: 'app-lista-vuelo-seleccionar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-vuelo-seleccionar.html',
  styleUrl: './lista-vuelo-seleccionar.css'
})
export class ListaVueloSeleccionar {
protected readonly client = inject(VueloClient);
  protected readonly router = inject(Router);
  protected readonly vuelo = toSignal(this.client.getVuelos());

  private readonly fb = inject(FormBuilder);


  protected readonly form = this.fb.nonNullable.group({
    cantidad: [null,[Validators.required]]
  }

  )

  get cantidad(){
    return this.form.controls.cantidad;
   }

    get cantidadSeleccionada(){
    return this.form.controls.cantidad.value;
   }


  constructor(
    protected reserva: ReservaClient,
    private auth: AuthService,
    public notify:NotificationService
  ) {}

  get vuelosFiltrados(): IVuelo[] {
    const vuelos = this.vuelo();
    const carrera = this.reserva.getCarrera();
    if (!vuelos || !carrera) return vuelos ?? [];

    return vuelos.filter(v =>
      v.pais_destino.toLowerCase().trim() === carrera.pais_carrera.toLowerCase().trim(),
      
  )};

  protected readonly cantidades = [1,2,3,4,5,6];

  seleccionarVuelo(vuelo: IVuelo) {

    if(!this.auth.isLoggedin())
        {
            this.router.navigate(['/inicio_sesion']);
            return;
        }

    const cantidad = this.cantidadSeleccionada;
    if (!cantidad) {
        
        this.notify.show("Para seguir con su orden primero ingrese la cantidad de personas", "warning")
        return; 
    }
    this.reserva.setVuelo(vuelo);
    this.reserva.setCantidadPersonas(cantidad); 
  }
  getPrecioTotalVuelo(precioUnitario: number): number {
    const cantidad = this.cantidadSeleccionada;
    if (cantidad && typeof cantidad === 'number' && cantidad > 0) {
       
        return precioUnitario * cantidad;
    }
    return precioUnitario;
}
          
}

