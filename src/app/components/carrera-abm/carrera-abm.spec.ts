import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraAbm } from './carrera-abm';

describe('CarreraAbm', () => {
  let component: CarreraAbm;
  let fixture: ComponentFixture<CarreraAbm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraAbm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraAbm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
