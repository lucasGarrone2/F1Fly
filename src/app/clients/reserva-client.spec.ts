import { TestBed } from '@angular/core/testing';

import { ReservaClient } from './reserva-client';

describe('ReservaClient', () => {
  let service: ReservaClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
