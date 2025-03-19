import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [PopoverModule, ButtonModule, AvatarModule, MenuModule],
  template: `
    @if(fullname()){
    <div class="card flex justify-center">
      <p-button
        size="small"
        [rounded]="true"
        [text]="true"
        (onClick)="op.toggle($event)"
        severity="secondary"
      >
        <p-avatar label="P" shape="circle" />
      </p-button>

      <p-popover #op>
        <div class="card flex justify-center">
          <p-menu [model]="items" />
        </div>
      </p-popover>
    </div>
    } @else {
    <p-button label="Iniciar sesion" [rounded]="true" size="small" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  fullname = this.authService.fullname;
  items: MenuItem[] = [
    {
      label: 'Cerrar sesion',
      icon: 'pi pi-sign-out',
    },
  ];
}
