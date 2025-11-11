import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Vuelo } from '../vuelo/vuelo-interface';
import { VueloService } from '../vuelo/vuelo-service';

@Component({
  selector: 'app-vuelo-form',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './vuelo-form.html',
  styleUrl: './vuelo-form.css'
})
export class VueloForm implements OnInit{

  private fb = inject(FormBuilder);
  private vueloService = inject(VueloService);

  readonly estadoEdicion = input<boolean>(false);
  readonly vueloEditar = input<Vuelo | undefined>(undefined);
  readonly cerrarFormulario = output<void>();

  form!: FormGroup;

  clasesAsiento: ('Economy' | 'Business' | 'Premiun Economy' | 'First Class')[] = [
    'Economy',
    'Business',
    'Premiun Economy',
    'First Class'
  ];

  ngOnInit(): void {
    this.initForm();
    if(this.estadoEdicion() && this.vueloEditar()){
      this.populateForm(this.vueloEditar()!);
    }
  }

  initForm(): void{
    this.form = this.fb.group({
      id: [''],
      carrera_id: [null, [Validators.required, Validators.min(1)]],
      pais_origen: ['', Validators.required],
      pais_destino: ['', Validators.required],
      ciudad_destino: ['', Validators.required],
      aerolinea: ['', Validators.required],
      fecha_disponible: ['', Validators.required],
      tipo_avion: ['', Validators.required],
      clase_asiento: ['Economy', Validators.required],
      precio_promedio_ticket_eur: [null, [Validators.required, Validators.min(50)]],
    });
  }

  populateForm(vuelo: Vuelo): void{
    this.form.patchValue({
      id: vuelo.id,
      carrera_id: vuelo.carrera_id,
      pais_origen: vuelo.pais_origen,
      pais_destino: vuelo.pais_destino,
      ciudad_destino: vuelo.ciudad_destino,
      aerolinea: vuelo.aerolinea,
      fecha_disponible: vuelo.fecha_disponible,
      tipo_avion: vuelo.tipo_avion,
      clase_asiento: vuelo.clase_asiento,
      precio_promedio_ticket_eur: vuelo.precio_promedio_ticket_eur,
    });
    this.form.get('id')?.disable();
  }

  handleSubmit(): void{
    if (this.form.invalid){
      console.error('El formulario es invalido. Revise los campos');
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const pararCargaVuelo: Vuelo = {
        id: formValue.id || crypto.randomUUID(), 
        carrera_id: formValue.carrera_id,
        pais_origen: formValue.pais_origen,
        pais_destino: formValue.pais_destino,
        ciudad_destino: formValue.ciudad_destino,
        aerolinea: formValue.aerolinea,
        fecha_disponible: formValue.fecha_disponible,
        tipo_avion: formValue.tipo_avion,
        clase_asiento: formValue.clase_asiento,
        precio_promedio_ticket_eur: formValue.precio_promedio_ticket_eur,
    };

    if(this.estadoEdicion()){
      this.vueloService.updateVuelo(pararCargaVuelo).subscribe({
        next:()=>{
          console.log('Vuelo actualizado con exito.');
          this.cerrarForm();
        },
        error: (error) => console.error('Error al actualizar vuelo:', error)
      });
    }else{
      this.vueloService.addVuelo(pararCargaVuelo).subscribe({
        next: () => {
          console.log('Nuevo vuelo agregado con éxito.');
          this.cerrarForm();
      },
      error: (error) => console.error('Error al agregar vuelo', error)
      });
    }
  }

  cerrarForm(): void{
    this.cerrarFormulario.emit();
  }

}
