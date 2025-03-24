import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

import { petDetail } from '../../../infrastructure';
import { OwnerService } from '../../services';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './verify.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VerifyComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private router = inject(Router);
  @Input('id') id?: string;

  pet = signal<petDetail | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.getPetDetails();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  private getPetDetails() {
    if (!this.id) return;
    this.ownerService.getPetDetail(this.id).subscribe({
      next: (pet) => {
        this.pet.set(pet);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 404:
              this.router.navigateByUrl('no-found');
              break;
            case 400:
              this.router.navigateByUrl('no-found');
              break;

            default:
              this.router.navigateByUrl('home');
              break;
          }
        }
      },
    });
  }
}
