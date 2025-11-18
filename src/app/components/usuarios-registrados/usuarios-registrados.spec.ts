import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRegistrados } from './usuarios-registrados';

describe('UsuariosRegistrados', () => {
  let component: UsuariosRegistrados;
  let fixture: ComponentFixture<UsuariosRegistrados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosRegistrados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosRegistrados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
