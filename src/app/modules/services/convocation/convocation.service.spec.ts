import { TestBed } from '@angular/core/testing';

import { ConvocationService } from './convocation.service';

describe('ConvocationService', () => {
  let service: ConvocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
