import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import {MatOption, MatSelect} from '@angular/material/select';
import {MatProgressBar} from '@angular/material/progress-bar';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {Component, OnInit} from '@angular/core';
import {Customer, Gender} from '../../models/customer.model';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgIf, NgForOf, DatePipe,
    ReactiveFormsModule,
    MatCard, MatCardContent, MatCardTitle,
    MatFormField, MatLabel, MatError,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatSelect, MatOption,
    MatProgressBar,
    MatTable,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatDatepickerInput, MatDatepickerToggle, MatDatepicker
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customers: Customer[] = [];

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  displayedColumns = ['firstName', 'lastName', 'birthDate', 'gender', 'actions'];

  genderOptions: { value: Gender; label: string }[] = [
    { value: 'D', label: 'Divers' },
    { value: 'M', label: 'Männlich' },
    { value: 'W', label: 'Weiblich' },
    { value: 'U', label: 'Unbekannt' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [null],
      uuid: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [null],
      gender: ['U', Validators.required]
    });

    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;

    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        this.isLoading = false;
      },
      error: err => this.handleError(err)
    });
  }

  saveCustomer(): void {
    if (this.customerForm.invalid) return;

    const customer = this.prepareCustomer(this.customerForm.value);
    const id = customer.id || customer.uuid;

    if (id) {
      this.customerService.updateCustomer(customer).subscribe({
        next: () => {
          this.successMessage = 'Kunde aktualisiert.';
          this.errorMessage = '';
          this.resetForm();
          this.loadCustomers();
        },
        error: (err: any) => this.handleError(err)
      });
    } else {
      this.customerService.createCustomer(customer).subscribe({
        next: () => {
          this.successMessage = 'Kunde angelegt.';
          this.errorMessage = '';
          this.resetForm();
          this.loadCustomers();
        },
        error: (err: any) => this.handleError(err)
      });
    }
  }

  editCustomer(customer: Customer): void {
    this.customerForm.patchValue({
      ...customer,
      birthDate: customer.birthDate ? new Date(customer.birthDate) : null
    });
  }

  deleteCustomer(customer: Customer): void {
    const id = customer.id || customer.uuid;
    if (!id) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.successMessage = 'Kunde gelöscht.';
        this.errorMessage = '';
        this.loadCustomers();
      },
      error: err => this.handleError(err)
    });
  }

  resetForm(): void {
    this.customerForm.reset({
      id: null,
      uuid: null,
      firstName: '',
      lastName: '',
      birthDate: null,
      gender: 'U'
    });
  }

  private prepareCustomer(value: any): Customer {
    return {
      id: value.id,
      uuid: value.uuid,
      firstName: value.firstName,
      lastName: value.lastName,
      birthDate: value.birthDate ? this.formatDate(value.birthDate) : null,
      gender: value.gender
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private handleError(err: any): void {
    this.errorMessage = err.error?.message || 'Fehler bei der Anfrage.';
    this.successMessage = '';
    this.isLoading = false;
  }
}
