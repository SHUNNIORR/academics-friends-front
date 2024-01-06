import { Component } from '@angular/core';
import { SEARCH_ACADEMIC_FRIEND } from '../metadata/academic-friend/academic-friend.metadata';

@Component({
  selector: 'app-academic-friends',
  templateUrl: './academic-friends.component.html',
  styleUrls: ['./academic-friends.component.scss']
})
export class AcademicFriendsComponent {
  searchAcademicFriend = SEARCH_ACADEMIC_FRIEND;

  onFormSubmit(formData: any): void {
    console.log('Form submitted with data:', formData.file);
    // Implementar lógica adicional según tus necesidades
  }
}
