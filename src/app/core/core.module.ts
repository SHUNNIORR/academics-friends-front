import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
})
export class CoreModule { }
