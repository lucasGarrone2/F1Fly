import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTemporada } from './info-temporada';

describe('InfoTemporada', () => {
  let component: InfoTemporada;
  let fixture: ComponentFixture<InfoTemporada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTemporada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTemporada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
