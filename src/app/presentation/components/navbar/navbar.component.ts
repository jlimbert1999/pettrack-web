import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MenubarModule, ProfileComponent, RouterModule],
  template: `
    <div class="card">
      <p-menubar [model]="items">
        <ng-template #start>
          <img src="images/icons/app.png" alt="App Icon" class="w-9 h-9 mr-2" />
        </ng-template>
        <ng-template #item let-item let-root="root">
          <a
            pRipple
            class="flex items-center p-menubar-item-link"
            [routerLink]="item.routerLink"
          >
            <span>{{ item.label }}</span>
          </a>
        </ng-template>
        <ng-template #end>
          <profile />
        </ng-template>
      </p-menubar>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      routerLink: '/home',
    },
    {
      label: 'Mascotas',
      routerLink: '/pets',
    },
  ];
}
