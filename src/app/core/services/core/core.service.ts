import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private durationInSeconds = 5;
  userName: string= ''
  role: string = 'student';
  email: string = '';
  constructor(private _snackBar: MatSnackBar){
  }
  private sidenavToggleSource = new Subject<void>();

  sidenavToggle$ = this.sidenavToggleSource.asObservable();

  toggleSidenav() {
    this.sidenavToggleSource.next();
  }

  showMessage(message:string){
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds*1000
    });
  } 
}
