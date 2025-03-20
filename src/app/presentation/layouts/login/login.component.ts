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
import { AutoFocusModule } from 'primeng/autofocus';
import { DatePicker } from 'primeng/datepicker';
import { Message } from 'primeng/message';

import { AuthService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    DatePicker,
    ReactiveFormsModule,
    Message,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  message = signal<string | null>(null);

  loginForm: FormGroup = this._formBuilder.group({
    dni: ['', Validators.required],
    birthDate: ['', Validators.required],
  });

  login() {
    this.message.set(null);
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/pets');
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log('errors', error);
          this.message.set(error.error['message'] ?? 'Solicitud invalida');
        }
      },
    });
  }
}
