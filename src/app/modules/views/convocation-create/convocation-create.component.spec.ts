import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationCreateComponent } from './convocation-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ConvocationService } from '../../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { of, throwError } from 'rxjs';

describe('ConvocationCreateComponent', () => {
  let component: ConvocationCreateComponent;
  let fixture: ComponentFixture<ConvocationCreateComponent>;
  let datePipe:DatePipe
  let convocationService:ConvocationService;
  let coreService:CoreService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationCreateComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConvocationCreateComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    convocationService = TestBed.inject(ConvocationService);
    coreService = TestBed.inject(CoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngAfterViewInit',()=>{
    spyOn(component, 'getConvocationActiveService')
    component.ngAfterViewInit()
    expect(component.getConvocationActiveService).toHaveBeenCalled()
  })
  it('onFormSubmit',()=>{
    const createConvObj = {
      dateRange:{
        start:'',
        end:'',
        evaluationDate:'',
        resultsReleaseDate:''
      }
    }
    spyOn(component, 'createConvocationService')
    component.onFormSubmit(createConvObj)
    expect(component.createConvocationService).toHaveBeenCalled()
  })
  it('getConvocationActiveService',()=>{
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      of({})
    )
    component.getConvocationActiveService()
  })
  it('getConvocationActiveService error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(convocationService,'getConvocationActive').and.returnValue(
      throwError({message:''})
    )
    component.getConvocationActiveService()

  })
  it('getConvocationActiveService error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(convocationService,'createConvocation').and.returnValue(
      of({})
    )
    component.createConvocationService({})
    
  })
  it('getConvocationActiveService error',()=>{
    spyOn(coreService,'showMessage')
    spyOn(convocationService,'createConvocation').and.returnValue(
      throwError({error:{message:''}})
    )
    component.createConvocationService({})
    
  })
});
