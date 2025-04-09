import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser, IUserFetch } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { SectionComponent } from '../../components/section/section.component';
import { TuiBlockDetails, TuiForm } from '@taiga-ui/layout';
import { TuiButton, TuiError, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { LoaderComponent } from '../../components/loader/loader.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [
    SectionComponent,
    TuiBlockDetails,
    ReactiveFormsModule,
    TuiTitle,
    TuiAvatar,
    TuiButton,
    LoaderComponent,
    TuiForm,
    TuiTextfield,
    TuiError,
    TuiFieldErrorPipe,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  userId!: number;
  usersService = inject(UsersService);
  user: IUser | undefined = undefined;
  isVisibleForm: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  back() {
    this.router.navigate(['..']);
  }

  visibleForm() {
    this.isVisibleForm = !this.isVisibleForm;
  }

  onSubmit() {
    this.usersService.isLoading = true;
    if (this.form.valid) {
      // @ts-ignore
      this.usersService.editUser(this.userId, this.form.value).subscribe({
        next: (data: IUser) => {
          this.user = { ...data, id: this.userId };
        },
        error: (error) => {
          this.usersService.isLoading = false;
        },
        complete: () => {
          this.usersService.isLoading = false;
          this.form.reset();
          this.isVisibleForm = false;
        },
      });
    }
  }

  ngOnInit() {
    this.usersService.isLoading = true;

    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.usersService.getUser(this.userId).subscribe({
      next: ({ data }: IUserFetch) => {
        this.user = data;
      },
      error: (error) => {
        this.usersService.isLoading = false;
      },
      complete: () => {
        this.usersService.isLoading = false;
      },
    });
  }
}
