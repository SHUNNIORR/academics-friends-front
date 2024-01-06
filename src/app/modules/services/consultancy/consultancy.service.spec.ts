import { TestBed } from '@angular/core/testing';

import { ConsultancyService } from './consultancy.service';

describe('ConsultancyService', () => {
  let service: ConsultancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
