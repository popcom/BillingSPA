import { Component, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Invoice } from 'src/app/core/models/invoice';
import { Customer } from 'src/app/core/models/customer';
import { InvoiceService } from '../../core/services/invoice.service';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  pageTitle = 'Invoice Edit';
  errorMessage!: string;
  invoiceForm!: FormGroup;
  tranMode!: string;
  invoice!: Invoice;
  private sub!: Subscription;
  customers: Customer[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private customerService: CustomerService) {
    
    this.validationMessages = {
      amount: {
        required: 'Amount is required.',
        min: 'Amount cannot be less than zero.'
      },
      customerId: {
        required: 'Customer is required.'
      }
    };
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data: any)=>{
      //console.log(data);
      this.customers = data;
    })  

    this.tranMode = "new";

    this.invoiceForm = this.fb.group({
      customerId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0) ]],
      deadLine: ''
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id')!;
        if (id == '0') {
          const invoice: Invoice = this.invoiceService.initializeInvoice();
          this.displayInvoice(invoice);
        }
        else {
          this.getInvoice(id);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getInvoice(id: string): void {
    this.invoiceService.getInvoice(id)
      .subscribe(
        (invoice: Invoice) => this.displayInvoice(invoice),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayInvoice(invoice: Invoice): void {
    //let x = invoice.deadLine?.toDateString().substring(0,9)
    //console.log(invoice.deadLine.toString().substring(0,9))
    // if(invoice.deadLine != null){
    //   invoice.deadLine = new Date(new Date(invoice.deadLine).toUTCString());

    // }
    if (this.invoiceForm) {
      this.invoiceForm.reset();
    }
    this.invoice = invoice;
    if (this.invoice.id == '0') {
      this.pageTitle = 'Add Invoice';
    } else {
      this.pageTitle = `Edit Invoice for ${this.invoice.customerName}`;
    }
    this.invoiceForm.patchValue({
      customerId: this.invoice.customerId,
      amount: this.invoice.amount,
      deadLine: this.invoice.deadLine
    });
  }

  deleteInvoice(): void {
    if (this.invoice.id == '0') {
      this.onSaveComplete();
    } else {
      if (confirm(`Are you sure want to delete this Invoice for : ${this.invoice.customerName}?`)) {
        this.invoiceService.deleteInvoice(this.invoice.id!!)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => {this.onSaveComplete(); this.errorMessage = <any>error;}
          );
      }
    }
  }

  saveInvoice(): void {
    if (this.invoiceForm.valid) {
      if (this.invoiceForm.dirty) {
        const p = { ...this.invoice, ...this.invoiceForm.value };
        if (p.id === '0') {
          this.invoiceService.createInvoice(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => {this.onSaveComplete(); this.errorMessage = <any>error;}
            );
        } else {
          this.invoiceService.updateInvoice(p)
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
    this.invoiceForm.reset();
    this.router.navigate(['/invoice']);
  }
}  