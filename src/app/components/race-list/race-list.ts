import { Component, computed, linkedSignal, signal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceCardComponent } from '../race-card/race-card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { every, race } from 'rxjs';
import { CarreraClient } from '../carrera/carrera-client';

@Component({
  selector: 'app-race-list',
  imports: [RaceCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceList {
private readonly client = inject(CarreraClient);
protected raceSource = toSignal(this.client.getCarreras());
private readonly formBuilder = inject(FormBuilder);
priceForm = new FormGroup({
    
    
    minPrice: new FormControl(50, [ // Valor inicial 50
      Validators.required, 
      Validators.min(50),  
      Validators.max(1000)
    ]),
    
    maxPrice: new FormControl(1000, [ // Valor inicial 1000
      Validators.required,
      Validators.min(50),
      Validators.max(1000)
    ])
    
  });


  get minPrice() {
    return this.priceForm.get('minPrice');
  }

  get maxPrice() {
    return this.priceForm.get('maxPrice');
  }

  /**Diccionario para el tema de las regiones y paises */
private readonly countryRegionMap: { [key: string]: string } = {
    // Europa
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

    // America
    'canadá': 'america',
    'estados unidos': 'america',
    'méxico': 'america',
    'brasil': 'america',

    // Asia
    'japón': 'asia',
    'china': 'asia',
    'singapur': 'asia',
    'bahrein': 'asia',
    'arabia saudita': 'asia',
    'qatar': 'asia',
    'azerbaiyán': 'asia',

    // Oceania
    'australia': 'oceania'
  };

  
  private getRegionFromCountry(pais: string): string {
    // Normalizamos el país (minúsculas y sin espacios extra)
    const normalizedCountry = pais.toLowerCase().trim();
    
    // Busca en el mapa y, si no lo encuentra, devuelve 'other'
    return this.countryRegionMap[normalizedCountry] || 'other'; 
  }

  /*Codigo para los filtros*/

  /*Signals para almacenar los filtros*/
  
  protected readonly priceFilter= signal({min: 50, max:1000});
  protected readonly dateFilter = signal<string[]>([]); 
  protected readonly regionFilter= signal<string[]>([]);

  /*Signal computado, esto recalcula sola cada vez que raceSource o cualquier filtro cambie, entonces se cambia lo que se muestra */

  protected readonly filteredRaces= computed(()=> {
    const races= this.raceSource(); /**Se agarra la lista original */
    
    /**Obtenemos los valores actuales de las variables o filtros */
    const price = this.priceFilter();
    const dates= this.dateFilter();
    const regions= this.regionFilter();

    /**Si no cargo devuelve un arreglo vacio */
    if(!races)
    {
      return [];
    }

    let filteredList = races.filter(race => race.precio_carrera >= price.min && race.precio_carrera <= price.max);
    

    if(regions.length>0)
    {
      filteredList= filteredList.filter(race =>{
        const raceRegion = this.getRegionFromCountry(race.pais_carrera);
        return regions.includes(raceRegion);
      });
    }

     if(dates.length>0)
   {
     filteredList = filteredList.filter(race => {
      dates.includes(this.getQuarter(race.fecha_carrera));
      return dates.includes(this.getQuarter(race.fecha_carrera));
    });
   }
   return filteredList;
  });

  /**Handlers para actualizar los signals */

  applyPriceFilter()
  {
    if(this.priceForm.invalid)
    {
      return;
    }
    const min= this.minPrice?.value ?? 0;
    const max= this.maxPrice?.value ?? 1000;

    this.priceFilter.set({min, max});
  }
    /**Para los checked de las fechas */

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
 /**Para los checked de las regiones */
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
   getQuarter(dateString: string): string{
      const month = new Date(dateString).getMonth()+1;
      if(month <= 3) return 'q1';
      if(month <= 6) return 'q2'; 
      if(month <= 9) return 'q3';   
      return 'q4';
    }
  }
 
  


