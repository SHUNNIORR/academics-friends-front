import { AcademicFriendsService } from './../services/academic-friends/academic-friends.service';
import { Convocation, QUALIFY_STUDENT, TABLE_COLUMNS_NAME_STUDENTS, optionsTableStudentRegistered } from './../metadata/convocation/convocation.metadata';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConvocationService } from '../services/convocation/convocation.service';
import { CoreService } from 'src/app/core/services/core/core.service';
import { TABLE_COLUMNS_NAME_CONVOCATION } from '../metadata/convocation/convocation.metadata';
import { ReportResponse, UPDATE_REPORT_AACA } from '../metadata/upload-report/upload-report.metadata';
import { FileService } from '../services/file/file.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-convocation-consult',
  templateUrl: './convocation-consult.component.html',
  styleUrls: ['./convocation-consult.component.scss'],
})
export class ConvocationConsultComponent {
  tableData: any[] = [];
  columnNames = TABLE_COLUMNS_NAME_CONVOCATION;
  studentsRegisteredColumnNames = TABLE_COLUMNS_NAME_STUDENTS;
  optionsData = optionsTableStudentRegistered;
  reports: any[] = [
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'report/28371b4c-05f7-49e1-a55b-a8ab845b3a97.pdf',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
    {
      email: 'prueba1@ufps.edu.co',
      name: 'Prueba',
      code: '1151705',
      type: 'xxx',
      semester: '7',
      status: 'active',
      resume: 'resume/xxx',
      score: 0,
      average: 4,
      observations: 'observations',
      contract: 'contract/xxx',
    },
  ];
  studentsTableData: any[] = [];
  activeConvocationId: number = 0;
  //studentsTableColumnNames
  constructor(
    private datePipe: DatePipe,
    private convocationService: ConvocationService,
    private coreService: CoreService,
    private academicFriendsService: AcademicFriendsService,
    private fileService: FileService,
    private dialogService:DialogService
  ) {}

  ngOnInit() {
    this.getConvocationActiveService();
  }
  onFormSubmit(formData: any): void {
    //console.log('Form submitted with data:', this.datePipe.transform(formData.dateRange.start,'dd/MM/yyyy HH:mm:ss'));
    console.log(
      'Form submitted with data:',
      this.formatCreateConvocationObj(formData)
    );
  }
  getConvocationActiveService() {
    this.convocationService.getConvocationActive().subscribe({
      next: (res: any) => {
        this.tableData = [res];
        this.activeConvocationId=res.id;
        this.getRegisteredStudentsByActiveConvocationService(res.id)
        //this.studentsTableData = this.reports;
        console.log(this.tableData);
      },
      error: (err: Error) => {
        this.coreService.showMessage(
          'Error al consultar convocatoria activa: ' + err.message
        );
      },
    });
  }

  getRegisteredStudentsByActiveConvocationService(id: number) {
    this.academicFriendsService
      .getAcademicFriendByConvocationActive(id)
      .subscribe({
        next: (res: any) => {
          this.studentsTableData = res;
        },
        error: (err: Error) => {
          this.coreService.showMessage(
            'Error al crear convocatoria: ' + err.message
          );
        },
      });
  }
  formatCreateConvocationObj(formData: any) {
    const { end, start } = formData.dateRange;
    const { evaluationDate, resultsReleaseDate } = formData;
    const convocationObj = {
      id: null,
      openingDate: this.formatDate(start),
      closingDate: this.formatDate(end),
      evaluationDate: this.formatDate(evaluationDate),
      resultsReleaseDate: this.formatDate(resultsReleaseDate),
    };
    return convocationObj;
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }

  handleCustomEvent(event: any) {
    if (event.id == 'downloadHV') {
      console.log('DESCARGAR');
      this.downloadFileService(event.element.resume);
    } else if (event.id == 'downloadContract'){
      this.downloadFileService(event.element.contract);
    } else if (event.id == 'qualify'){
      console.log('Calificar')
      this.openDialogQualifyStudent(event)
    }
  } 
  downloadFileService(fileUrl:string){
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
  openDialogQualifyStudent(data:any){
    const formData = QUALIFY_STUDENT
    this.dialogService.openDynamicDialog('Calificar estudiante', formData)
      .afterClosed()
      .subscribe((res:any) => {
          console.log(res)
          console.log('data',data)
         const objToQualifyStudent = {
            email:data.element.email,
            score:Number(res.score),
            observations:res.observations,
            state:data.element.status,
            password:null
          }
          this.qualifyStudentService(objToQualifyStudent)
      });
  }

  qualifyStudentService(objToQualifyStudent:any){
    this.academicFriendsService.updateAcademicFriend(objToQualifyStudent).subscribe({
      next:(res) => {
        this.getRegisteredStudentsByActiveConvocationService(this.activeConvocationId)
        this.coreService.showMessage('Calificación registrada correctamente');
      },
      error:(err:any)=>{
        this.coreService.showMessage('Hubo un error descargando el archivo:'+ err.message);
      }
    })
  }
}
