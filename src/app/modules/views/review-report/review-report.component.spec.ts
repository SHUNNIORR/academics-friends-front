import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReportComponent } from './review-report.component';

describe('ReviewReportComponent', () => {
  let component: ReviewReportComponent;
  let fixture: ComponentFixture<ReviewReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewReportComponent]
    });
    fixture = TestBed.createComponent(ReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
