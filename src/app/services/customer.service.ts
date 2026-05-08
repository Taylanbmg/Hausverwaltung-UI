import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer, CustomersWrapper, CustomerWrapper} from '../models/customer.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/test/ressources/customers';

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<CustomersWrapper>(this.apiUrl)
      .pipe(map(res => res.customers));
  }

  getCustomerById(id: string) {
    return this.http.get<CustomerWrapper>(`${this.apiUrl}/${id}`)
      .pipe(map(res => res.customer));
  }

  createCustomer(customer: Customer) {
    return this.http.post<CustomerWrapper>(this.apiUrl, customer)
      .pipe(map(res => res.customer));
  }

  updateCustomer(customer: Customer) {
    const id = customer.id || customer.uuid;
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
