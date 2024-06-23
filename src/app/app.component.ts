import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CsvRow } from './model/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CsvUploadComponent,NgFor,NgIf,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'upload_csv';
  data: CsvRow[] = [];

  handleDataParsed(data: CsvRow[]) {
    this.data = data;
    console.log(data)
}

// Example logic in CsvUploadComponent

}
