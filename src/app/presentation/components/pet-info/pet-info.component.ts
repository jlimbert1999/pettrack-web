import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';

import { pet, treatment } from '../../../infrastructure';
import { OwnerService } from '../../services';

@Component({
  selector: 'pet-info',
  standalone: true,
  imports: [CommonModule, TabsModule, TagModule],
  template: `
    <p-tabs value="0">
      <p-tablist>
        <p-tab value="0">Descripcion</p-tab>
        <p-tab value="1">Tratamientos</p-tab>
      </p-tablist>
      <p-tabpanels>
        <p-tabpanel value="0">
          <div class="group relative block overflow-hidden">
            <div class="h-52 sm:h-60 w-full bg-surface-50 mb-6">
              <img
                [src]="pet().image"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>

            <div class="relative bg-white">
              <dl class="-my-3 divide-y divide-gray-100 text-sm">
                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Nombre</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ pet().name }}
                  </dd>
                </div>
                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Raza</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ pet().breed.species }} - {{ pet().breed.name }}
                  </dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Macho / Hembra</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ pet().sex | titlecase }}
                  </dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Color</dt>
                  <dd class="text-gray-700 sm:col-span-2">{{ pet().color }}</dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Registo</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ pet().createdAt | date : 'short' }}
                  </dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Esterilizado</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    {{ pet().is_neutered ? 'SI' : 'NO' }}
                  </dd>
                </div>

                <div
                  class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4"
                >
                  <dt class="font-medium text-gray-900">Descripcion</dt>
                  <dd class="text-gray-700 sm:col-span-2">
                    @if(pet().description){
                    {{ pet().description }}
                    } @else {
                    <span>--</span>
                    }
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </p-tabpanel>
        <p-tabpanel value="1">
          <div class="max-h-[500px] overflow-y-auto">
            <ul class="rounded-lg shadow divide-y divide-gray-200 h-full">
              @for (item of treatments(); track $index) {
              <li class="px-2 py-4">
                <div class="flex justify-between">
                  <span class="font-semibold text-md">
                    {{ item.typeTreatment.name }}
                  </span>
                  <span class="text-gray-500 text-sm">
                    {{ item.date | date : 'longDate' }}
                  </span>
                </div>
                <p class="text-gray-700 mt-2">
                  {{ item.typeTreatment.category }} -
                  {{ item.medicalCenter.name }}
                </p>
              </li>
              } @empty {
              <p class="font-medium">Sin registros</p>
              }
            </ul>
          </div>
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetInfoComponent implements OnInit {
  private ownerService = inject(OwnerService);
  pet = input.required<pet>();
  treatments = signal<treatment[]>([]);

  ngOnInit(): void {
    this.getTreatments();
  }

  private getTreatments() {
    this.ownerService.getPetTreatments(this.pet().id).subscribe((resp) => {
      this.treatments.set(resp);
    });
  }
}
