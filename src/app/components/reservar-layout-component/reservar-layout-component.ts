import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaClient } from '../../clients/reserva-client';

@Component({
  selector: 'app-reservar-layout-component',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './reservar-layout-component.html',
  styleUrl: './reservar-layout-component.css'
})
export class ReservarLayoutComponent {
  reservaCliente= inject(ReservaClient);
}
