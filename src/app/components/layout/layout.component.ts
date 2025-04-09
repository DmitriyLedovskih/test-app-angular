import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isAuth: boolean = false;

  constructor(private router: Router) {}

  logoutHeader() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isAuth = false;
  }

  ngOnInit() {
    const isAuth = localStorage.getItem('isAuth');
    this.isAuth = !!isAuth;
  }
}
