import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCoursesComponent } from './upload-courses.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreService } from 'src/app/core/services/core/core.service';
import { CoursesService } from '../../services/courses/courses.service';
import { of, throwError } from 'rxjs';

describe('UploadCoursesComponent', () => {
  let component: UploadCoursesComponent;
  let fixture: ComponentFixture<UploadCoursesComponent>;
  let coursesService: CoursesService;
  let coreService: CoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCoursesComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(UploadCoursesComponent);
    component = fixture.componentInstance;
    coursesService= TestBed.inject(CoursesService);
    coreService= TestBed.inject(CoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Calls 'createCourses' method with the 'file' property of the 'formData' parameter
  it('should call createCourses method with the file property of the formData parameter', () => {
    const formData = { file: new File([], 'test.txt') };
    spyOn(component, 'createCourses');

    component.onFormSubmit(formData);

    expect(component.createCourses).toHaveBeenCalledWith(formData.file);
  });
  it('should show success message after creating courses', () => {
    // Arrange
    const file = new File([""], "validFile.csv");
    spyOn(coursesService, 'createCourses').and.returnValue(of({}));
    spyOn(coreService, 'showMessage');

    // Act
    component.createCourses(file);

    // Assert
    expect(coreService.showMessage).toHaveBeenCalledWith("Cursos cargados con exito");
  });
  it('should show success message after creating courses', () => {
    // Arrange
    const file = new File([""], "validFile.csv");
    spyOn(coursesService, 'createCourses').and.returnValue(
      throwError({message:'error'})
    );
    spyOn(coreService, 'showMessage');

    // Act
    component.createCourses(file);

    // Assert
    expect(coreService.showMessage).toHaveBeenCalledWith("Error creando cursos: error");
  });
});
