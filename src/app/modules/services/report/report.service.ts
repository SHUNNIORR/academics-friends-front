import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  readonly API_URL: string = environment.url
  private reportUpdated$ = new Subject<void>();


  constructor(private http:HttpClient) { }

  saveReport(saveReportObj:any){
    return this.http.post(`${this.API_URL}/report`, saveReportObj)
  }

  getAllReports(){
    return this.http.get(`${this.API_URL}/report`)
  } 

  getReportsByAcademicFriend(academicFriendEmail:string){
    return this.http.get(`${this.API_URL}/report/find-by-academic-friend/${academicFriendEmail}`)
  } 
  updateReport(reportObj:any){
    return this.http.put(`${this.API_URL}/report`,reportObj).pipe(
      // Emitir una notificación de actualización cuando se completa la corrección del informe
      tap(() => this.reportUpdated$.next())
    );
  }
  correctReport(reportId:number, file:File){
    const formData = new FormData();
        formData.append('file', file);
        return this.http.put(`${this.API_URL}/report/${reportId}`, formData).pipe(
          // Emitir una notificación de actualización cuando se completa la corrección del informe
          tap(() => this.reportUpdated$.next())
        );
  }

   // Método para suscribirse a las actualizaciones de informes
   onReportUpdated() {
    return this.reportUpdated$.asObservable();
  }
}
