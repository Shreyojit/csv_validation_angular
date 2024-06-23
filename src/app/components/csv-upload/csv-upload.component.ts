import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as Papa from 'papaparse';
import * as Yup from 'yup';
import { CsvRow } from '../../model/model';


@Component({
  selector: 'app-csv-upload',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule],
  templateUrl: './csv-upload.component.html',
  styleUrl: './csv-upload.component.css'
})
export class CsvUploadComponent {
  

  @Output() dataParsed = new EventEmitter<CsvRow[]>();

  data: CsvRow[] = [];
  errors: { index: number, errorFields: string[] }[] = [];

  csvSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    roll: Yup.string().required('Roll is required'),
    dept: Yup.string().required('Department is required'),
    age: Yup.number().required('Age is required'),
    passion: Yup.string().required('Passion is required'),
    oe_course: Yup.string().required('OE Course is required'),
    elective_course: Yup.string().required('Elective Course is required'),
    backlogs: Yup.number().required('Backlogs are required').min(0),
    career_goals: Yup.string().required('Career Goals are required'),
    remarks: Yup.string().nullable()
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          this.validateCsv(result.data);
        }
      });
    }
  }

  validateCsv(data: any[]) {
    this.data = [];
    this.errors = [];

    data.forEach((row, index) => {
      const csvRow: CsvRow = {
        name: row.name || '',
        roll: row.roll || '',
        dept: row.dept || '',
        age: parseInt(row.age, 10) || 0,
        passion: row.passion || '',
        oe_course: row.oe_course || '',
        elective_course: row.elective_course || '',
        backlogs: parseInt(row.backlogs, 10) || 0,
        career_goals: row.career_goals || '',
        remarks: row.remarks || '',
        errors: {} // Initialize errors object
      };

      this.csvSchema.validate(csvRow, { abortEarly: false })
        .then(validRow => {
          this.data.push(csvRow);
        })
        .catch(error => {
          const errorFields = error.inner.map((error: any) => error.path)
          this.errors.push({ index: index + 1, errorFields: errorFields });
          console.log(`Validation failed for row ${index + 1}:`, errorFields); // Log errorFields
        });
    });
  }

  hasErrors(row: CsvRow): boolean {
    // return !this.errors.find(error => error.index === this.data.indexOf(row) + 1);
   const hasErrorsReported = this.errors.some(error => error.index === this.data.indexOf(row) + 1);

  // Check if the row has any empty or null fields
  const hasEmptyFields = this.hasEmptyFields(row);

  // Return true if either there are errors reported or if there are empty fields
  return hasErrorsReported || hasEmptyFields;
  }

  hasEmptyFields(row: CsvRow): boolean {
    return Object.values(row).some(value => !value);
  }



  
}
