import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from 'src/app/core/models/invoice';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  pageTitle = 'Invoice Detail';  
  invoice: Invoice = this.invoiceService.initializeInvoice();  
  errorMessage = '';  

  constructor(private route: ActivatedRoute,  private router: Router,  private invoiceService: InvoiceService) { }  
  
  ngOnInit() {  
    const id = this.route.snapshot.paramMap.get('id');  
    if (id) {  
      this.getInvoice(id);  
    }  
  }  
  
  getInvoice(id: string) {  
    this.invoiceService.getInvoice(id).subscribe(  
      invoice => this.invoice = invoice,  
      error => this.errorMessage = <any>error);  
  }  
  
  onBack(): void {  
    this.router.navigate(['/invoice']);  
  }  

}
