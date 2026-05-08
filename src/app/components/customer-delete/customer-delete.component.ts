import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../../services/CustomerService';
import { Customer } from '../../interfaces/Customer';

import { firstValueFrom } from 'rxjs';

import { NgForOf, NgIf } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-delete',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,

    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './customer-delete.component.html',
  styleUrl: './customer-delete.component.css'
})

export class CustomerDeleteComponent implements OnInit {

  customers: Customer[] = [];

  selectedCustomerId: string = '';

  isLoading = false;
  isInitialLoading = true;

  constructor(
    private customerService: CustomerService
  ) {}

  async ngOnInit() {
    await this.loadCustomers();
  }

  async loadCustomers() {

    try {

      const response = await firstValueFrom(
        this.customerService.getCustomers()
      );

      this.customers = response.customers;

    } catch (err: any) {

      alert(err?.error?.message || 'Fehler beim Laden');

    } finally {

      this.isInitialLoading = false;
    }
  }

  onCustomerSelect(event: MatSelectChange) {
    this.selectedCustomerId = event.value;
  }

  async onDelete() {

    if (!this.selectedCustomerId) {
      alert('Bitte einen Kunden auswählen');
      return;
    }

    const confirmed = confirm(
      'Möchtest du diesen Kunden wirklich löschen?'
    );

    if (!confirmed) {
      return;
    }

    this.isLoading = true;

    try {

      const response = await firstValueFrom(
        this.customerService.deleteCustomer(
          this.selectedCustomerId
        )
      );

      alert(response.message);

      // Gelöschten Customer aus Liste entfernen
      this.customers = this.customers.filter(
        customer => customer.id !== this.selectedCustomerId
      );

      this.selectedCustomerId = '';

    } catch (err: any) {

      alert(err?.error?.message || 'Fehler beim Löschen');

    } finally {

      this.isLoading = false;
    }
  }
}
