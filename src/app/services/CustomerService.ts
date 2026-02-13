import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../interfaces/Customer'

@Injectable({ providedIn: 'root'})
export class CustomerService{

  private apiUrl = 'http://localhost:8080/test/ressources/customer'
  constructor(private httpClient: HttpClient) {}

  getCustomer() {
    return this.httpClient.get<{ customer: Customer[] }>(this.apiUrl);
  }
}
