import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 

  }

  getAllSchedule(){
    return this.http.get(`${this.API_URL}/schedule`)
  }
  saveSchedule(schedule:any){
    return this.http.post(`${this.API_URL}/schedule`, schedule)
  }

  getSchedulesByEmail(email:string){
    return this.http.get(`${this.API_URL}/schedule/find-by-academic-friend/${email}`)
  }
  replySchedule(replyObj:any){
    return this.http.put(`${this.API_URL}/schedule`,replyObj)
  }
}
