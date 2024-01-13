import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/services/core/core.service';
import { CREATE_REPORT, QUALIFY_REPORT_AACA, ReportResponse, UPDATE_REPORT_AACA } from 'src/app/modules/metadata/upload-report/upload-report.metadata';
import { FileService } from 'src/app/modules/services/file/file.service';
import { DinamicDialogComponent } from '../dinamic-dialog/dinamic-dialog.component';
import { DinamicFormComponent } from '../dinamic-form/dinamic-form.component';
import { DialogService } from '../../services/dialog/dialog.service';
import { Validators } from '@angular/forms';
import { ReportService } from 'src/app/modules/services/report/report.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() data:ReportResponse | null = null
  @Input() coordinator: boolean = false;

  constructor(private coreService:CoreService, private fileService:FileService, public dialog:MatDialog,private dialogService: DialogService, private reportService:ReportService){

  }
  downloadReport(fileUrl:string){
    this.fileService.downloadFile(fileUrl).subscribe({
      next:blob => {
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileUrl}`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage("Archivo descargado con éxito")
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error descargando el archivo:'+ err.message);
      }
    })
  }
  openDialogCorrectReport(reportId:number){
    const formData = UPDATE_REPORT_AACA
    this.dialogService.openDynamicDialog('Corregir informe de asesorias', formData)
      .afterClosed()
      .subscribe((res:any) => {
        const file:File = res.file
          console.log(res)
          this.correctReportService(reportId,file)
      });
  }

  openDialogQualifyReport(reportId:number){
    console.log(reportId)
    const formData = QUALIFY_REPORT_AACA
    this.dialogService.openDynamicDialog('Calificar informe de asesorias', formData)
      .afterClosed()
      .subscribe((res:any) => {
        const file:File = res.file
        console.log(res)
        if(res == ''){
          return
        }
        if(res.file != ""){
          this.correctReportService(reportId,file)
        }
        delete res.file
        const objToQualify={
          id: reportId,
          ...res
        }
        //this.qualifyReportService(objToQualify);
      });
  }
  qualifyReportService(reportObj:any){
    this.reportService.updateReport(reportObj).subscribe({
      next: (res:any) => {
        this.coreService.showMessage('Reporte Calificado correctamente!');
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error calificando el reporte:'+ err.error.message);
      }
    })
  }
  correctReportService(reportId:number, file:File){
    this.reportService.correctReport(reportId,file).subscribe({
      next: (res:any) => {
        this.coreService.showMessage('Reporte corregido correctamente!');
      },
      error:(err:any)=>{
        console.log(err)
        this.coreService.showMessage('Hubo un error actualizando el reporte:'+ err.error.message);
      }
    })
  }

}
