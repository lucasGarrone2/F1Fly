import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarLayoutComponent } from './reservar-layout-component';

describe('ReservarLayoutComponent', () => {
  let component: ReservarLayoutComponent;
  let fixture: ComponentFixture<ReservarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
