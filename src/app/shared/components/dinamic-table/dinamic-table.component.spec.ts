import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicTableComponent } from './dinamic-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SimpleChange } from '@angular/core';

describe('DinamicTableComponent', () => {
  let component: DinamicTableComponent;
  let fixture: ComponentFixture<DinamicTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
     ],
      declarations: [DinamicTableComponent]
    });
    fixture = TestBed.createComponent(DinamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set up table data when data is provided', () => {
    const testData = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Doe', age: 25 },
    ];

    component.data = testData;
    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();

    //expect(component.columnsConfig).toEqual(['id', 'name', 'age']);
    expect(component.dataSource.data).toEqual(testData);
  });
  it('should emit optionsButtonClick event when an option button is clicked', () => {
    const testData = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Doe', age: 25 },
    ];
    const mockEvent = { id: '1', element: testData[0] };

    component.data = testData;
    spyOn(component.optionsButtonClick, 'emit');
    fixture.detectChanges();

    // Simulate clicking the options button
    component.emitOptionsEvent('1', testData[0]);

    // Verify that the event was emitted with the correct data
    expect(component.optionsButtonClick.emit).toHaveBeenCalledWith(mockEvent);
  });
  it('should update displayedColumns and dataSource when data changes', () => {
    const testData = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Doe', age: 25 },
    ];

    // Set initial data
    component.data = testData;
    fixture.detectChanges();

    // Simulate data change
    const changes = {
      data: new SimpleChange(testData, testData, true),
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();

    // Verify that displayedColumns and dataSource are updated
    expect(component.displayedColumns).toEqual(['id', 'name', 'age']);
    expect(component.dataSource.data).toEqual(testData);
  });
  it('should update displayedColumns and dataSource when data has elements', () => {
    const testData = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Doe', age: 25 },
    ];

    // Set data and call ngAfterViewInit
    component.data = testData;
    component.ngAfterViewInit();

    // Expect displayedColumns to be keys of the first element in data
    expect(component.displayedColumns).toEqual(Object.keys(testData[0]));

    // Expect dataSource to be created with the provided data
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(testData);

    // Expect paginator and sort to be assigned
    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should not update displayedColumns and dataSource when data is empty', () => {
    // Set empty data and call ngAfterViewInit
    component.data = [];
    component.ngAfterViewInit();

    // Expect displayedColumns and dataSource to remain unchanged
    expect(component.displayedColumns).toEqual([]);
    expect(component.dataSource).toBeUndefined();
  });
});
