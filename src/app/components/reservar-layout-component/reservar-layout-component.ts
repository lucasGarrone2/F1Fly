declare var paypal: any;

import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaClient } from '../../clients/reserva-client';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service';

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
  ngAfterViewInit(): void {
    this.loadPayPalScript();
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

  renderPaypalButtons()
  {
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
        this.router.navigateByUrl("/");

      },
      onError: (err: any) => {
        console.log("Error en Paypal:", err);
        this.router.navigateByUrl("/lista-de-carreras");
      }

    }).render('#paypal-button-container');
  }
}
