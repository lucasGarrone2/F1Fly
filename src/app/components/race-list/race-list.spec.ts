import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceList } from './race-list';

describe('RaceList', () => {
  let component: RaceList;
  let fixture: ComponentFixture<RaceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
