import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationConsultComponent } from './convocation-consult.component';

describe('ConvocationConsultComponent', () => {
  let component: ConvocationConsultComponent;
  let fixture: ComponentFixture<ConvocationConsultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationConsultComponent]
    });
    fixture = TestBed.createComponent(ConvocationConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
