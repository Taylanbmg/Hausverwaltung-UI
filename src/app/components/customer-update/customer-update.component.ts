import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/CustomerService';
import {Customer} from '../../interfaces/Customer';

import {firstValueFrom} from 'rxjs';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {NgForOf, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';

export const noFutureDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;

  const selected = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected > today ? {futureDate: true} : null;
};
@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent implements OnInit {

  form!: FormGroup;

  customers: Customer[] = [];

  selectedCustomerId: string = '';

  isLoading = false;
  isInitialLoading = true;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  async ngOnInit() {
    this.initForm();
    await this.loadCustomers();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['',[ Validators.required, noFutureDateValidator]],
    });
  }

  async loadCustomers() {
    try {
      const response = await firstValueFrom(
        this.customerService.getCustomers()
      );

      this.customers = response.customers;

    } catch (err: any) {
      alert(err?.error?.message || 'Fehler beim Laden der Kunden');
    } finally {
      this.isInitialLoading = false;
    }
  }

  onCustomerSelect(customerId: string) {

    this.selectedCustomerId = customerId;

    const selectedCustomer = this.customers.find(
      customer => customer.id === customerId
    );

    if (!selectedCustomer) {
      return;
    }

    this.form.patchValue({
      firstName: selectedCustomer.firstName,
      lastName: selectedCustomer.lastName,
      gender: selectedCustomer.gender,
      birthDate: new Date(selectedCustomer.birthDate)
    });
  }

  async onSubmit() {

    if (!this.selectedCustomerId) {
      alert('Bitte einen Kunden auswählen');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {

      const updatedCustomer: Customer = {
        ...this.form.value,
        birthDate: this.form.value.birthDate
          .toISOString()
          .split('T')[0]
      };

      const response = await firstValueFrom(
        this.customerService.updateCustomer(
          updatedCustomer,
          this.selectedCustomerId
        )
      );

      alert(response.message);

    } catch (err: any) {
      alert(err?.error?.message || 'Fehler beim Update');
    } finally {
      this.isLoading = false;
    }
  }
}
