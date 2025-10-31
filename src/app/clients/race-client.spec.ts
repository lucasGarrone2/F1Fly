import { TestBed } from '@angular/core/testing';

import { RaceClient } from './race-client';

describe('RaceClient', () => {
  let service: RaceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
