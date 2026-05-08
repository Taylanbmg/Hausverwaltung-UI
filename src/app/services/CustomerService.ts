import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/Customer'
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class CustomerService{

  private apiUrlGetCustomer = 'http://localhost:8080/test/ressources/customers'

  private apiUrlPostCustomer = 'http://localhost:8080/test/ressources/customers'

  private apiUrlPutCustomer = 'http://localhost:8080/test/ressources/customers'
  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get<{ customers: Customer[] }>(this.apiUrlGetCustomer);
  }

  createCustomer(customer: Customer) {
    return this.httpClient.post<{ customer: Customer }>(this.apiUrlPostCustomer, customer);
  }

  updateCustomer(customer: Customer, uuid: string) {
    return this.httpClient.put<{ message: string }>(
      `${this.apiUrlPutCustomer}/${uuid}`,
      customer
    );
  }

  getCustomerById(uuid: string) {
    return this.httpClient.get<Customer>(
      `${this.apiUrlGetCustomer}/${uuid}`
    );
  }
}
