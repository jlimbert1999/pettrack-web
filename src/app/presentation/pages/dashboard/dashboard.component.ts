import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { SelectButton } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataView } from 'primeng/dataview';

import { AuthService, OwnerService, PdfService } from '../../services';
import { PetInfoComponent } from '../../components';
import { pet } from '../../../infrastructure';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DataView,
    FormsModule,
    SelectButton,
    ButtonModule,
    DialogModule,
    SkeletonModule,
    PetInfoComponent,
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private pdfService = inject(PdfService);
  private owner = inject(AuthService).user();

  readonly options = ['list', 'grid'];
  layout: 'list' | 'grid' = 'list';
  pets = signal<pet[]>([]);
  user = inject(AuthService).user;

  visible: boolean = false;
  selectedPet = signal<pet | null>(null);
  isLoading = signal(false);

  items = Array.from({ length: 3 }, (_, index) => index);

  ngOnInit(): void {
    this.getPets();
  }

  showDetail(item: pet) {
    this.selectedPet.set(item);
    this.visible = true;
  }

  generateIdCard(pet: pet) {
    this.pdfService.generateCard(pet, this.owner!);
  }

  private getPets() {
    this.isLoading.set(true);
    this.ownerService.getPets().subscribe({
      next: (pets) => this.pets.set(pets),
      complete: () => this.isLoading.set(false),
    });
  }
}
