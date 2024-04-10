import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicFriendsService {
  readonly API_URL = environment.url
  constructor(private http:HttpClient) {
  }
  getAllAcademicFriends(){
    return this.http.get(`${this.API_URL}/academic-friend`)
  }
  getAcademicFriendByEmail(email:string){
    return this.http.get(`${this.API_URL}/user/${email}`)
  }
  getAcademicFriendByConvocationActive(id:number){
    return this.http.get(`${this.API_URL}/academic-friend/find-by-convocation/${id}`)
  }

  updateAcademicFriend(academicFriendObj:any){
    return this.http.put(`${this.API_URL}/academic-friend`,academicFriendObj)
  }

  findAcademicFriendByCode(academicFriendCode:number){
    return this.http.get(`${this.API_URL}/academic-friend/${academicFriendCode}`)
  }

  uploadContract(file:File, email:string){
    let formParams = new FormData();
    formParams.append('contract', file)
    formParams.append('email', email)
    return this.http.put(`${this.API_URL}/academic-friend/contract`,formParams)
  }

  resetPassword(objToReset:any){
    return this.http.post(`${this.API_URL}/user/reset-password`,objToReset)
  }
}
