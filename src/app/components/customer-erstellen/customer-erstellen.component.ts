import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CustomerService} from '../../services/CustomerService';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-erstellen',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf
  ],
  standalone: true,
  templateUrl: './customer-erstellen.component.html',
  styleUrl: './customer-erstellen.component.css'
})
export class CustomerErstellenComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    birthDate: new FormControl('')
  });

  geschlechterList = [
    {label: 'Männlich', value: 'M'},
    {label: 'Weiblich', value: 'W'},
    {label: 'Divers', value: 'D'}
  ];

  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar) {
  }

  onSubmit(): void {
    const formValue = this.form.value;

    const customer = {
      ...formValue,
      birthDate: formValue.birthDate
        ? new Date(formValue.birthDate).toISOString().split('T')[0]
        : null
    };

    this.customerService.createCustomer(customer as any)
      .subscribe({
        next: (response) => {
          console.log('Created:', response);

          this.snackBar.open(
            '✅ Kunde erfolgreich erstellt',
            'OK',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
          this.form.reset();
        },

        error: (err) => {
          console.error(err);

          this.snackBar.open(
            '❌ Fehler beim Erstellen',
            'Schließen',
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
        }
      });
  }
}
