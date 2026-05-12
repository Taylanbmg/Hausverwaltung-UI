import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../../models/customer.model';
import { Reading } from '../../models/reading.model';
import { CustomerService } from '../../services/customer.service';
import { ReadingService } from '../../services/reading.service';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NgIf, NgForOf,
    ReactiveFormsModule,
    MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle,
    MatFormField, MatLabel,
    MatSelect, MatOption,
    MatButtonModule, MatIcon,
    MatProgressBar,
    MatInputModule
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  filterForm!: FormGroup;
  customers: Customer[] = [];
  readings: Reading[] = [];
  isLoading = false;
  errorMessage = '';

  private charts: Chart[] = [];

  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('monthChart') monthChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private readingService: ReadingService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      customer: ['', Validators.required]
    });

    this.customerService.getCustomers().subscribe({
      next: c => this.customers = c,
      error: err => this.errorMessage = 'Kunden konnten nicht geladen werden.'
    });
  }

  onLoad(): void {
    if (this.filterForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.destroyCharts();

    const customerId = this.filterForm.value.customer;

    this.readingService.getReadings(customerId).subscribe({
      next: readings => {
        this.readings = readings.sort((a, b) =>
          new Date(a.dateOfReading).getTime() - new Date(b.dateOfReading).getTime()
        );
        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 100);
      },
      error: () => {
        this.errorMessage = 'Daten konnten nicht geladen werden.';
        this.isLoading = false;
      }
    });
  }

  private buildCharts(): void {
    this.buildLineChart();
    this.buildBarChart();
    this.buildMonthChart();
    this.buildPieChart();
  }

  // 1. Verbrauchsverlauf über Zeit
  private buildLineChart(): void {
    const kinds = ['STROM', 'WASSER', 'HEIZUNG'];
    const colors = ['#f57f17', '#1565c0', '#c62828'];

    const datasets = kinds.map((kind, i) => {
      const filtered = this.readings.filter(r => r.kindOfMeter === kind);
      return {
        label: kind,
        data: filtered.map(r => ({ x: r.dateOfReading, y: r.meterCount })),
        borderColor: colors[i],
        backgroundColor: colors[i] + '33',
        tension: 0.3,
        fill: false,
        pointRadius: 4
      };
    });

    const chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: { datasets } as any,
      options: {
        responsive: true,
        scales: {
          x: { type: 'time', time: { unit: 'month' }, title: { display: true, text: 'Datum' } },
          y: { title: { display: true, text: 'Zählerstand' } }
        },
        plugins: { legend: { position: 'top' } }
      }
    });
    this.charts.push(chart);
  }

  // 2. Vergleich Zählerarten (durchschnittlicher Zählerstand)
  private buildBarChart(): void {
    const kinds = ['STROM', 'WASSER', 'HEIZUNG', 'UNBEKANNT'];
    const colors = ['#f57f17', '#1565c0', '#c62828', '#616161'];

    const avgs = kinds.map(kind => {
      const filtered = this.readings.filter(r => r.kindOfMeter === kind);
      if (!filtered.length) return 0;
      return filtered.reduce((s, r) => s + r.meterCount, 0) / filtered.length;
    });

    const chart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: kinds,
        datasets: [{
          label: 'Ø Zählerstand',
          data: avgs,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { title: { display: true, text: 'Ø Zählerstand' } } }
      }
    });
    this.charts.push(chart);
  }

  // 3. Monatsvergleich (Anzahl Ablesungen pro Monat)
  private buildMonthChart(): void {
    const monthMap: Record<string, number> = {};

    this.readings.forEach(r => {
      const month = r.dateOfReading.substring(0, 7); // yyyy-MM
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    const labels = Object.keys(monthMap).sort();
    const data = labels.map(l => monthMap[l]);

    const chart = new Chart(this.monthChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Anzahl Ablesungen',
          data,
          backgroundColor: '#7b1fa2aa',
          borderColor: '#7b1fa2',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
    this.charts.push(chart);
  }

  // 4. Ersatzwert-Anteil (Torte)
  private buildPieChart(): void {
    const substitute = this.readings.filter(r => r.substitute).length;
    const normal = this.readings.length - substitute;

    const chart = new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Normal', 'Ersatzwert'],
        datasets: [{
          data: [normal, substitute],
          backgroundColor: ['#2e7d32', '#c62828']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
    this.charts.push(chart);
  }

  private destroyCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  }
}
