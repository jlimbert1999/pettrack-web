import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePicker } from 'primeng/datepicker';
import { Message } from 'primeng/message';

import { AuthService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
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

  login() {
    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => this.loginForm.reset()))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/pets');
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.message.set(error.error['message'] ?? 'Solicitud invalida');
          }
        },
      });
  }
}
