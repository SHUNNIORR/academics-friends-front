import { AuthService } from './../services/auth/auth.service';
import { Component } from '@angular/core';
import { CoreService } from '../services/core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private coreService:CoreService, private authService:AuthService, private router:Router){
  }
  toggleSidenav() {
    this.coreService.toggleSidenav();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
