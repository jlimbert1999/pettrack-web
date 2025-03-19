import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DataView } from 'primeng/dataview';
import { AuthService, OwnerService, PdfService } from '../../services';
import { CommonModule } from '@angular/common';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { pet } from '../../../infrastructure';
import { PetInfoComponent } from '../../components';

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
    DialogModule,
    PetInfoComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private pdfService = inject(PdfService);

  readonly options = ['list', 'grid'];
  layout: 'list' | 'grid' = 'list';
  pets = signal<pet[]>([]);
  fullname = inject(AuthService).fullname;

  visible: boolean = false;
  selectedPet = signal<pet | null>(null);

  showDetail(item: pet) {
    this.selectedPet.set(item);
    this.visible = true;
  }

  ngOnInit(): void {
    this.ownerService.getPets().subscribe((resp) => {
      console.log(resp);
      this.pets.set(resp);
    });
  }

  generateIdCard(pet: pet) {
    this.pdfService.generateCard(pet);
  }
}
