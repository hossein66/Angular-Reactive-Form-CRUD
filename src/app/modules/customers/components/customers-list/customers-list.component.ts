import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomersService } from '../../services/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('select') select: MatSelect;
  allSelected = false;
  value='';
  dataSource = new MatTableDataSource<Customer>();

  visibleColumns = [
    {
      columnDef: 'Firstname',
      header: 'FirstName',
      cell: (element: any) => `${element.Firstname}`,
      show: true,
    },
    {
      columnDef: 'Lastname',
      header: 'LastName',
      cell: (element: any) => `${element.Lastname}`,
      show: true,
    },
    {
      columnDef: 'DateOfBirth',
      header: 'DateOfBirth',
      cell: (element: any) => `${element.DateOfBirth}`,
      show: true,
    },
    {
      columnDef: 'Email',
      header: 'Email',
      cell: (element: any) => `${element.Email}`,
      show: true,
    },
    {
      columnDef: 'PhoneNumber',
      header: 'PhoneNumber',
      cell: (element: any) => `${element.PhoneNumber}`,
      show: true,
    },
    {
      columnDef: 'BankAccountNumber',
      header: 'BankAccountNumber',
      cell: (element: any) => `${element.BankAccountNumber}`,
      show: true,
    },
    {
      columnDef: 'action',
      header: 'Add',
      cell: (element: any) =>`ds`,
      show: true,
    },

  ];

  // displayedColumnsDynamic = this.columns.map((c) => c.columnDef);

  get columns() {
    return this.visibleColumns;
  }

  get displayedColumns(): string[] {
    return this.visibleColumns.map((c) => c.columnDef);
  }

  constructor(private customerService:CustomersService) {}

  ngOnInit() {

        this.dataSource.data = this.customerService.getcustomers();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
}


