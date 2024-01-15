import { AcademicFriend } from '../../models/AcademicFriend';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Chart, registerables } from 'chart.js';
import { ConsultancyService } from '../../services/consultancy/consultancy.service';
import { DatePipe } from '@angular/common';
import { Consultancy } from '../../models/Consultancy';
import { FIND_CONSULTANCY_BY_COURSE, FIND_CONSULTANCY_BY_SEMESTER, TABLE_COLUMNS_NAME_CONSULTANCY } from '../../metadata/consultancy/consultancy.metadata';
import { CoreService } from 'src/app/core/services/core/core.service';
import { SEARCH_ACADEMIC_FRIEND_BY_EMAIL } from '../../metadata/academic-friend/academic-friend.metadata';
import { CoursesService } from '../../services/courses/courses.service';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  private activeChart: Chart | null = null; // Mantener un seguimiento del gráfico activo

  //indicador de semestre
  semester:string = 'Actual'
  //charts
  labels: any[] = [];
  data: any[] = [];
  allConsultancyDownloadObj:any[]=[];

  labelsxcourse: any[] = [];
  dataxcourse: any[] = [];
  courseName: string = '';
  allConsultancyXCourseDownloadObj:any[]=[];

  labelsxaf: any[] = [];
  dataxaf: any[] = [];
  allConsultancyXAFDownloadObj:any[]=[];
  //forms
  searchCourseByName = FIND_CONSULTANCY_BY_COURSE;
  searchAcademicFriendByEmail = SEARCH_ACADEMIC_FRIEND_BY_EMAIL;
  //tables
  allConsultancyTableData: any[] = [];
  allConsultancyColumnNames: any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  allConsultancyByCourseTableData: any[] = [];
  allConsultancyByCourseColumnNames: any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  consultancyByAFtableData: any[] = [];
  consultancyByAFcolumnNames: any[] = TABLE_COLUMNS_NAME_CONSULTANCY;

  //form to search by semester and age
  searchConsultanciesBySemester = FIND_CONSULTANCY_BY_SEMESTER;

  constructor(
    private consultancyService: ConsultancyService,
    private datePipe: DatePipe,
    private coreService: CoreService,
    private courseService:CoursesService,
    private fileService:FileService,
  ) {
    Chart.register(...registerables);
    this.searchConsultanciesBySemester.fields[0].selectOptions = this.getLastSevenYears();
  }

  ngOnInit() {
    this.getAllCoursesService()
    this.getConsultancyBetweenDatesService();
  }

  ngAfterViewInit() {
    this.renderChart('consultancyXcourses');
  }

  renderChart(chartId: string) {
    if (this.activeChart) {
      // Destruir el gráfico existente si hay uno activo
      this.activeChart.destroy();
    }

    // Esperar a que el elemento esté disponible y visible
    const intervalId = setInterval(() => {
      const chartElement = document.getElementById(chartId);
      if (chartElement && chartElement.offsetParent !== null) {
        clearInterval(intervalId);
        // Detener la espera
        if (chartId == 'consultancyXcourses') {
          this.createChart(chartId, this.data, this.labels);
        } else if (chartId == 'consultancyXcourse') {
          this.createChart(chartId, this.dataxcourse, this.labelsxcourse);
        } else {
          this.createChart(chartId, this.dataxaf, this.labelsxaf);
        }
      }
    }, 100);
  }

  createChart(chartId: string, data: any[], labels: string[]) {
    this.activeChart = new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# de asesorias',
            data: data,
            borderWidth: 1,
            backgroundColor: 'rgb(197, 40, 40)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getSemesterDates(): { startDate: Date; endDate: Date } {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let semesterStartDate: Date;
    let semesterEndDate: Date;

    if (currentMonth < 6) {
      semesterStartDate = new Date(currentYear, 0, 1);
      semesterEndDate = new Date(currentYear, 5, 30);
    } else {
      semesterStartDate = new Date(currentYear, 6, 1);
      semesterEndDate = new Date(currentYear, 11, 31);
    }

    return {
      startDate: semesterStartDate,
      endDate: semesterEndDate,
    };
  }
  onTabChange(event: number): void {
    const id: number = event;
    const charts: { [key: number]: string } = {
      0: 'consultancyXcourses',
      1: 'consultancyXcourse',
      2: 'consultancyXaf',
    };
    this.renderChart(charts[id]);
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }

  getConsultancyBetweenDatesService(searchDates?:any) {
    const { startDate, endDate } = this.getSemesterDates();
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    if (formattedStartDate !== null && formattedEndDate !== null) {
      this.consultancyService
        .findConsultancyBetweenDates(searchDates?searchDates.initialDate:formattedStartDate, searchDates?searchDates.finalDate:formattedEndDate)
        .subscribe({
          next: (res:any[]) => {
            // Manejar la respuesta del servicio
            if(res.length==0){
              this.data = [];
              this.labels = [];
              this.allConsultancyTableData = [];
              this.renderChart('consultancyXcourses');
            }else{
              this.allConsultancyTableData = res;
              this.countConsultanciesByCourse(res).map((consultancy) => {
                this.data.push(consultancy.consultancies);
                this.labels.push(consultancy.courseName);
              });
              this.renderChart('consultancyXcourses');
            }
          },
          error: (err:any) => {
            this.coreService.showMessage('Error en la consulta de asesorías:' + err.error.message);
          },
        });
    } else {
      console.error('Error al formatear fechas');
    }
  }
  countConsultanciesByCourse(
    consultancies: Consultancy[]
  ): { courseName: string; consultancies: number }[] {
    const courseCountMap: { [courseName: string]: number } = {};

    consultancies.forEach((consultancy) => {
      const { courseName } = consultancy;

      if (courseCountMap[courseName]) {
        courseCountMap[courseName]++;
      } else {
        courseCountMap[courseName] = 1;
      }
    });

    const result: { courseName: string; consultancies: number }[] = [];

    for (const courseName in courseCountMap) {
      if (courseCountMap.hasOwnProperty(courseName)) {
        result.push({
          courseName,
          consultancies: courseCountMap[courseName],
        });
      }
    }
    this.allConsultancyDownloadObj = result
    return result;
  }

  countConsultanciesByAcademicFriend(
    consultancies: Consultancy[]
  ): { academicFriendEmail: string; consultancies: number }[] {
    const academicFriendCountMap: { [academicFriendEmail: string]: number } =
      {};

    consultancies.forEach((consultancy) => {
      const { academicFriendEmail } = consultancy;

      if (academicFriendCountMap[academicFriendEmail]) {
        academicFriendCountMap[academicFriendEmail]++;
      } else {
        academicFriendCountMap[academicFriendEmail] = 1;
      }
    });

    const result: { academicFriendEmail: string; consultancies: number }[] = [];

    for (const academicFriendEmail in academicFriendCountMap) {
      if (academicFriendCountMap.hasOwnProperty(academicFriendEmail)) {
        result.push({
          academicFriendEmail,
          consultancies: academicFriendCountMap[academicFriendEmail],
        });
      }
    }
    this.allConsultancyXAFDownloadObj = result;
    return result;
  }
  getConsultanciesByCourseNameService(courseName: string) {
    this.consultancyService.findConsultancyCourse(courseName).subscribe({
      next: (res) => {
        if (res.length==0) {
          this.consultancyByAFtableData = [];
          this.coreService.showMessage(
            'No se encontró el curso: ' + courseName
          );
        } else {
          this.allConsultancyByCourseTableData = res;
          this.dataxcourse = [];
          this.labelsxcourse = [];
          this.countConsultanciesByAcademicFriend(res).map((consultancy) => {
            this.dataxcourse.push(consultancy.consultancies);
            this.labelsxcourse.push(consultancy.academicFriendEmail);
          });
          this.renderChart('consultancyXcourse');
        }
      },
      error: (err: any) => {
        this.coreService.showMessage('Error al buscar el curso' + err.error.message);
      },
    });
  }
  getConsultancyByCourse(event: any) {
    this.courseName = event.courseName;
    this.getConsultanciesByCourseNameService(event.courseName);
    this.renderChart('consultancyXcourse');
  }

  getConsultancyByAf(event: any) {
    this.getConsultancyByAfEmail(event.academicFriendEmail);
    this.renderChart('consultancyXaf');
  }

  getConsultanciesBySemester(event:any){
    this.semester = event.semester;
    const semester = event.semester.split('-');
    const anio: string = semester[0]; // Convertir a número
    const semestre: number = parseInt(semester[1], 10); // Convertir a número

    const dates = {
      initialDate: `${anio}-${semestre==1?'01':'06'}-01T00:00`,
      finalDate: `${anio}-${semestre==1?'06':'12'}-${semestre==1?'30':'31'}T00:00`
    }
    this.getConsultancyBetweenDatesService(dates);
  }
  getConsultancyByAfEmail(email: string) {
    this.consultancyService.getAllConsultancyByEmail(email).subscribe({
      next: (res: any) => {
        if (res.length==0) {
          this.consultancyByAFtableData = [];
          this.coreService.showMessage(
            'No se encontró el amigo académico: ' + email
          );
        } else {
          this.consultancyByAFtableData = res;
          this.labelsxaf = [];
          this.dataxaf = [];
          this.countConsultanciesByCourse(res).map((consultancy) => {
            this.dataxaf.push(consultancy.consultancies);
            this.labelsxaf.push(consultancy.courseName);
            this.allConsultancyXCourseDownloadObj.push(consultancy)
          });
          this.renderChart('consultancyXaf');
        }
      },
      error: (err: any) => {
        this.coreService.showMessage('Hubo un error: ' +  err.error.message);
      },
    });
  }
  getAllCoursesService(){
    this.courseService.getAllCourses().subscribe({
      next:(res:any)=>{
        const selectOptionsCourses:any = []
        res.map((course:any)=>{
          selectOptionsCourses.push({
            value: course.name, label:  course.name
          })
        })
        this.searchCourseByName.fields[0].selectOptions=selectOptionsCourses;
      },
      error:(err:any)=>{

      }
    })
  }
  downloadConsultancies(fileArray:any,nombre:string){
    this.fileService.convertFile(fileArray).subscribe({
      next:(blob)=>{
        const file = new Blob([blob], { type: 'application/octet-stream' });

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nombre}.xlsx`; // Puedes establecer el nombre del archivo aquí
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.coreService.showMessage('Archivo descargado con éxito');
      },
      error:()=>{}
    })
  }
  getLastSevenYears(): {value:string, label:string}[] {
    const currentYear: number = new Date().getFullYear();
    const lastSevenYears: {value:string, label:string}[] = [];
  
    for (let i = 0; i < 7; i++) {
      //lastSevenYears.value.push(currentYear - i);
      lastSevenYears.push({
        value:String(currentYear - i)+'-1',
        label:String(currentYear - i)+'-1'
      })
      lastSevenYears.push({
        value:String(currentYear - i)+'-2',
        label:String(currentYear - i)+'-2'
      })
    }
  
    return lastSevenYears;
  }
  
}
