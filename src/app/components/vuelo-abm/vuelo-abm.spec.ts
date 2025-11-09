import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloAbm } from './vuelo-abm';

describe('VueloAbm', () => {
  let component: VueloAbm;
  let fixture: ComponentFixture<VueloAbm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueloAbm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueloAbm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
