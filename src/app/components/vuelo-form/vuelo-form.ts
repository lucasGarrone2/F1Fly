import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IVuelo } from '../../interfaces/ivuelo';
import { VueloClient } from '../vuelo/vuelo-service';


@Component({
  selector: 'app-vuelo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vuelo-form.html',
  styleUrls: ['./vuelo-form.css']
})
export class VueloFormComponent implements OnInit {

  @Input() vuelo: IVuelo | null = null;
  @Input() modoEdicion: boolean = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizarLista = new EventEmitter<void>();

  fb = inject(FormBuilder);
  vuelosSrv = inject(VueloClient);

  form = this.fb.group({
    id: [null as string | number | null],
    carrera_id: ['', Validators.required],
    pais_origen: ['', Validators.required],
    ciudad_origen: ['', Validators.required],
    pais_destino: ['', Validators.required],
    ciudad_destino: ['', Validators.required],
    aerolinea: ['', Validators.required],
    fecha_disponible: ['', Validators.required],
    tipo_avion: ['', Validators.required],
    clase_asiento: ['', Validators.required],
    precio_promedio_ticket_eur: [0, Validators.required]
  });

  ngOnInit(): void {
    if (this.vuelo) {
      // ensure fields match form control types (carrera_id expected as string|null)
      const patch = {
        ...this.vuelo,
        carrera_id: this.vuelo.carrera_id !== null && this.vuelo.carrera_id !== undefined
          ? String(this.vuelo.carrera_id)
          : null,
        id: this.vuelo.id !== null && this.vuelo.id !== undefined
          ? String(this.vuelo.id)
          : this.vuelo.id ?? null
      };
      this.form.patchValue(patch);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value as IVuelo;

    if (this.modoEdicion) {
      this.vuelosSrv.updateVuelo(data, data.id!).subscribe(() => {
        this.actualizarLista.emit();
        this.cerrar.emit();
      });
    } else {
      this.vuelosSrv.addVuelo(data).subscribe(() => {
        this.actualizarLista.emit();
        this.cerrar.emit();
      });
    }
  }
}
