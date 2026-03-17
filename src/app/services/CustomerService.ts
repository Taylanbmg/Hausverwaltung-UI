import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/Customer'

@Injectable({ providedIn: 'root'})
export class CustomerService{

  private apiUrl = 'http://localhost:8080/test/ressources/customers'
  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get<{ customers: Customer[] }>(this.apiUrl);
  }
}
