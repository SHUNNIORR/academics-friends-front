import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancySaveComponent } from './consultancy-save.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { CoursesService } from '../../services/courses/courses.service';
import { of, throwError } from 'rxjs';

describe('ConsultancySaveComponent', () => {
  let component: ConsultancySaveComponent;
  let fixture: ComponentFixture<ConsultancySaveComponent>;
  let datePipe:DatePipe;
  let consultancyService: ConsultancyService;
  let coreService:CoreService;
  let courseService:CoursesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancySaveComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConsultancySaveComponent);
    component = fixture.componentInstance;
    consultancyService = TestBed.inject(ConsultancyService)
    coreService=TestBed.inject(CoreService);
    courseService=TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onFormSubmit',()=>{
    spyOn(component,'saveConsultancyService')
    component.onFormSubmit({})
    expect(component.saveConsultancyService).toHaveBeenCalled();
  })
  it('saveConsultancyService',()=>{
    spyOn(coreService,'showMessage')
    spyOn(consultancyService,'saveConsultancy').and.returnValue(
      of({})
    )
    component.saveConsultancyService({})

    expect(coreService.showMessage).toHaveBeenCalled();
  })
  it('saveConsultancyService',()=>{
    spyOn(coreService,'showMessage')
    spyOn(consultancyService,'saveConsultancy').and.returnValue(
      throwError({error:{message: 'error'}})
    )
    component.saveConsultancyService({})

    expect(coreService.showMessage).toHaveBeenCalled();
  })
});
