import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationApprovalsComponent } from './convocation-approvals.component';

describe('ConvocationApprovalsComponent', () => {
  let component: ConvocationApprovalsComponent;
  let fixture: ComponentFixture<ConvocationApprovalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationApprovalsComponent]
    });
    fixture = TestBed.createComponent(ConvocationApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
