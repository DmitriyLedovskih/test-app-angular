import { Component, inject } from '@angular/core';
import { ResourceService } from '../../services/resources.service';
import { IResource, IResourceFetch } from '../../interfaces/resource.interface';
import { TuiTable } from '@taiga-ui/addon-table';
import { SectionComponent } from '../section/section.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-resources',
  imports: [TuiTable, SectionComponent, LoaderComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent {
  resourceService = inject(ResourceService);
  resources: IResource[] = [];
  columns = ['id', 'name', 'year', 'pantone_value'];

  ngOnInit() {
    this.resourceService.isLoading = true;
    this.resourceService.getResources().subscribe({
      next: ({ data }: IResourceFetch) => {
        this.resources = data;
      },
      error: (error) => {
        console.log(error);
        this.resourceService.isLoading = false;
      },
      complete: () => {
        this.resourceService.isLoading = false;
      },
    });
  }
}
