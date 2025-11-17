import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloForm } from './vuelo-form';

describe('VueloForm', () => {
  let component: VueloForm;
  let fixture: ComponentFixture<VueloForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueloForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueloForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
