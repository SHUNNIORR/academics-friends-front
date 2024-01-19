import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyListComponent } from './consultancy-list.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsultancyListComponent', () => {
  let component: ConsultancyListComponent;
  let fixture: ComponentFixture<ConsultancyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancyListComponent],
      imports:[MatSnackBarModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
