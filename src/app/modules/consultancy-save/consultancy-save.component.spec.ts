import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancySaveComponent } from './consultancy-save.component';

describe('ConsultancySaveComponent', () => {
  let component: ConsultancySaveComponent;
  let fixture: ComponentFixture<ConsultancySaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancySaveComponent]
    });
    fixture = TestBed.createComponent(ConsultancySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
