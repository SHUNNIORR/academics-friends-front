import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DynamicFormData } from '../../models/DynamicFormData';
import { DinamicDialogComponent } from '../../components/dinamic-dialog/dinamic-dialog.component';

class MatDialogMock {
  open(): MatDialogRef<any> {
    return {
      afterClosed: () => of(true), // You can adjust this based on your needs
    } as MatDialogRef<any>;
  }
}
describe('DialogService', () => {
  let service: DialogService;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule],
      providers: [
        DialogService,
        { provide: MatDialog, useClass: MatDialogMock },
      ],
    });

    service = TestBed.inject(DialogService);
    matDialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dynamic dialog', () => {
    const title = 'Test Title';
    const formData: DynamicFormData = {} as DynamicFormData; // Provide relevant data for testing

    const dialogRefSpy = spyOn(matDialog, 'open').and.callThrough();

    const result = service.openDynamicDialog(title, formData);

    expect(result).toBeDefined();
    expect(dialogRefSpy).toHaveBeenCalledOnceWith(DinamicDialogComponent, {
      data: { title, formData },
      width: '400px', // Adjust this based on your needs
    });
  });
});
