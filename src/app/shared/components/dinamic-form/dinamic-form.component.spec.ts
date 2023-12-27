import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicFormComponent } from './dinamic-form.component';

describe('DinamicFormComponent', () => {
  let component: DinamicFormComponent;
  let fixture: ComponentFixture<DinamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DinamicFormComponent]
    });
    fixture = TestBed.createComponent(DinamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
