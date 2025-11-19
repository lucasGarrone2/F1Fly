import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaRechazada } from './reserva-rechazada';

describe('ReservaRechazada', () => {
  let component: ReservaRechazada;
  let fixture: ComponentFixture<ReservaRechazada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaRechazada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaRechazada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
