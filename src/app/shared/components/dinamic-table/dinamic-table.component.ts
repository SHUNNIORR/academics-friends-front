import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get columnKeys(): string[] {
    return this.columnsConfig.map((column) => column.key);
  }
  ngAfterViewInit() {
    if (this.data.length > 0) {
      // Obtener las columnas únicas del primer elemento del array
      this.displayedColumns = Object.keys(this.data[0]);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    }
  }

}
