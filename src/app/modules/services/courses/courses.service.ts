import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 

  }
  createCourses(courses:File){
    let formParams = new FormData();
    formParams.append('file', courses)
    return this.http.post(`${this.API_URL}/course`,formParams)
  }
  getAllCourses(){
    return this.http.get(`${this.API_URL}/course`)
  }
}
