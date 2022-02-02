import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Invoice } from '../models/invoice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
    
    private invoiceUrl = environment.baseUrl + 'api/invoice/';
  
    constructor(private http: HttpClient) { }
  
    getInvoices(searched: string = "") {
      return this.http.get<Invoice[]>(this.invoiceUrl + 'GetAll/' + searched);
    }
  
    getInvoice(id: string) {
      if (id === '') {
        return of(this.initializeInvoice());
      }
      return this.http.get<Invoice>(this.invoiceUrl + id);
    }
  
    createInvoice(invoice: Invoice) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      invoice.id = '00000000-0000-0000-0000-000000000000';
      return this.http.post<Invoice>(this.invoiceUrl , JSON.stringify(invoice), { headers: headers });
    }
  
    deleteInvoice(id: string): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete<Invoice>(`${this.invoiceUrl}${id}`, { headers: headers });
    }
  
    updateInvoice(invoice: Invoice){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<Invoice>(`${this.invoiceUrl}${invoice.id}`, invoice, { headers: headers });
    }
  
    private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
      console.error(err);
      return throwError(errorMessage);
    }
  
    public initializeInvoice(): Invoice {
      return {
        id: '0',
        customerId: '0',
        customerName: null,
        amount: '0',
        deadLine: new Date()
      };
    }
  }  