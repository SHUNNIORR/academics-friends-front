import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicTableComponent } from './dinamic-table.component';

describe('DinamicTableComponent', () => {
  let component: DinamicTableComponent;
  let fixture: ComponentFixture<DinamicTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DinamicTableComponent]
    });
    fixture = TestBed.createComponent(DinamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
