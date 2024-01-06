import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocationCreateComponent } from './convocation-create.component';

describe('ConvocationCreateComponent', () => {
  let component: ConvocationCreateComponent;
  let fixture: ComponentFixture<ConvocationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvocationCreateComponent]
    });
    fixture = TestBed.createComponent(ConvocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
