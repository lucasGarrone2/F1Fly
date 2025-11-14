import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloList } from './vuelo-list';

describe('VueloList', () => {
  let component: VueloList;
  let fixture: ComponentFixture<VueloList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueloList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueloList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
