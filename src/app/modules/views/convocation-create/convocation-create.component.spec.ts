import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationCreateComponent } from './convocation-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('ConvocationCreateComponent', () => {
  let component: ConvocationCreateComponent;
  let fixture: ComponentFixture<ConvocationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationCreateComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule ,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConvocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
