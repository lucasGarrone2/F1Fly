import { Component, inject } from '@angular/core';
import { Carrera } from '../carrera/carrera-interface';
import { CarreraClient } from '../carrera/carrera-client';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details-carrera',
  imports: [],
  templateUrl: './details-carrera.html',
  styleUrl: './details-carrera.css'
})
export class DetailsCarrera {
  protected readonly client = inject(CarreraClient);
  protected readonly route = inject(ActivatedRoute);

  protected readonly id_bus = this.route.snapshot.paramMap.get('id');
  protected readonly carrera_bus = toSignal(this.client.getCarrera_ID(this.id_bus!));

  


}
