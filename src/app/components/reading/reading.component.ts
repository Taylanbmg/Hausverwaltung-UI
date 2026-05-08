import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {ReadingService} from '../../services/reading.service';
import {KindOfMeter, Reading} from '../../models/reading.model';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Router} from '@angular/router';
import { NgForOf, NgIf, DatePipe } from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {Customer} from '../../models/customer.model';
import {CustomerService} from '../../services/customer.service';


@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    ReactiveFormsModule,
    MatCard, MatCardContent, MatCardTitle,
    MatFormField, MatLabel, MatError,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatDatepickerInput, MatDatepickerToggle, MatDatepicker,
    MatSelect, MatOption,
    MatProgressBar,
    NgIf, NgForOf, DatePipe, MatCheckbox,
  ],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css'
})
export class ReadingComponent implements OnInit {
  filterForm!: FormGroup;
  readingForm!: FormGroup;

  readings: Reading[] = [];
  customers: Customer[] = [];

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  displayedColumns: string[] = [
    'dateOfReading',
    'meterId',
    'meterCount',
    'kindOfMeter',
    'comment',
    'substitute',
    'actions'
  ];

  kindOfMeterOptions: { value: KindOfMeter | ''; label: string }[] = [
    { value: '', label: 'Alle' },
    { value: 'STROM', label: 'Strom' },
    { value: 'WASSER', label: 'Wasser' },
    { value: 'HEIZUNG', label: 'Heizung' },
    { value: 'UNBEKANNT', label: 'Unbekannt' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private readingService: ReadingService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      customer: ['', Validators.required],
      start: [null],
      end: [null],
      kindOfMeter: ['']
    });

    this.readingForm = this.formBuilder.group({
      id: [null],
      uuid: [null],
      customer: ['', Validators.required],
      dateOfReading: [null, Validators.required],
      meterId: ['', Validators.required],
      meterCount: [0, Validators.required],
      kindOfMeter: ['UNBEKANNT', Validators.required],
      substitute: [false],
      comment: ['']
    });

    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: customers => this.customers = customers,
      error: err => this.handleError(err)
    });
  }

  onSearch(): void {
    if (this.filterForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.readings = [];

    const { customer, start, end, kindOfMeter } = this.filterForm.value;

    this.readingService.getReadings(
      customer || undefined,
      start ? this.formatDate(start) : undefined,
      end ? this.formatDate(end) : undefined,
      kindOfMeter || undefined
    ).subscribe({
      next: readings => {
        this.readings = readings;
        this.isLoading = false;
      },
      error: err => this.handleError(err)
    });
  }

  saveReading(): void {
    if (this.readingForm.invalid) return;

    const reading = this.prepareReading(this.readingForm.value);
    const id = reading.id || reading.uuid;

    if (id) {
      this.readingService.updateReading(reading).subscribe({
        next: () => {
          this.successMessage = 'Ablesung aktualisiert.';
          this.errorMessage = '';
          this.resetReadingForm();
          this.onSearch();
        },
        error: (err: any) => this.handleError(err)
      });
    } else {
      this.readingService.createReading(reading).subscribe({
        next: () => {
          this.successMessage = 'Ablesung angelegt.';
          this.errorMessage = '';
          this.resetReadingForm();
          this.onSearch();
        },
        error: (err: any) => this.handleError(err)
      });
    }
  }

  editReading(reading: Reading): void {
    this.readingForm.patchValue({
      ...reading,
      customer: reading.customer?.id || reading.customer?.uuid || '',
      dateOfReading: reading.dateOfReading ? new Date(reading.dateOfReading) : null
    });
  }

  deleteReading(reading: Reading): void {
    const id = reading.id || reading.uuid;
    if (!id) return;

    this.readingService.deleteReading(id).subscribe({
      next: () => {
        this.successMessage = 'Ablesung gelöscht.';
        this.errorMessage = '';
        this.onSearch();
      },
      error: err => this.handleError(err)
    });
  }

  onReset(): void {
    this.filterForm.reset({
      customer: '',
      start: null,
      end: null,
      kindOfMeter: ''
    });

    this.readings = [];
    this.errorMessage = '';
    this.successMessage = '';
  }

  resetReadingForm(): void {
    this.readingForm.reset({
      id: null,
      uuid: null,
      customer: '',
      dateOfReading: null,
      meterId: '',
      meterCount: 0,
      kindOfMeter: 'UNBEKANNT',
      substitute: false,
      comment: ''
    });
  }

  private prepareReading(value: any): Reading {
    const customer = this.customers.find(c => (c.id || c.uuid) === value.customer) ?? null;

    return {
      id: value.id,
      uuid: value.uuid,
      customer,
      dateOfReading: this.formatDate(value.dateOfReading),
      meterId: value.meterId,
      meterCount: Number(value.meterCount),
      kindOfMeter: value.kindOfMeter,
      substitute: Boolean(value.substitute),
      comment: value.comment || null
    };

  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') return date;
    return date.toISOString().split('T')[0];
  }

  private handleError(err: any): void {
    this.errorMessage = err.error?.message || 'Fehler bei der Anfrage.';
    this.successMessage = '';
    this.isLoading = false;
  }


}
