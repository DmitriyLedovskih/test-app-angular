import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard, NotAuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users/:id',
        component: UserPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [NotAuthGuard],
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [NotAuthGuard],
      },
    ],
  },
];
