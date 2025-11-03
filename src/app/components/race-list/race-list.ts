import { Component, linkedSignal } from '@angular/core';
import { inject } from '@angular/core';
import { RaceClient } from '../../services/race-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceCardComponent } from '../race-card/race-card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-race-list',
  imports: [RaceCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './race-list.html',
  styleUrl: './race-list.css'
})
export class RaceList {
private readonly client = inject(RaceClient);
protected raceSource = toSignal(this.client.getRaces());
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
}
