import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnrollStudentRequest } from '../../models/Student';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  readonly API_URL = environment.url
  constructor(private http:HttpClient) {

  }
  enrollStudent(students:EnrollStudentRequest){
    let formParams = new FormData();
    formParams.append('resume', students.resume)
    formParams.append('email', students.email)
    formParams.append('average', String(students.average))
    formParams.append('classSchedule', students.classSchedule)
    return this.http.post(`${this.API_URL}/academic-friend`,formParams)
  }
}
