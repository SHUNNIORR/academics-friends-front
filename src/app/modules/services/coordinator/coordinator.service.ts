import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateCoordinatorRequest, CreateCoordinatorResponse } from '../../models/Coordinator';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { 

  }

  createCoordinator(coordinatorData:CreateCoordinatorRequest): Observable<CreateCoordinatorResponse>{
    return this.http.post<CreateCoordinatorResponse>(`${this.API_URL}/coordinator`, coordinatorData)
  }
}
