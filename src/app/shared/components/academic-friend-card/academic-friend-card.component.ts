import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/services/core/core.service';
import { ReportResponse, UPDATE_REPORT_AACA } from 'src/app/modules/metadata/upload-report/upload-report.metadata';
import { FileService } from 'src/app/modules/services/file/file.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ReportService } from 'src/app/modules/services/report/report.service';

@Component({
  selector: 'app-academic-friend-card',
  templateUrl: './academic-friend-card.component.html',
  styleUrls: ['./academic-friend-card.component.scss'],
})
export class AcademicFriendCardComponent {
  @Input() data: any | null = null;
  @Input() coordinator: boolean = false;

  constructor(
    private coreService: CoreService,
    private fileService: FileService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private reportService: ReportService
  ) {}
  downloadReport(fileUrl: string) {
    this.fileService.downloadFile(fileUrl).subscribe({
      next: (blob) => {
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileUrl}`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage('Archivo descargado con éxito');
      },
      error: (err: any) => {
        this.coreService.showMessage(
          'Hubo un error descargando el archivo:' + err.message
        );
      },
    });
  }
  openDialogCorrectReport(reportId: number) {
    const formData = UPDATE_REPORT_AACA;
    this.dialogService
      .openDynamicDialog('Corregir informe de asesorias', formData)
      .afterClosed()
      .subscribe((res: any) => {
        if(res == ''){
          return
        }
        const file: File = res.file;
        console.log(res);
        this.correctReportService(reportId, file);
      });
  }

  correctReportService(reportId: number, file: File) {
    this.reportService.correctReport(reportId, file).subscribe({
      next: (res: any) => {
        this.coreService.showMessage('Reporte corregido correctamente!');
      },
      error: (err: Error) => {
        this.coreService.showMessage(
          'Hubo un error actualizando el reporte:' + err.message
        );
      },
    });
  }
}
