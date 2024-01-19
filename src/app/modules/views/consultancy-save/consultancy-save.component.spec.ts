import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancySaveComponent } from './consultancy-save.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

describe('ConsultancySaveComponent', () => {
  let component: ConsultancySaveComponent;
  let fixture: ComponentFixture<ConsultancySaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancySaveComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatTabsModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ConsultancySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
