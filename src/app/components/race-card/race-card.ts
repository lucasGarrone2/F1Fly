import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrera } from '../carrera/carrera-interface';
import { ReservaClient } from '../../clients/reserva-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-race-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './race-card.html',
  styleUrl: './race-card.css'
})
export class RaceCardComponent implements OnInit {
  @Input() race!: Carrera;
  @Input() layout: 'carousel' | 'list' = 'carousel';

   private readonly sanitizer = inject(DomSanitizer);
    public safeImageUrl!: SafeUrl; 

    ngOnInit(): void {
      
        if (this.race.imageUrl_carrera) {
            this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.race.imageUrl_carrera);
        }
    }
  constructor(private reserva: ReservaClient, private router: Router){}

    /**
     * Determina el estado de la carrera (Próxima, Pasada, Hoy).
     * @param raceDate La fecha de la carrera (ej: '2025-04-13').
     * @returns 'upcoming', 'past', o 'today'.
     */
    getRaceStatus(raceDate: string): 'upcoming' | 'past' | 'today' {
        // Obtenemos las fechas al inicio del día para comparaciones justas
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        const race = new Date(raceDate);
        race.setHours(0, 0, 0, 0);

        const raceTime = race.getTime();
        const todayTime = today.getTime();

        const dayInMilliseconds = 24 * 60 * 60 * 1000;

        if (raceTime > todayTime) {
            // Si la fecha de la carrera es posterior a hoy
            return 'upcoming'; 
        } else if (raceTime < todayTime) {
            // Si la fecha de la carrera es anterior a hoy
            return 'past';
        } else { 
            // Si ambas fechas son iguales (Hoy)
            return 'today';
        }
    }
    reservarCarrera(race: Carrera)
    {
        this.reserva.setCarrera(race);
        this.router.navigate(['/reservar/hoteles']);
    }
}
