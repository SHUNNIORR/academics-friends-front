import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  readonly API_URL = environment.url
  constructor(private http:HttpClient) {

  }
  createStudents(students:File){
    let formParams = new FormData();
    formParams.append('file', students)
    return this.http.post(`${this.API_URL}/student`,formParams)
  }

  searchStudent(code:string){
    return this.http.get(`${this.API_URL}/student/find-by-code/${code}`)
  }
}
