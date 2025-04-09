import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiBlockDetails } from '@taiga-ui/layout';

@Component({
  selector: 'app-auth',
  imports: [TuiTitle, TuiBlockDetails, TuiLink, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() title!: string;
  @Input() text!: string;
  @Input() textLink!: string;
  @Input() linkUrl!: string;
  @Input() error!: string;
}
