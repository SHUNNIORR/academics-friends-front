import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCoordinatorComponent } from './register-coordinator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { CoordinatorService } from '../../services/coordinator/coordinator.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { of, throwError } from 'rxjs';
import { CreateCoordinatorResponse } from '../../models/Coordinator';

describe('RegisterCoordinatorComponent', () => {
  let component: RegisterCoordinatorComponent;
  let fixture: ComponentFixture<RegisterCoordinatorComponent>;
  let coordinatorService: CoordinatorService
   let coreService:CoreService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCoordinatorComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(RegisterCoordinatorComponent);
    component = fixture.componentInstance;
    coordinatorService=TestBed.inject( CoordinatorService)
    coreService=TestBed.inject(CoreService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('createCoordinator',()=>{
    spyOn(coreService,'showMessage')
    spyOn(coordinatorService,'createCoordinator').and.returnValue(
      of({} as CreateCoordinatorResponse)
    )
    component.createCoordinator('example@ufps.edu.co')
    expect(coordinatorService.createCoordinator).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('createCoordinator',()=>{
    spyOn(coreService,'showMessage')
    spyOn(coordinatorService,'createCoordinator').and.returnValue(
      throwError({error:{message:'error'}})
    )
    component.createCoordinator('example@ufps.edu.co')
    expect(coordinatorService.createCoordinator).toHaveBeenCalled();
    expect(coreService.showMessage).toHaveBeenCalled();
    
  })
  it('onFormSubmit',()=>{
    spyOn(component,'createCoordinator')
    component.onFormSubmit({})
    expect(component.createCoordinator).toHaveBeenCalled();
    
  })
});
