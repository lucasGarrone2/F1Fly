import { TestBed } from '@angular/core/testing';

import { ListaFavClient } from './lista-fav-client';

describe('ListaFavClient', () => {
  let service: ListaFavClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaFavClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
