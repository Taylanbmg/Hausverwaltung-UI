import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/Customer'
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class CustomerService{

  private apiUrlGetCustomer = 'http://localhost:8080/test/ressources/customers'

  private apiUrlPostCustomer = 'http://localhost:8080/test/ressources/customers'
  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get<{ customers: Customer[] }>(this.apiUrlGetCustomer);
  }

  postCustomer(data: Customer[]): Observable<any> {
    return this.httpClient.post(this.apiUrlPostCustomer, data)
  }
}
