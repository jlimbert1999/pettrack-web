import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FocusTrapModule } from 'primeng/focustrap';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

import { finalize } from 'rxjs';

import { AuthService } from '../../services';
import {
  FieldValidationErrorMessages,
  FormErrorMessagesPipe,
} from '../../pipes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FocusTrapModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DatePicker,
    ReactiveFormsModule,
    Message,
    FormErrorMessagesPipe,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected errorMessages: FieldValidationErrorMessages = {
    dni: {
      pattern: 'No se permiten caracteres especialses',
    },
  };

  isLoading = signal(false);
  message = signal<string | null>(null);
  loginForm: FormGroup = this._formBuilder.group({
    dni: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z0-9-]+$/),
      ],
    ],
    birthDate: ['', Validators.required],
  });

  maxDate = new Date();

  login() {
    this.isLoading.set(true);
    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => this.loginForm.reset()))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigateByUrl('/pets');
        },
        error: (error) => {
          this.isLoading.set(false);
          if (error instanceof HttpErrorResponse) {
            this.showMessage(error.error['message'] ?? 'Solicitud invalida');
          }
        },
      });
  }

  showMessage(message: string) {
    this.message.set(message);
    setTimeout(() => {
      this.message.set(null);
    }, 3000);
  }
}
