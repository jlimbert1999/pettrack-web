import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    CommonModule,
    PopoverModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
  ],
  template: `
    @if(user()){
    <p-button
      size="small"
      [rounded]="true"
      [text]="true"
      (onClick)="op.toggle($event)"
      severity="secondary"
    >
      <p-avatar [label]="avatarLabel" shape="circle" />
    </p-button>

    <p-popover #op styleClass="w-11/12 sm:w-[350px] p-2">
      <div class="flex items-center justify-center gap-x-4">
        <p-avatar [label]="avatarLabel" size="large" shape="circle" />
        <div class="flex-1 font-medium">
          {{ user()?.fullname | titlecase }}
        </div>
      </div>
      <div class="card flex justify-center mt-4">
        <p-menu [model]="items" class="w-full" />
      </div>
    </p-popover>
    } @else {
    <p-button label="Iniciar sesion" [rounded]="true" size="small" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  avatarLabel = this.user()?.fullname.charAt(0).toUpperCase();
  items: MenuItem[] = [
    {
      label: 'Cerrar sesion',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout();
        this.router.navigateByUrl('/home');
      },
    },
  ];
}
