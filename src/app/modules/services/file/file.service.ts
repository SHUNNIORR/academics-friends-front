import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly API_URL: string = environment.url
  constructor(private http:HttpClient) { }

  downloadFile(fileUrl: string){
    return this.http.get(`${this.API_URL}/file/${fileUrl}`,{ responseType: 'blob' })
  }
  convertFile(fileArray:any){
    return this.http.post(`${this.API_URL}/file/convert`,fileArray,{ responseType: 'blob' })
  }
}
