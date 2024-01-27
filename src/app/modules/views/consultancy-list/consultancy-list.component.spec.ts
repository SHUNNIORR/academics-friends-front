import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyListComponent } from './consultancy-list.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { FileService } from '../../services/file/file.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

describe('ConsultancyListComponent', () => {
  let component: ConsultancyListComponent;
  let fixture: ComponentFixture<ConsultancyListComponent>;
  let coreService: CoreService;
  let consultancyService: ConsultancyService;
  let fileService: FileService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancyListComponent],
      imports:[MatSnackBarModule,HttpClientTestingModule,BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(ConsultancyListComponent);
    component = fixture.componentInstance;
       coreService= TestBed.inject(CoreService);
     consultancyService= TestBed.inject(ConsultancyService);
     fileService= TestBed.inject(FileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getAllConsultancy',()=>{
    component.email ='email@example.com';
    spyOn(consultancyService,'getAllConsultancyByEmail').and.returnValue(
      throwError({error:{message:'error'}})
    )
    component.getAllConsultancy();
  })
  it('should download file successfully', () => {
    const fileUrl = 'valid_file_url';
    const blob = new Blob(['dummy content'], { type: 'application/octet-stream' });
    spyOn(fileService,'convertFile').and.returnValue(of(blob));
    spyOn(coreService,'showMessage')
    component.downloadConsultancies([],fileUrl);

    expect(fileService.convertFile).toHaveBeenCalledWith([]);
    expect(coreService.showMessage).toHaveBeenCalledWith('Archivo descargado con éxito');
  });
});
