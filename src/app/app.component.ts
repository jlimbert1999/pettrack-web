import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';
import { es } from 'primelocale/es.json';

const MyPreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
});
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pettrack-web';

  constructor(private config: PrimeNG) {
    // Default theme configuration
    this.config.theme.set({
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: '.my-app-dark',
        cssLayer: false,
      },
    });
    this.config.setTranslation(es);
  }
  ngOnInit(): void {}
}
