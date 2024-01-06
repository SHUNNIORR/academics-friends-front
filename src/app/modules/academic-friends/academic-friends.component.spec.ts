import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicFriendsComponent } from './academic-friends.component';

describe('AcademicFriendsComponent', () => {
  let component: AcademicFriendsComponent;
  let fixture: ComponentFixture<AcademicFriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicFriendsComponent]
    });
    fixture = TestBed.createComponent(AcademicFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
