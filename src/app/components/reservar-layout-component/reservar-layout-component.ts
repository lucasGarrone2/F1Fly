 declare var paypal: any;
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaClient } from '../../clients/reserva-client';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service';
import { filter, Subscription } from 'rxjs';



@Component({

  selector: 'app-reservar-layout-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './reservar-layout-component.html',
  styleUrls: ['./reservar-layout-component.css']
})

export class ReservarLayoutComponent implements AfterViewInit{


  reservaCliente = inject(ReservaClient);
  private readonly router = inject(Router);
 
  
  private routerSubscription: Subscription; 

  constructor() {
    
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) 
    ).subscribe(() => {
      
      this.verificarYRenderizarPaypal();
    });
  }
  ngAfterViewInit(): void {
    
    this.verificarYRenderizarPaypal();
  }

  ngOnDestroy(): void {

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

 
  verificarYRenderizarPaypal() {
    
    setTimeout(() => {
      if (!this.estaEnHoteles() && this.reservaCliente.total() > 0) {
        this.loadPayPalScript();
      }
    }, 100);
  }

 cuponIngresado = '';
 cuponError = '';
aplicarCupon() {
  const ok = this.reservaCliente.aplicarCupon(this.cuponIngresado);
  if (!ok) {
    this.cuponError = 'Cupón inválido o ya aplicado';
  } else {
    this.cuponError = '';
  }
}

  loadPayPalScript()
  {

    if (document.getElementById('paypal-sdk')) {
      this.renderPaypalButtons();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = "https://www.paypal.com/sdk/js?client-id=Af-qqBcttxL2dZYOfNf8a-lbSZjh4L3rNk_aV-qoAkg7jFX2SZY3NvBMLvRxexO7iIPYUKnrRIxkNIyA";

    script.onload = () => {
      this.renderPaypalButtons();
    };
    document.body.appendChild(script);

  }



  renderPaypalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) {
        return;
    }
    container.innerHTML = '';

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        const total = this.reservaCliente.total();
        return actions.order.create({
          purchase_units: [{
            amount: { value: total.toString() }
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log("Pago completado:", order);
        this.router.navigateByUrl("/reserva-confirmada");
      },
      onError: (err: any) => {
        console.log("Error en Paypal:", err);
        this.router.navigateByUrl("/lista-de-carreras");
      }
    }).render('#paypal-button-container');
  }


  estaEnHoteles(): boolean {

  return this.router.url.includes('/reservar/hoteles');

}





}