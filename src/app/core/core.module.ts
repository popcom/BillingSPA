import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';


@NgModule({
  declarations: [],
  providers:[
    CustomerService,
    InvoiceService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
