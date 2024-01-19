import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentAcademicFriendComponent } from './enrollment-academic-friend.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('EnrollmentAcademicFriendComponent', () => {
  let component: EnrollmentAcademicFriendComponent;
  let fixture: ComponentFixture<EnrollmentAcademicFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentAcademicFriendComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(EnrollmentAcademicFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
