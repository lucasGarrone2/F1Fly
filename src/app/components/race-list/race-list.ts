import { Component, computed, signal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceCardComponent } from '../race-card/race-card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarreraClient } from '../carrera/carrera-client';
import { ToastService } from '../../services/toast-service';
import { ToastComponent } from "../toast-component/toast-component";
import { ReservaClient } from '../../clients/reserva-client';

@Component({
  selector: 'app-race-list',
  imports: [RaceCardComponent, CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceList {
  private readonly client = inject(CarreraClient);
  protected raceSource = toSignal(this.client.getCarreras());

  private readonly formBuilder = inject(FormBuilder);

  constructor(private toastService: ToastService, private reserva: ReservaClient) {}

  ngOnInit() {
    this.toastService.show("🎊🎊Felicidades! Obtuviste un descuento del 5% utilizando el cupon F1FLY5 🏎️")
  }

  private readonly countryRegionMap: { [key: string]: string } = {
    'italia': 'europe',
    'españa': 'europe',
    'reino unido': 'europe',
    'mónaco': 'europe',
    'alemania': 'europe',
    'francia': 'europe',
    'países bajos': 'europe',
    'austria': 'europe',
    'bélgica': 'europe',
    'hungría': 'europe',
    'canadá': 'america',
    'estados unidos': 'america',
    'méxico': 'america',
    'brasil': 'america',
    'japón': 'asia',
    'china': 'asia',
    'singapur': 'asia',
    'bahrein': 'asia',
    'arabia saudita': 'asia',
    'qatar': 'asia',
    'azerbaiyán': 'asia',
    'australia': 'oceania'
  };

  private getRegionFromCountry(pais: string): string {
    const normalizedCountry = pais.toLowerCase().trim();
    return this.countryRegionMap[normalizedCountry] || 'other'; 
  }

  protected readonly dateFilter = signal<string[]>([]); 
  protected readonly regionFilter= signal<string[]>([]);

  protected readonly filteredRaces= computed(()=> {
    const races = this.raceSource(); 
    const dates = this.dateFilter();
    const regions = this.regionFilter();

    if(!races) return [];

    let filteredList = races;

    if(regions.length>0) {
      filteredList = filteredList.filter(race => {
        const raceRegion = this.getRegionFromCountry(race.pais_carrera);
        return regions.includes(raceRegion);
      });
    }

    if(dates.length>0) {
      filteredList = filteredList.filter(race => dates.includes(this.getQuarter(race.fecha_carrera)));
    }

    return filteredList;
  });

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const quarter = input.value; 
    const isChecked = input.checked;

    this.dateFilter.update(currentDates => {
      if (isChecked) {
        return [...currentDates, quarter]; 
      } else {
        return currentDates.filter(d => d !== quarter); 
      }
    });
  }

  onRegionChange(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const region = input.value;
    const isChecked = input.checked;

    this.regionFilter.update(currentRegions => {
      if (isChecked) {
        return [...currentRegions, region];
      } else {
        return currentRegions.filter(r => r !== region);
      }
    });
  }

  getQuarter(dateString: string): string {
    const month = new Date(dateString).getMonth() + 1;
    if(month <= 3) return 'q1';
    if(month <= 6) return 'q2'; 
    if(month <= 9) return 'q3';   
    return 'q4';
  }
}
