import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OwnerService } from '../../services';
import { forkJoin } from 'rxjs';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule],
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private location = inject(Location);
  @Input('id') id?: string;

  pet = signal<any | null>(null);
  history = signal<any[]>([]);

  ngOnInit(): void {
    this._getPetDetails();
  }

  private _getPetDetails() {
    if (!this.id) return;
    // forkJoin([
    //   this.ownerService.getDetail(this.id),
    //   this.ownerService.getPetTreatments(this.id),
    // ]).subscribe({
    //   next: ([detail, history]) => {
    //     this.pet.set(detail);
    //     this.history.set(history);
    //   },
    // });
  }

  back() {
    this.location.back();
  }
}
