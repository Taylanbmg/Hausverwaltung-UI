import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { NgForOf } from '@angular/common';
import {Reading} from '../../models/reading.model';
import {Customer} from '../../models/customer.model';


export interface ReadingDialogData {
  reading: Reading | null;
  customers: Customer[];
}

@Component({
  selector: 'app-reading-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormField, MatLabel,
    MatInputModule,
    MatSelect, MatOption,
    MatIcon,
    MatCheckbox,
    MatDatepickerInput, MatDatepickerToggle, MatDatepicker,
    NgForOf
  ],
  templateUrl: './readingDialog.component.html',
  styleUrl: 'readingDialog.component.css'
})
export class ReadingDialogComponent implements OnInit {
  readingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReadingDialogData
  ) {}

  ngOnInit(): void {
    const r = this.data.reading;

    this.readingForm = this.fb.group({
      id: [r?.id ?? null],
      uuid: [r?.uuid ?? null],
      customer: [r?.customer?.id || r?.customer?.uuid || '', Validators.required],
      dateOfReading: [r?.dateOfReading ? new Date(r.dateOfReading) : null, Validators.required],
      meterId: [r?.meterId ?? '', Validators.required],
      meterCount: [r?.meterCount ?? 0, Validators.required],
      kindOfMeter: [r?.kindOfMeter ?? 'UNBEKANNT', Validators.required],
      substitute: [r?.substitute ?? false],
      comment: [r?.comment ?? '']
    });
  }

  onSave(): void {
    if (this.readingForm.invalid) return;
    this.dialogRef.close(this.readingForm.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
