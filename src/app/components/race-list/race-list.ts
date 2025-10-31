import { Component, linkedSignal } from '@angular/core';
import { inject } from '@angular/core';
import { RaceClient } from '../../services/race-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceCardComponent } from '../race-card/race-card';

@Component({
  selector: 'app-race-list',
  imports: [RaceCardComponent],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceList {
private readonly client = inject(RaceClient);
protected raceSource = toSignal(this.client.getRaces());

}
