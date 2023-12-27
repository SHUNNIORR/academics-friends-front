import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReportComponent } from './upload-report.component';

describe('UploadReportComponent', () => {
  let component: UploadReportComponent;
  let fixture: ComponentFixture<UploadReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadReportComponent]
    });
    fixture = TestBed.createComponent(UploadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
