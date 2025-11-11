import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAbm } from './hotel-abm';

describe('HotelAbm', () => {
  let component: HotelAbm;
  let fixture: ComponentFixture<HotelAbm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAbm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAbm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
