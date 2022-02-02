import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  searchText: string = '';
  customers: Customer[] = [];
  

  constructor(private dataService: CustomerService, private router: Router) {
   }

  ngOnInit(): void {
    this.dataService
      .getCustomers('')
      .subscribe((data: any)=>{
        this.customers = data;
      })  
  }

  showDetails(id: string): void {
    this.router.navigate(['customer', id]);
  }

  search(): void {
     if (!this.searchText)
     this.searchText = '';
    this.dataService
      .getCustomers(this.searchText)
      .subscribe((data: any)=> {
        this.customers = data;
      });
  }


}
