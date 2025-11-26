import { TestBed } from '@angular/core/testing';

import { F1api } from './f1api';

describe('F1api', () => {
  let service: F1api;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1api);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
