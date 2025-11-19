import { Component, Input, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrera } from '../carrera/carrera-interface';
import { ReservaClient } from '../../clients/reserva-client';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { FavCarrera } from '../../interfaces/fav-carrera';
import { ListaFavClient } from '../../services/lista-fav-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../auth/auth-service';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule, Validators } from "@angular/forms";

import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-race-card',
  standalone:true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, ReactiveFormsModule],
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
  constructor(private reserva: ReservaClient, private router: Router, private auth: AuthService){}

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

        if(!this.tipoEntradaSeleccionada){
            alert('No selecciono el tipo de entrada!');
        }else{

        if(this.tipoEntradaSeleccionada === 'Regular'){
            race.precio_carrera = race.precio_entrada_regular * this.cantidadSeleccionada!;
        }else if(this.tipoEntradaSeleccionada === 'Premium'){
            race.precio_carrera = race.precio_entrada_premium * this.cantidadSeleccionada!;
        }else if(this.tipoEntradaSeleccionada === 'VIP'){
            race.precio_carrera = race.precio_entrada_vip * this.cantidadSeleccionada!;
        }


        if(!this.auth.isLoggedin())
        {
            this.router.navigate(['/inicio_sesion']);
            return;
        }
        
        this.reserva.setCantidadPersonas(this.cantidadSeleccionada!); 
        
       race.tipo_entrada = this.tipoEntradaSeleccionada;
        this.reserva.setCarrera(race, this.cantidadSeleccionada!);

        

        this.router.navigate(['/reservar/hoteles']);
    }
    }


    protected readonly client_fav = inject(ListaFavClient);
    protected readonly fb = inject(FormBuilder);
    
    protected readonly tipos_ent = ['Regular','Premium', 'VIP'];
    protected readonly cantidades = [1,2,3,4,5,6];


    
    protected readonly form = this.fb.nonNullable.group({
    tipo_entrada: ['', [Validators.required]],
    precio_carrera: [0, [Validators.required]],
    cantidad: [null,[Validators.required]]
    });

    get precio_carrera(){
        return this.form.controls.precio_carrera;
    }

    get tipo_entrada(){
    return this.form.controls.tipo_entrada;
  }
    get tipoEntradaSeleccionada() {
  return this.form.controls.tipo_entrada.value;
  }

   get cantidad(){
    return this.form.controls.cantidad;
   }

   get cantidadSeleccionada(){
    return this.form.controls.cantidad.value;
   }

    botonVerMas(c : Carrera){
        this.router.navigateByUrl('carrera-details/' + c.id);
    }

    botonFavoritos(carrera_fav : Carrera){
        const user = this.auth.activeUser(); 
        
        if (!user) {
            alert("Debe iniciar sesión para agregar favoritos");
            return;
        }else{
        const fav_carrera: FavCarrera = {
            id_user: user.id!,
            carrera: carrera_fav 
        };

        this.client_fav.getFavoritosByCarreraId(carrera_fav.id!).subscribe((existe) => {

        const existe_user = existe.filter((fav) => fav.id_user === fav_carrera.id_user);
        
        if (existe_user.length === 0) {
        this.client_fav.addFavoritos(fav_carrera).subscribe(() => {
          alert('Carrera agregada con éxito a sus favoritos!');
          window.location.reload();
        });
        } else {
        alert('Carrera ya existente en su lista');
        }});
        
    }
    }

    

}
