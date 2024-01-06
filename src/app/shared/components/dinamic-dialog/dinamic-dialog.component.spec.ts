import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicDialogComponent } from './dinamic-dialog.component';

describe('DinamicDialogComponent', () => {
  let component: DinamicDialogComponent;
  let fixture: ComponentFixture<DinamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DinamicDialogComponent]
    });
    fixture = TestBed.createComponent(DinamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
