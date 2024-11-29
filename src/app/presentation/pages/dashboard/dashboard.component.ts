import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DataView } from 'primeng/dataview';
import { OwnerService, PdfService } from '../../services';
import { CommonModule } from '@angular/common';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { pet } from '../../../infrastructure';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DataView,
    SelectButton,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private pdfService = inject(PdfService);
  layout: 'list' | 'grid' = 'grid';

  pets = signal<pet[]>([]);

  options = ['list', 'grid'];

  ngOnInit(): void {
    this.ownerService.getPets().subscribe((resp) => {
      this.pets.set(resp);
    });
  }

  card(pet:pet){
    this.pdfService.generateCard(pet)
  }
}
