import { Component, Input } from '@angular/core';
import { NotFoundTextComponent } from '../not-found-text/not-found-text.component';
import { TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-section',
  imports: [NotFoundTextComponent, TuiTitle],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() title?: string;
  @Input() length?: number;
  @Input() notFoundText?: string;
}
