import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 font-sans animate-fadein">
      <section
        class="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20"
      >
        <div
          class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8"
        >
          <div class="text-center md:text-left">
            <h1
              class="text-5xl font-extrabold leading-tight mb-4 animate-fade-in"
            >
              Consulta el registro de tus mascotas fácilmente
            </h1>
            <p
              class="text-lg text-gray-200 font-semibold mb-6 animate-fade-in delay-200"
            >
              Accede a la información de tus animales de compañía registrados
              por el Gobierno Autónomo Municipal de Sacaba
            </p>
            <a routerLink="/auth" class="p-button font-bold" severity="info">
              <i class="pi pi-search px-2"></i>
              Realizar consulta
            </a>
          </div>
          <div class="relative">
            <img
              src="images/banner.jpeg"
              alt="Consulta de mascotas"
              class="w-full max-w-lg mx-auto rounded-lg shadow-md animate-fade-in delay-500"
            />
          </div>
        </div>
      </section>
      <main class="container mx-auto py-12 px-6">
        <section class="bg-white py-12 rounded-lg shadow-md mb-16">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold text-gray-900 text-center mb-8">
              ¿Cómo funciona?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div
                  class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-id-card text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Ingresa tu numero de carnet
                </h3>
                <p class="text-gray-600">
                  Introduce tu número de documento de identidad.
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-calendar text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Ingresa tu fecha de nacimiento
                </h3>
                <p class="text-gray-600">
                  Selecciona tu fecha de nacimiento para verificar tu identidad.
                </p>
              </div>
              <div class="text-center">
                <div
                  class="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4"
                >
                  <i class="pi pi-list text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Consulta tus mascotas
                </h3>
                <p class="text-gray-600">
                  Visualiza la lista de tus animales de compañía registrados.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div
              class="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8"
            >
              <div>
                <img src="images/pet.png" class="rounded" alt="" />
              </div>
              <div class="">
                <div class="max-w-lg md:max-w-none">
                  <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    CAMPAÑA DE ESTERILIZACIÓN CANINA Y FELINA
                  </h2>

                  <p class="mt-4 text-gray-700 sm:text-lg">
                    Con el objetivo de fomentar la tenencia responsable de las
                    mascotas y cuidar la salud de la población, el Gobierno
                    Autónomo Municipal de Sacaba a través de la Secretaría
                    Municipal de Salud lanzó el Registro Único de Mascotas
                    (RUM).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer class="bg-gray-300 text-gray-600">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex justify-center sm:justify-start">
              <img
                src="images/sacaba1.png"
                alt="Institution icon"
                class="h-24"
              />
            </div>
            <p class="mt-4 text-center lg:mt-0 lg:text-right">
              &copy; 2025 Gobierno Autónomo Municipal de Sacaba. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingComponent {}
