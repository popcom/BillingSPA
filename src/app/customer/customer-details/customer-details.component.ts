import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Customer } from 'src/app/core/models/customer';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})

export class CustomerDetailsComponent implements OnInit {

  pageTitle = 'Customer Detail';  
  customer: Customer = this.customerService.initializeCustomer();  
  errorMessage = '';  

  constructor(private route: ActivatedRoute,  private router: Router,  private customerService: CustomerService) { }  
  
  ngOnInit() {  
    const id = this.route.snapshot.paramMap.get('id');  
    if (id) {  
      this.getCustomer(id);  
    }  
  }  
  
  getCustomer(id: string) {  
    this.customerService.getCustomer(id).subscribe(  
      customer => this.customer = customer,  
      error => this.errorMessage = <any>error);  
  }  

  public createImgPath = (serverPath: string) => {
    return `${environment.baseUrl}${serverPath}`;
  }
  
  onBack(): void {  
    this.router.navigate(['/customer']);  
  }  

}
