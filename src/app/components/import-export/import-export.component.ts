import {NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Component} from '@angular/core';
import {ReadingService} from '../../services/reading.service';
import {ImportExportService} from '../../services/import-export.service';
import {Reading} from '../../models/reading.model';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/customer.model';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './import-export.component.html',
  styleUrl: './import-export.component.css'
})
export class ImportExportComponent {
  message = '';
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private readingService: ReadingService,
    private importExportService: ImportExportService
  ) {}

  exportJson(): void {
    // ✅ Fix: beide Datensätze gleichzeitig laden mit forkJoin
    forkJoin({
      customers: this.customerService.getCustomers(),
      readings: this.readingService.getReadings()
    }).subscribe({
      next: ({ customers, readings }) => {
        this.importExportService.downloadJson(customers, readings);
        this.message = 'JSON exportiert.';
        this.errorMessage = '';
      },
      error: err => this.handleError(err)
    });
  }

  exportXml(): void {
    // ✅ Fix: beide Datensätze gleichzeitig laden mit forkJoin
    forkJoin({
      customers: this.customerService.getCustomers(),
      readings: this.readingService.getReadings()
    }).subscribe({
      next: ({ customers, readings }) => {
        this.importExportService.downloadXml(customers, readings);
        this.message = 'XML exportiert.';
        this.errorMessage = '';
      },
      error: err => this.handleError(err)
    });
  }

  exportCsv(): void {
    // ✅ Fix: Readings laden statt leeres Array
    this.readingService.getReadings().subscribe({
      next: readings => {
        this.importExportService.downloadCsv(readings);
        this.message = 'CSV exportiert.';
        this.errorMessage = '';
      },
      error: err => this.handleError(err)
    });
  }

  importJson(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    file.text()
      .then(text => {
        const data = JSON.parse(text);

        if (Array.isArray(data.customers)) {
          data.customers.forEach((customer: Customer) => {
            this.customerService.createCustomer(customer).subscribe();
          });
        }

        if (Array.isArray(data.readings)) {
          // ✅ reading ist bereits ein Reading-Objekt aus dem JSON
          data.readings.forEach((reading: Reading) => {
            this.readingService.createReading(reading).subscribe();
          });
        }

        this.message = 'JSON importiert.';
        this.errorMessage = '';
      })
      .catch(() => {
        this.errorMessage = 'JSON konnte nicht gelesen werden.';
        this.message = '';
      });
  }

  private handleError(err: any): void {
    this.errorMessage = err.error?.message || 'Fehler beim Import/Export.';
    this.message = '';
  }
}
