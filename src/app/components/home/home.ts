import { Component, inject, input, linkedSignal } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Race} from '../../race-card.interface';
import { RaceCardComponent } from '../race-card/race-card';
import { RouterLink } from "@angular/router";
import { RaceClient } from '../../services/race-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RaceCardComponent, RouterLink],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home {
  private readonly client = inject(RaceClient);
  protected raceSource = toSignal(this.client.getRaces());

  
  @ViewChild('racesContainer', { static: false }) racesContainer!: ElementRef;

  scrollCarousel(direction: 'left' | 'right') {
    const container = this.racesContainer.nativeElement;
    const cardWidth = 340; // ancho aproximado de una card + margen

    if (direction === 'left') {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }

 

}
