import { Component, ChangeDetectorRef } from '@angular/core';
import { F1api } from '../../services/f1api';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-info-temporada',
  imports: [],
  templateUrl: './info-temporada.html',
  styleUrl: './info-temporada.css'
})
export class InfoTemporada {
  pilots: any[] = [];
  constructors: any[] = [];
  races: any[] = [];
  lastRace: any = null;
  nextRace: any = null;

  loading = true;

  constructor(private f1: F1api, private cdr: ChangeDetectorRef){}

  ngOnInit()
  {
    this.loadData();
  }

  loadData()
  {
    this.loading=true;

    forkJoin({
      drivers: this.f1.getDriverStandings(),
      constructors: this.f1.getConstructorStandings(),
      schedule: this.f1.getRaceSchedule(),
      last: this.f1.getLastRaceResults(),
      next: this.f1.getNextRace()
    }).subscribe({
      next: (res: any) => {
        
        this.pilots = res.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;


        this.constructors = res.constructors.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        this.races = res.schedule.MRData.RaceTable.Races;

        this.lastRace = res.last.MRData.RaceTable.Races[0];

        this.nextRace = res.next.MRData.RaceTable.Races[0];

       
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando datos de F1:', err);
        
        this.loading = false; 
      }
    });
  }
  }

