import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCarrera } from './details-carrera';

describe('DetailsCarrera', () => {
  let component: DetailsCarrera;
  let fixture: ComponentFixture<DetailsCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCarrera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCarrera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
