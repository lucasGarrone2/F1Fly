import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Race} from '../../race-card.interface';
import { RaceCardComponent } from '../race-card/race-card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RaceCardComponent, RouterLink],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home {

  races: Race[] =[
    
       {
            title: 'Gran Premio de Mónaco',
            circuit: 'Circuit de Monaco',
            location: 'Mónaco',
            date: '26 de Mayo, 2024',
            status: 'Expirada',
            imageURL: 'monaco.png'
        },
        {
            title: 'Gran Premio de Azerbaiyán',
            circuit: 'Baku City Circuit',
            location: 'Azerbaiyán',
            date: '15 de Septiembre, 2024',
            status: 'Expirada',
            imageURL: 'baku.png'
    },
    {
            title: 'Gran Premio de la ciudad de Mexico',
            circuit: 'Autodromo Hermanos Rodriguez',
            location: 'Mexico',
            date: '26 de Octubre, 2025',
            status: 'Proxima',
            imageURL: 'mexico.png'
      },
  ];
  constructor(){};
}
