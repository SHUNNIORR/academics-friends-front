import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DinamicDialogComponent } from '../../components/dinamic-dialog/dinamic-dialog.component';
import { DynamicFormData } from '../../models/DynamicFormData';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDynamicDialog(title: string, formData: DynamicFormData): MatDialogRef<any> {
    const dialogRef = this.dialog.open(DinamicDialogComponent, {
      data: {
        title,
        formData,
      },
      width: '400px', // Ajusta el ancho según tus necesidades
    });

    return dialogRef;
  }
}
