import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicFriendCardComponent } from './academic-friend-card.component';

describe('AcademicFriendCardComponent', () => {
  let component: AcademicFriendCardComponent;
  let fixture: ComponentFixture<AcademicFriendCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicFriendCardComponent]
    });
    fixture = TestBed.createComponent(AcademicFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
