import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultancyService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 

  }

  saveConsultancy(consultancy:any){
    return this.http.post(`${this.API_URL}/consultancy`, consultancy)
  }

  getAllConsultancyByEmail(email:string){
    return this.http.get(`${this.API_URL}/consultancy/find-by-academic-friend/${email}`)
  }
}
