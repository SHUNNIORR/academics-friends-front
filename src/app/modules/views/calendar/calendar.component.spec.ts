import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        MatDialogModule,
        MatIconModule
      ],
      declarations: [CalendarComponent]
    });
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.scheduleData = {
      "numberOfHours": 24,
      "days": [
          {
              "day": "MONDAY",
              "hours": [
                  {
                      "hour": "08:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  },
                  {
                      "hour": "09:00",
                      "classroom": "SA-404",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co"
                      ]
                  },
                  {
                      "hour": "10:00",
                      "classroom": "SA-404",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co"
                      ]
                  },
                  {
                      "hour": "11:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  }
              ]
          },
          {
              "day": "TUESDAY",
              "hours": [
                  {
                      "hour": "14:00",
                      "classroom": "SA-404",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co",
                          "santiagoperez@ufps.edu.co"
                      ]
                  },
                  {
                      "hour": "15:00",
                      "classroom": "SA-404",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co",
                          "santiagoperez@ufps.edu.co"
                      ]
                  },
                  {
                      "hour": "16:00",
                      "classroom": "SB-401",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co"
                      ]
                  },
                  {
                      "hour": "17:00",
                      "classroom": "SB-401",
                      "academicFriends": [
                          "julianariveros@ufps.edu.co"
                      ]
                  }
              ]
          },
          {
              "day": "WEDNESDAY",
              "hours": [
                  {
                      "hour": "12:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "13:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "14:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "15:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "16:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "17:00",
                      "classroom": "SB-401",
                      "academicFriends": []
                  }
              ]
          },
          {
              "day": "THURSDAY",
              "hours": [
                  {
                      "hour": "12:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "13:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "14:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "15:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "16:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  },
                  {
                      "hour": "17:00",
                      "classroom": "SA-401",
                      "academicFriends": []
                  }
              ]
          },
          {
              "day": "FRIDAY",
              "hours": [
                  {
                      "hour": "14:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  },
                  {
                      "hour": "15:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  },
                  {
                      "hour": "16:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  },
                  {
                      "hour": "17:00",
                      "classroom": "SA-404",
                      "academicFriends": []
                  }
              ]
          }
      ]
  }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('emittEvent',()=>{
  //   spyOn(component.optionsButtonClick,'emit')
  //   component.emittEvent({},'FRIDAY')
  //   expect(component.optionsButtonClick).toHaveBeenCalled();
  // })
  it('should emit an event with the hourObject and day parameters', () => {
    // Arrange
    const hourObject = { hour: '09:00', classroom: null, academicFriends: [] };
    const day = 'MONDAY';
    const emitObj = { hourObject, day };
    const optionsButtonClickSpy = spyOn(component.optionsButtonClick, 'emit');

    // Act
    component.emittEvent(hourObject, day);

    // Assert
    expect(optionsButtonClickSpy).toHaveBeenCalledWith(emitObj);
  });
  it('should emit an event with the hourObject and day parameters', () => {
    // Arrange
    const hourObject = { hour: '09:00', classroom: null, academicFriends: [] };
    const day = 'MONDAY';
    const emitObj = { hourObject, day ,action:'cancel'};
    const optionsButtonClickSpy = spyOn(component.optionsButtonClick, 'emit');

    // Act
    component.cancelSchedule(hourObject, day);

    // Assert
    expect(optionsButtonClickSpy).toHaveBeenCalledWith(emitObj);
  });
  // 
  it('should generate an image of the schedule when called with valid input', () => {
    // Arrange
    const htmlFragment = document.createElement('div');
    const fileName = 'horario.png';

    // Act
    spyOn(component,'captureHtmlAsImage')
    component.generateImage();

    // Assert
    expect(component.captureHtmlAsImage).toHaveBeenCalled()
  });
});
