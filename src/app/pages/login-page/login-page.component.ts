import { Component, inject } from '@angular/core';
import { TuiButton, TuiError, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { AuthComponent } from '../../components/auth/auth.component';
import { TuiForm } from '@taiga-ui/layout';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthComponent,
    TuiButtonLoading,
    TuiButton,
    ReactiveFormsModule,
    TuiForm,
    TuiTextfield,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiError,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.authService.isLoading = true;

    if (this.form.valid) {
      // @ts-ignore
      this.authService.register(this.form.value).subscribe({
        next: (data) => {
          localStorage.setItem(
            'user',
            JSON.stringify({ ...data, email: this.form.value.email })
          );
          localStorage.setItem('isAuth', JSON.stringify(true));
          window.location.reload();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.authService.isLoading = false;
        },
        complete: () => {
          this.authService.isLoading = false;
        },
      });
    }
  }
}
