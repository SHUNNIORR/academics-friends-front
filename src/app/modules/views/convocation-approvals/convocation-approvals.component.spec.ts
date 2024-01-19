import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationApprovalsComponent } from './convocation-approvals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('ConvocationApprovalsComponent', () => {
  let component: ConvocationApprovalsComponent;
  let fixture: ComponentFixture<ConvocationApprovalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationApprovalsComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConvocationApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
