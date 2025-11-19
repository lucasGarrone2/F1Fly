import { TestBed } from '@angular/core/testing';

import { ClientListaReservas } from './client-lista-reservas';

describe('ClientListaReservas', () => {
  let service: ClientListaReservas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListaReservas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
