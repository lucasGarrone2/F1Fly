import { Component, Input } from '@angular/core';
import {Race } from "../../race-card.interface"
@Component({
  selector: 'app-race-card',
  standalone:true,
  imports: [],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCardComponent {
  @Input() race!: Race; /* @Input permite que el componente padre
   pase datos al componente hijo*/
/* race!: Race define una propiedad llamada race
 que debe ser del tipo Race(interfaz que cree) el ! es no-nulo,
  sera inicializada por el componente padre*/


  constructor(){}
}
