import { TestBed } from '@angular/core/testing';

import { AcademicFriendsService } from './academic-friends.service';

describe('AcademicFriendsService', () => {
  let service: AcademicFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
