import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFavoritosCarrera } from './lista-favoritos-carrera';

describe('ListaFavoritosCarrera', () => {
  let component: ListaFavoritosCarrera;
  let fixture: ComponentFixture<ListaFavoritosCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFavoritosCarrera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFavoritosCarrera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
