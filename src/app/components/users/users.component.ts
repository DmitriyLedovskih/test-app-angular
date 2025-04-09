import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { UserComponent } from '../user/user.component';
import { TuiButton } from '@taiga-ui/core';
import { LoaderComponent } from '../loader/loader.component';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-users',
  imports: [UserComponent, LoaderComponent, SectionComponent, TuiButton],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  usersService = inject(UsersService);
  users: IUser[] = [];

  mobileUserVisible = 2;
  screenWidth: number;
  screenHeight: number;

  constructor() {
    this.getUsers();

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    console.log(this.users);
  }

  getUsers() {
    this.usersService.isLoading = true;

    this.usersService.getUsers().subscribe({
      next: ({ data }) => {
        this.users = data;
      },
      error: () => {
        this.usersService.isLoading = false;
      },
      complete: () => {
        this.usersService.isLoading = false;
      },
    });
  }

  clickVisible() {
    if (this.mobileUserVisible === 2)
      this.mobileUserVisible = this.users.length;
    else this.mobileUserVisible = 2;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
