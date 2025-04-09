import { Component } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';
import { ResourcesComponent } from '../../components/resources/resources.component';

@Component({
  selector: 'app-home-page',
  imports: [UsersComponent, ResourcesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
