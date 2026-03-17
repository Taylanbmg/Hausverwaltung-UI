import {CustomerService} from './services/CustomerService';
import {Customer} from './interfaces/Customer';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {
  MatAutocomplete,
  MatAutocompleteOrigin,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
  imports: [
    FormsModule,
    NgForOf,
    CommonModule,
    MatAutocomplete,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatFormField,
    MatOption,
    MatInput
  ],
  standalone: true,
})
export class AppComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  selectedCustomer?: Customer;

  control = new FormControl('');

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.customers;
      this.filteredCustomers = response.customers;
    });

    this.control.valueChanges.subscribe(value => {
      const search = value?.toString().toLowerCase() || '';

      this.filteredCustomers = this.customers.filter(c =>
        c.firstName.toLowerCase().includes(search) ||
        c.lastName.toLowerCase().includes(search)
      );
    });
  }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
    console.log('Selected:', customer);
  }

  displayFn(customer: Customer): string {
    return customer ? `${customer.firstName} ${customer.lastName}` : '';
  }
}
