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
        class="relative bg-gradient-to-br from-green-500 to-blue-600 text-white pt-32 pb-20"
      >
        <!-- absolute institution logo -->
        <div
          class="absolute top-0 p-2 sm:p-4 left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none z-10"
        >
          <img
            src="images/logos/sacaba.png"
            alt="Gobierno Autónomo Municipal de Sacaba"
            class="h-18 sm:h-24"
          />
        </div>
        <div
          class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-1"
        >
          <div class="text-center md:text-left">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in"
            >
              Consulta el registro de tus
              <span class="text-yellow-300">mascotas</span> fácilmente
            </h1>
            <p
              class="text-xl text-blue-100 font-medium mb-8 animate-fade-in delay-200 max-w-lg"
            >
              Accede a la información de tus mascotas registradas por el
              <span class="font-semibold text-white"
                >Gobierno Autónomo Municipal de Sacaba</span
              >
            </p>
            <a routerLink="/pets" class="p-button font-bold" severity="info">
              <i class="pi pi-search px-2"></i>
              Realizar consulta
            </a>
          </div>
          <div class="relative">
            <img
              src="images/banners/banner-landing.jpeg"
              alt="Consulta de mascotas"
              class="w-full max-w-lg mx-auto rounded-lg shadow-md animate-fade-in delay-500"
            />
          </div>
        </div>
      </section>

      <main class="container mx-auto py-16 px-6">
        <section
          class="bg-white py-12 rounded-xl shadow-lg mb-16 border border-gray-100"
        >
          <div class="container mx-auto px-6">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p class="text-gray-600 max-w-2xl mx-auto">
                Sigue estos simples pasos para consultar el registro de tus
                mascotas
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                class="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <div
                  class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-md"
                >
                  <i class="pi pi-id-card text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">
                  Ingresa tu número de carnet
                </h3>
                <p class="text-gray-600">
                  Introduce tu número de documento de identidad para acceder al
                  sistema.
                </p>
              </div>

              <div
                class="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <div
                  class="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-md"
                >
                  <i class="pi pi-calendar text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">
                  Ingresa tu fecha de nacimiento
                </h3>
                <p class="text-gray-600">
                  Selecciona tu fecha de nacimiento para verificar tu identidad
                  de forma segura.
                </p>
              </div>

              <div
                class="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <div
                  class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-6 shadow-md"
                >
                  <i class="pi pi-list text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">
                  Consulta tus mascotas
                </h3>
                <p class="text-gray-600">
                  Visualiza el listado completo de tus mascotas registradas en
                  el sistema municipal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Sección de campaña -->
        <section
          class="mb-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl overflow-hidden shadow-lg"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 items-center">
            <div class="p-8 md:p-12 lg:p-16 order-2 md:order-1">
              <span
                class="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4"
              >
                Campaña Municipal
              </span>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                CAMPAÑA DE ESTERILIZACIÓN CANINA Y FELINA
              </h2>
              <p class="text-gray-700 text-lg mb-6">
                Con el objetivo de fomentar la tenencia responsable de las
                mascotas y cuidar la salud de la población, el Gobierno Autónomo
                Municipal de Sacaba a través de la Secretaría Municipal de Salud
                lanzó el Registro Único de Mascotas (RUM).
              </p>
            </div>
            <div class="order-1 md:order-2 h-full">
              <img
                src="images/pet.png"
                alt="Campaña de esterilización"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <footer class="bg-gray-900 text-white pt-12 pb-6">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div class="flex justify-center">
              <img
                src="images/logos/slogan.png"
                alt="Gobierno Autónomo Municipal de Sacaba"
                class="h-24 mb-4"
              />
            </div>

            <div>
              <h4 class="text-lg font-semibold  mb-4">Enlaces útiles</h4>
              <ul class="space-y-2">
                <li>
                  <a
                    href="https://www.sacaba.gob.bo"
                    target="_blank"
                    class="hover:text-blue-400 transition-colors"
                    >Municipio de Sacaba</a
                  >
                </li>
                <li>
                  <a
                    href="https://www.gamssms.com.bo"
                    target="_blank"
                    class="hover:text-blue-400 transition-colors"
                    >Secretaría Municipal de Salud</a
                  >
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-4">Contacto</h4>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="pi pi-phone mr-2 text-blue-400"></i>
                  <span> +(591) 4-4701677 </span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-envelope mr-2 text-blue-400"></i>
                  <span> info&#64;sacaba.gob.bo</span>
                </li>
                <li class="flex items-center">
                  <i class="pi pi-map-marker mr-2 text-blue-400"></i>
                  <span> Plaza 6 de Agosto Pasaje Conastorial </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold  mb-4">Redes sociales</h4>
              <div class="flex space-x-4">
                <a
                  href="https://www.facebook.com/gob.municipal.sacaba"
                  target="_blank"
                  class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <i class="pi pi-facebook"></i>
                </a>

                <a
                  href="https://www.youtube.com/user/SACABACBBABO"
                  target="_blank"
                  class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <i class="pi pi-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-start items-center"
          >
            <p class="text-gray-400 text-sm mb-4 md:mb-0">
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
