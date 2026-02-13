import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {Customer} from './interfaces/Customer';
import {CustomerService} from './services/CustomerService';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCheckbox, JsonPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hausverwaltung-ui';

  public customers?: Customer[] = [];
  constructor(private customerService: CustomerService) {
    this.customerService = customerService
  }
  ngOnInit() {
    this.customerService.getCustomer().subscribe(response => {
      this.customers = response.customer;
    });
  }

}
