import { AcademicFriendsService } from './../services/academic-friends/academic-friends.service';
import { Component } from '@angular/core';
import { SEARCH_ACADEMIC_FRIEND, SEARCH_ACADEMIC_FRIEND_BY_EMAIL } from '../metadata/academic-friend/academic-friend.metadata';
import { ConsultancyService } from '../services/consultancy/consultancy.service';
import { TABLE_COLUMNS_NAME_CONSULTANCY } from '../metadata/consultancy/consultancy.metadata';
import { CoreService } from 'src/app/core/services/core/core.service';
import { TABLE_COLUMNS_NAME_STUDENTS } from '../metadata/convocation/convocation.metadata';

@Component({
  selector: 'app-academic-friends',
  templateUrl: './academic-friends.component.html',
  styleUrls: ['./academic-friends.component.scss']
})
export class AcademicFriendsComponent {
  searchAcademicFriend = SEARCH_ACADEMIC_FRIEND;
  searchAcademicFriendByEmail = SEARCH_ACADEMIC_FRIEND_BY_EMAIL;
  consultancyByAFtableData:any[] = [];
  consultancyByAFcolumnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;

  findAFByCodetableData:any[] = [];
  findAFByCodecolumnNames:any[] = TABLE_COLUMNS_NAME_STUDENTS;

  // consultancyByAFtableData:any[] = [];
  // consultancyByAFcolumnNames:any[] = TABLE_COLUMNS_NAME_CONSULTANCY;
  constructor(private consultancyService:ConsultancyService, private coreService:CoreService, private academicFriendsService:AcademicFriendsService){

  }
  getConsultancyByAf(event: any): void {
    console.log('Form submitted with data:', event);
    // Implementar lógica adicional según tus necesidades
    this.getConsultancyByEmail(event.academicFriendEmail);
  }
  getAfInfo(formData: any): void {
    console.log('Form submitted with data:', formData.academicFriendCode);
    // Implementar lógica adicional según tus necesidades
    this.getAcademicFriendByCode( formData.academicFriendCode)
  }

  getConsultancyByEmail(email:string){
      this.consultancyService.getAllConsultancyByEmail(email).subscribe({
        next:(res:any)=>{
          console.log(res)
          if(res==null){
            this.consultancyByAFtableData=[]
            this.coreService.showMessage('No se encontró el amigo académico: '+email)
          }else{
            this.consultancyByAFtableData=res;
          }
        },
        error:(err:Error)=>{
          console.log(err)
          this.coreService.showMessage('Hubo un error: ' + err.message)
        }
      })
  }

  getAcademicFriendByCode(code:number){
    this.academicFriendsService.findAcademicFriendByCode(code).subscribe({
      next:(res:any)=>{
        console.log(res)
        if(res==null){
          this.findAFByCodetableData=[]
          this.coreService.showMessage('No se encontró el amigo académico: '+code)
        }else{
          this.findAFByCodetableData.push(res);
        }
      },
      error:(err:Error)=>{
        console.log(err)
        this.coreService.showMessage('Hubo un error: ' + err.message)
      }
    })
  }

  getAllAcademicFriends(){
    this.academicFriendsService.getAllAcademicFriends().subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:Error)=>{
        console.log(err)
        this.coreService.showMessage('Hubo un error: ' + err.message)
      }
    })
  }
  
}
