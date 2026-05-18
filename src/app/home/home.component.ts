import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { ReadingService } from '../services/reading.service';
import { forkJoin } from 'rxjs';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface Stat {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  customerCount: number | string = '…';
  readingCount: number | string = '…';

  features: FeatureCard[] = [
    {
      icon: 'ti ti-users',
      title: 'Kundenverwaltung',
      description: 'Kunden anlegen, bearbeiten und löschen – übersichtlich in einer Tabelle.',
      bgColor: 'var(--color-background-info)',
      iconColor: 'var(--color-text-info)'
    },
    {
      icon: 'ti ti-file-analytics',
      title: 'Ablesungen',
      description: 'Strom, Wasser, Heizung – alle Zählerstände erfassen und filtern.',
      bgColor: 'var(--color-background-success)',
      iconColor: 'var(--color-text-success)'
    },
    {
      icon: 'ti ti-chart-bar',
      title: 'Auswertungen',
      description: 'Grafische Diagramme für Verbrauch, Monatsvergleich und mehr.',
      bgColor: 'var(--color-background-warning)',
      iconColor: 'var(--color-text-warning)'
    },
    {
      icon: 'ti ti-upload',
      title: 'Import / Export',
      description: 'Daten in JSON, XML oder CSV exportieren und wieder importieren.',
      bgColor: 'var(--color-background-danger)',
      iconColor: 'var(--color-text-danger)'
    }
  ];

  get stats(): Stat[] {
    return [
      { value: this.customerCount, label: 'Kunden' },
      { value: this.readingCount,  label: 'Ablesungen' },
      { value: '∞',                label: 'Möglichkeiten' }
    ];
  }

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private readingService: ReadingService
  ) {}

  ngOnInit(): void {
    forkJoin({
      customers: this.customerService.getCustomers(),
      readings:  this.readingService.getReadings()
    }).subscribe({
      next: ({ customers, readings }) => {
        this.customerCount = customers.length;
        this.readingCount  = readings.length;
      },
      error: () => {
        this.customerCount = '?';
        this.readingCount  = '?';
      }
    });
  }

  goToCustomers(): void  { this.router.navigate(['/overview']); }
  goToReadings(): void   { this.router.navigate(['/overviewReading']); }
}
