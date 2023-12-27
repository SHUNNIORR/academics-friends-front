import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentAcademicFriendComponent } from './enrollment-academic-friend.component';

describe('EnrollmentAcademicFriendComponent', () => {
  let component: EnrollmentAcademicFriendComponent;
  let fixture: ComponentFixture<EnrollmentAcademicFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentAcademicFriendComponent]
    });
    fixture = TestBed.createComponent(EnrollmentAcademicFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
