import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Race} from '../../race-card.interface';
import { RaceCardComponent } from '../race-card/race-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RaceCardComponent],
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
            status: 'Proxima',
            imageURL: 'monaco.png'
        },
        {
            title: 'Gran Premio de Azerbaiyán',
            circuit: 'Baku City Circuit',
            location: 'Azerbaiyán',
            date: '15 de Septiembre, 2024',
            status: 'Proxima',
            imageURL: 'baku.png'
    },
  ];
  constructor(){};
}
