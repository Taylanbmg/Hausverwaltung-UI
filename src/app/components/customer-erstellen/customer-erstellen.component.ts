import {Component} from '@angular/core';
import {Customer} from '../../interfaces/Customer';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerService} from '../../services/CustomerService';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-customer-erstellen',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepickerActions,
    MatDatepickerModule,
    MatButtonModule,
    MatDatepickerApply,
    MatDatepickerCancel
  ],
  standalone: true,
  templateUrl: './customer-erstellen.component.html',
  styleUrl: './customer-erstellen.component.css'
})
export class CustomerErstellenComponent {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.postCustomer(this.customers).subscribe(response => {
      this.customers = response.customers;
    });
  }
}
