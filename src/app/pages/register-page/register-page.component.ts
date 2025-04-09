import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../components/auth/auth.component';
import { AuthService } from '../../services/auth.service';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiButton, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    AuthComponent,
    ReactiveFormsModule,
    TuiButton,
    TuiButtonLoading,
    TuiForm,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
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
