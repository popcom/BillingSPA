import { Component, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { Customer } from 'src/app/core/models/customer';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  pageTitle = 'Customer Edit';
  errorMessage!: string;
  customerForm!: FormGroup;
  tranMode!: string;
  customer!: Customer;
  private sub!: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {

    this.validationMessages = {
      firstname: {
        required: 'Customer name is required.',
        //minlength: 'Customer name must be at least three characters.',
        maxlength: 'Customer name cannot exceed 50 characters.'
      },
      lastname: {
        required: 'Customer name is required.',
        //minlength: 'Customer name must be at least three characters.',
        maxlength: 'Customer last name cannot exceed 50 characters.'
      }
    };
  }

  ngOnInit() {
    this.tranMode = "new";
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required,
      //Validators.minLength(3),
      Validators.maxLength(50)
      ]],
      lastname:  ['', [Validators.required,
        //Validators.minLength(3),
        Validators.maxLength(50)
        ]],
      email: '',
      imgUrl: ''
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id')!;
        if (id == '0') {
          const customer: Customer = this.customerService.initializeCustomer();
          this.displayCustomer(customer);
        }
        else {
          this.getCustomer(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCustomer(id: string): void {
    this.customerService.getCustomer(id)
      .subscribe(
        (customer: Customer) => this.displayCustomer(customer),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayCustomer(customer: Customer): void {
    if (this.customerForm) {
      this.customerForm.reset();
    }
    this.customer = customer;
    if (this.customer.id == '0') {
      this.pageTitle = 'Add Customer';
    } else {
      this.pageTitle = `Edit Customer: ${this.customer.firstName + ' ' + this.customer.lastName}`;
    }
    this.customerForm.patchValue({
      firstname: this.customer.firstName,
      lastname: this.customer.lastName,
      email: this.customer.email,
      imgUrl: this.customer.imgUrl,
    });
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.baseUrl}${serverPath}`;
  }

  deleteCustomer(): void {
    if (this.customer.id == '0') {
      this.onSaveComplete();
    } else {
      if (confirm(`Are you sure want to delete this Customer : ${this.customer.firstName + ' ' + this.customer.lastName}?`)) {
        this.customerService.deleteCustomer(this.customer.id!!)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => {this.errorMessage = error.error; this.onSaveComplete(); alert(error.error) }
          );
      }
    }
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      if (this.customerForm.touched || this.customerForm.dirty || this.customerForm.pristine) {
        const p = { ...this.customer, ...this.customerForm.value };
        // console.log(this.customer)
        // console.log(this.customerForm.value)
        // console.log(p)
        if (p.id === '0') {
          if(this.customer.imgUrl){
            p.imgUrl = this.customer.imgUrl;
          }
          this.customerService.createCustomer(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => {this.onSaveComplete(); this.errorMessage = <any>error;}
            );
        } else {
          this.customerService.updateCustomer(p)
            .subscribe(
              (result: any) => {
                this.onSaveComplete();
                this.errorMessage = <any>result
              },
              (error: any) => {this.onSaveComplete(); this.errorMessage = <any>error;}
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }



  onSaveComplete(): void {
    this.customerForm.reset();
    this.router.navigate(['/customer']);
  }

  public uploadFinished = (event: { dbPath: ""; }) => {
    this.customer.imgUrl = event.dbPath;
    this.customerForm.value.imgUrl = event.dbPath;
  }
  
}  
