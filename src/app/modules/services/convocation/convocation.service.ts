import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvocationService {
  readonly API_URL = environment.url
  constructor(private http:HttpClient) {

  }

  createConvocation(convocation:any){
    return this.http.post(`${this.API_URL}/convocation`, convocation)
  }

  getConvocationActive(){
    return this.http.get(`${this.API_URL}/convocation/active`)
  }

}
