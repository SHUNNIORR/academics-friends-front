import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dinamic-table',
  templateUrl: './dinamic-table.component.html',
  styleUrls: ['./dinamic-table.component.scss']
})
export class DinamicTableComponent {
  @Input() data: any[] = [];
  @Input() columnsConfig: { label: string; key: string }[] = [];
  @Input() hasPaginator:boolean = true;
  @Input() hasOptions:boolean = false;
  @Input() optionsData: any[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() optionsButtonClick = new EventEmitter<any>();
  get columnKeys(): string[] {
    return this.columnsConfig.map((column) => column.key);
  }
  ngAfterViewInit() {
    if (this.data.length > 0) {
      // Obtener las columnas únicas del primer elemento del array
      this.displayedColumns = Object.keys(this.data[0]);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.displayedColumns = Object.keys(this.data[0]);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    }
  }
  emitOptionsEvent(id:string,element: any) {
    const emitObj= {id:id,element:element}
    this.optionsButtonClick.emit(emitObj);
  }
}
