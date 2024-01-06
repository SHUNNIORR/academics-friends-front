import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicFriendsService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 
  }
  getAcademicFriendByConvocationActive(id:number){
    return this.http.get(`${this.API_URL}/academic-friend/find-by-convocation/${id}`)
  }
}
