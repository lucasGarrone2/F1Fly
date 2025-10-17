import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCard } from './race-card';

describe('RaceCard', () => {
  let component: RaceCard;
  let fixture: ComponentFixture<RaceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
