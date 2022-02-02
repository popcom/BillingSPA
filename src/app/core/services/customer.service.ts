import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = environment.baseUrl + 'api/customer/';
  
    constructor(private http: HttpClient) { }
  
    getCustomers(searched: string = "") {
      return this.http.get<Customer[]>(this.customerUrl + 'GetAll/' + searched);
    }
  
    getCustomer(id: string) {
      if (id === '') {
        return of(this.initializeCustomer());
      }
      return this.http.get<Customer>(this.customerUrl + id);
    }
  
    createCustomer(customer: Customer) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      customer.id = '00000000-0000-0000-0000-000000000000';
      return this.http.post<Customer>(this.customerUrl, JSON.stringify(customer), { headers: headers });
    }
  
    deleteCustomer(id: string): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete<Customer>(`${this.customerUrl}${id}`, { headers: headers });
    }
  
    updateCustomer(customer: Customer){
      //debugger
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<Customer>(`${this.customerUrl}${customer.id}`, customer, { headers: headers });
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
  
    public initializeCustomer(): Customer {
      return {
        id: '0',
        firstName: '',
        lastName: '',
        email: null,
        imgUrl: null
      };
    }
}
