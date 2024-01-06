import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyListComponent } from './consultancy-list.component';

describe('ConsultancyListComponent', () => {
  let component: ConsultancyListComponent;
  let fixture: ComponentFixture<ConsultancyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancyListComponent]
    });
    fixture = TestBed.createComponent(ConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
