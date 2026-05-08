import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {ReadingService} from './services/reading.service';
import {JsonPipe} from '@angular/common';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatButton, MatIconModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor( private router: Router) {}
  goToCustomers(): void {
    this.router.navigate(['/customers']);
  }

  goToReading(): void {
    this.router.navigate(['/reading']);
  }

  goToImportExport(): void {
    this.router.navigate(['/import-export']);
  }

  goToCustomerOverview() {
    this.router.navigate(['/overview'])
  }
}
