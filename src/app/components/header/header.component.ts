import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TuiLink } from '@taiga-ui/core';
import { IRegisterUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-header',
  imports: [TuiLink, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() logoutHeader = new EventEmitter<boolean>();
  authService = inject(AuthService);
  user: IRegisterUser = {
    id: 0,
    email: '',
  };

  logout() {
    this.authService.isLoading = true;

    this.authService.logout().subscribe({
      next: () => {
        this.logoutHeader.emit();
      },
      error: (error) => {
        this.authService.isLoading = false;
      },
      complete: () => {
        this.authService.isLoading = false;
      },
    });
  }

  ngOnInit() {
    const strorageUser = localStorage.getItem('user');
    this.user = JSON.parse(strorageUser || '{}');
  }
}
