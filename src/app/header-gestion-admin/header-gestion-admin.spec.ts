import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGestionAdmin } from './header-gestion-admin';

describe('HeaderGestionAdmin', () => {
  let component: HeaderGestionAdmin;
  let fixture: ComponentFixture<HeaderGestionAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderGestionAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderGestionAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
