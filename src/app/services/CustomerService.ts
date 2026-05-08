import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/Customer'
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class CustomerService{

  private apiUrl = 'http://localhost:8080/test/ressources/customers'

  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get<{ customers: Customer[] }>(this.apiUrl);
  }

  createCustomer(customer: Customer) {
    return this.httpClient.post<{ customer: Customer }>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer, uuid: string) {
    return this.httpClient.put<{ message: string }>(
      `${this.apiUrl}/${uuid}`,
      customer
    );
  }

  deleteCustomer(uuid: string) {
    return this.httpClient.delete<{ message: string }>(
      `${this.apiUrl}/${uuid}`,
    );
  }

  getCustomerById(uuid: string) {
    return this.httpClient.get<Customer>(
      `${this.apiUrl}/${uuid}`
    );
  }
}
