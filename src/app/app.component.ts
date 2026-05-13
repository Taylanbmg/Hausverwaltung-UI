import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { ReadingService } from './services/reading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar, MatIcon, MatIconModule,
    MatButton, MatButtonModule, MatIconButton,
    MatSidenav, MatSidenavContainer, MatSidenavContent,
    MatDivider, MatSlideToggle, FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  initials = 'MM';
  customerCount = 0;
  readingCount = 0;
  darkMode = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private readingService: ReadingService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customerCount = customers.length;
      }
    });
    this.readingService.getReadings().subscribe({
      next: readings => {
        this.readingCount = readings.length;
      }
    });
  }

  toggleDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }

  goToCustomers(): void { this.router.navigate(['/overview']); }
  goToReading(): void { this.router.navigate(['/overviewReading']); }
  goToImportExport(): void { this.router.navigate(['/import-export']); }
  goToStatistics(): void { this.router.navigate(['/statistics']); }
}
