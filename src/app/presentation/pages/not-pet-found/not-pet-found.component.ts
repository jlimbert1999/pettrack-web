import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-pet-found',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div
      class="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full"
    >
      <div class="text-center animate-fadein">
        <div class="inline-flex rounded-full bg-yellow-100 p-4">
          <img
            src="images/icons/search.png"
            alt="Search icon"
            class="w-16 h-16"
          />
        </div>
        <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
          Sin resultados
        </h1>

        <p class="text-slate-600 mt-5 lg:text-lg">
          La mascota no existe. Inicie sesion para ver todas sus mascotas
          registradas
        </p>
        <div class="block mt-2">
          <p-button
            label="Inicio"
            variant="text"
            severity="secondary"
            (onClick)="goHome()"
          />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotPetFoundComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
