import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, LoginUserResponse } from '../../utils/models/LoginUser';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = true;
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 

  }

  login(userData: LoginUser): Observable<LoginUserResponse>{
    return this.http.post<LoginUserResponse>(`${this.API_URL}/security/login`, userData)
  }

  saveTokenToLocal(jwt: string): void {
    localStorage.setItem('token', jwt);
  }
  deleteTokenFromLocal(): void {
    localStorage.removeItem('token')
  }
  getTokenFromLocal():string|null {
    return localStorage.getItem('token');
  }
  getHealth(){
    return this.http.get(`${this.API_URL}/health`)
  }

  getUserByEmail(email: string){
    return this.http.get(`${this.API_URL}/user/${email}`)
  }
}
