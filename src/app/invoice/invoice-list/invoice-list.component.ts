import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '../../core/models/invoice';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  searchText: string = '';
  invoices: Invoice[] = [];
  

  constructor(private dataService: InvoiceService, private router: Router) {
   }

  ngOnInit(): void {
    this.dataService
      .getInvoices('')
      .subscribe((data: any)=>{
        //console.log(data);
        this.invoices = data;
      })  
  }

  showDetails(id: string): void {
    this.router.navigate(['invoice', id]);
  }

  // BONUS: Filter the result set on the backend side
  search(): void {
     if (!this.searchText)
     this.searchText = '';
    this.dataService
      .getInvoices(this.searchText)
      .subscribe((data: any)=> {
        //console.log(customers[0])
        //const filteredCustomers = customers.filter(c => c.firstname.startsWith(this.searchText) || c.email?.startsWith(this.searchText));
        //this.customers = filteredCustomers;
        this.invoices = data;
      });
  }

}
