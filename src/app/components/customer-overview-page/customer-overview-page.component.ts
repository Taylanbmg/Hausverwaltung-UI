import { Component } from '@angular/core';
import {MatFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-overview-page',
  imports: [
    MatFabButton,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './customer-overview-page.component.html',
  styleUrl: './customer-overview-page.component.css'
})
export class CustomerOverviewPageComponent {

  constructor(private router: Router) {}

  goToSuche() {
    this.router.navigate(['/suche']);
  }

  goToCustomerErstellen() {
    this.router.navigate(['/erstellen'])
  }

  goToCustomerUpdate() {
    this.router.navigate(['/customers/update/{uuid}'])
  }

}
