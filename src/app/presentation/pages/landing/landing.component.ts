import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  template: `
   

    <div class="min-h-screen bg-gray-100 font-sans">
      <main class="container mx-auto py-12 px-6">
        <section class="mb-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="order-2 md:order-1">
              <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
                Consulta el registro de tus mascotas fácilmente
              </h1>
              <p class="text-lg text-gray-700 mb-6">
                Accede a la información de tus animales de compañía registrados
                en la alcaldía con tu número de DNI y fecha de nacimiento. ¡Es
                rápido, seguro y sencillo!
              </p>
              <!-- <p-button label="Acceder a la consulta" icon="pi pi-search" styleClass="p-button-raised p-button-lg"></p-button> -->
            </div>
            <div class="order-1 md:order-2">
              <img
                src="images/banner.jpeg"
                alt="Consulta de mascotas"
                class="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section
      class="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20"
    >
      <div
        class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8"
      >
        <!-- Texto y CTA -->
        <div class="text-center md:text-left">
          <h1
            class="text-5xl font-extrabold leading-tight mb-4 animate-fade-in"
          >
            Consulta el registro de tus mascotas fácilmente
          </h1>
          <p class="text-lg text-gray-200 mb-6 animate-fade-in delay-200">
            Accede a la información oficial de tus animales de compañía
            registrados en la alcaldía. Rápido, seguro y sin complicaciones.
          </p>
          <a
            href="/consulta"
            class="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:scale-105 inline-block animate-fade-in delay-300"
          >
            <i class="pi pi-search mr-2"></i> Acceder a la consulta
          </a>
        </div>
        <!-- Imagen Hero -->
        <div class="relative">
          <img
            src="images/banner.jpeg"
            alt="Consulta de mascotas"
            class="w-full max-w-lg mx-auto rounded-lg shadow-md animate-fade-in delay-500"
          />
        </div>
      </div>
    </section>

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
                  Ingresa tu DNI
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

        <section class="py-12 bg-gray-200 rounded-lg shadow-md mb-16">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-semibold text-gray-900 text-center mb-8">
              ¿Por qué usar esta herramienta?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white rounded-lg p-6 shadow-sm">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4"
                >
                  <i class="pi pi-check text-xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Información al instante
                </h3>
                <p class="text-gray-600">
                  Accede a los datos de tus mascotas de forma rápida y sin
                  complicaciones.
                </p>
              </div>
              <div class="bg-white rounded-lg p-6 shadow-sm">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4"
                >
                  <i class="pi pi-lock text-xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Seguridad de tus datos
                </h3>
                <p class="text-gray-600">
                  Tu información personal está protegida en todo momento.
                </p>
              </div>
              <div class="bg-white rounded-lg p-6 shadow-sm">
                <div
                  class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4"
                >
                  <i class="pi pi-info-circle text-xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Información oficial
                </h3>
                <p class="text-gray-600">
                  Consulta los datos directamente del registro de la alcaldía.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="bg-gray-300 py-4 text-center text-gray-600">
        <p>&copy; 2025 Tu Alcaldía. Todos los derechos reservados.</p>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingComponent {}
