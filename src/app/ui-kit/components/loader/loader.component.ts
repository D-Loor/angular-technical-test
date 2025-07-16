import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/utils/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isVisible: boolean = false;
  loaderService = inject(LoaderService);
  
  constructor() {
    this.loaderService.show$.subscribe(isVisible => this.isVisible = isVisible);
  }

}