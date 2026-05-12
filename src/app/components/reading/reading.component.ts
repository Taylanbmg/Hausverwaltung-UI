import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReadingService } from '../../services/reading.service';
import { KindOfMeter, Reading } from '../../models/reading.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatProgressBar } from '@angular/material/progress-bar';
import {NgForOf, NgIf, DatePipe, NgClass} from '@angular/common';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import {ReadingDialogComponent} from '../dialog/readingDialog.component';
import {MatChip} from '@angular/material/chips';


@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [
    MatTable, MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    ReactiveFormsModule,
    MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle,
    MatFormField, MatLabel, MatError,
    MatInputModule, MatButtonModule,
    MatIcon, MatTooltipModule,
    MatDatepickerInput, MatDatepickerToggle, MatDatepicker,
    MatSelect, MatOption,
    MatProgressBar,
    NgIf, NgForOf, DatePipe, MatChip, NgClass
  ],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css'
})
export class ReadingComponent implements OnInit {
  filterForm!: FormGroup;

  readings: Reading[] = [];
  customers: Customer[] = [];

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  displayedColumns: string[] = [
    'dateOfReading', 'meterId', 'meterCount',
    'kindOfMeter', 'comment', 'substitute', 'actions'
  ];

  kindOfMeterOptions: { value: KindOfMeter | ''; label: string }[] = [
    { value: '', label: 'Alle' },
    { value: 'STROM', label: 'Strom' },
    { value: 'WASSER', label: 'Wasser' },
    { value: 'HEIZUNG', label: 'Heizung' },
    { value: 'UNBEKANNT', label: 'Unbekannt' }
  ];

  constructor(
    private fb: FormBuilder,
    private readingService: ReadingService,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      customer: ['', Validators.required],
      start: [null],
      end: [null],
      kindOfMeter: ['']
    });

    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: c => this.customers = c,
      error: err => this.handleError(err)
    });
  }

  onSearch(): void {
    if (this.filterForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.readings = [];

    const { customer, start, end, kindOfMeter } = this.filterForm.value;

    this.readingService.getReadings(
      customer || undefined,
      start ? this.formatDate(start) : undefined,
      end ? this.formatDate(end) : undefined,
      kindOfMeter || undefined
    ).subscribe({
      next: r => { this.readings = r; this.isLoading = false; },
      error: err => this.handleError(err)
    });
  }

  openDialog(reading: Reading | null = null): void {
    const ref = this.dialog.open(ReadingDialogComponent, {
      width: '780px',
      maxHeight: '90vh',
      panelClass: 'reading-dialog-panel',
      data: { reading, customers: this.customers }
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const prepared = this.prepareReading(result);
      const id = prepared.id || prepared.uuid;

      if (id) {
        this.readingService.updateReading(prepared).subscribe({
          next: () => { this.successMessage = 'Ablesung aktualisiert.'; this.errorMessage = ''; this.onSearch(); },
          error: err => this.handleError(err)
        });
      } else {
        this.readingService.createReading(prepared).subscribe({
          next: () => { this.successMessage = 'Ablesung angelegt.'; this.errorMessage = ''; this.onSearch(); },
          error: err => this.handleError(err)
        });
      }
    });
  }

  deleteReading(reading: Reading): void {
    const id = reading.id || reading.uuid;
    if (!id) return;

    this.readingService.deleteReading(id).subscribe({
      next: () => { this.successMessage = 'Ablesung gelöscht.'; this.errorMessage = ''; this.onSearch(); },
      error: err => this.handleError(err)
    });
  }

  onReset(): void {
    this.filterForm.reset({ customer: '', start: null, end: null, kindOfMeter: '' });
    this.readings = [];
    this.errorMessage = '';
    this.successMessage = '';
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
