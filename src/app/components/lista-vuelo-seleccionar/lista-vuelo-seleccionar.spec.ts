import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVueloSeleccionar } from './lista-vuelo-seleccionar';

describe('ListaVueloSeleccionar', () => {
  let component: ListaVueloSeleccionar;
  let fixture: ComponentFixture<ListaVueloSeleccionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVueloSeleccionar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVueloSeleccionar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
