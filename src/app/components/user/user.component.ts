import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAvatar, TuiAvatarLabeled, TuiButtonLoading } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiAvatar,
    TuiAvatarLabeled,
    TuiButton,
    RouterLink,
    TuiButtonLoading,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() user!: IUser | undefined;
  @Output() deleteUser = new EventEmitter<number>();
  usersService = inject(UsersService);

  constructor() {}

  delete(id: number) {
    this.usersService.loadingState[id] = true;

    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.user = undefined;
        this.deleteUser.emit(id);
      },
      error: (error) => {
        console.log(error);
        this.usersService.loadingState[id] = false;
      },
      complete: () => {
        this.usersService.loadingState[id] = false;
      },
    });
  }
}
