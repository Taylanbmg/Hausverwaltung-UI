import {Component, OnInit} from '@angular/core';
import {Customer} from '../../interfaces/Customer';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CustomerService} from '../../services/CustomerService';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-suche',
  imports: [
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatOption,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './customer-suche.component.html',
  styleUrl: './customer-suche.component.css'
})
export class CustomerSucheComponent implements OnInit{
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
