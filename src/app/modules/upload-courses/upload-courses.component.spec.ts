import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCoursesComponent } from './upload-courses.component';

describe('UploadCoursesComponent', () => {
  let component: UploadCoursesComponent;
  let fixture: ComponentFixture<UploadCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCoursesComponent]
    });
    fixture = TestBed.createComponent(UploadCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
