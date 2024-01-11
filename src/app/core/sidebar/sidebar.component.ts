import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreService } from '../services/core/core.service';
import { SIDEBAR_LINKS } from '../utils/metadata/sidebar.metadata';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  esDispositivoMovil: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  SIDEBAR_LINKS: any = SIDEBAR_LINKS;
  role: string |null = localStorage.getItem('role') == 'academicFriend'? 'Amigo académico': localStorage.getItem('role') == 'coordinator'?'Coordinador':localStorage.getItem('role') == 'director'?'Director':'';
  constructor(
    private coreService: CoreService,
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {
    
  }
  userName = localStorage.getItem('name');
  email = localStorage.getItem('email');

  ngOnInit() {
    // Observa los cambios en los breakpoints
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        this.esDispositivoMovil = result.matches;
      });
  }
  ngAfterViewInit() {
    this.coreService.sidenavToggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }
}
