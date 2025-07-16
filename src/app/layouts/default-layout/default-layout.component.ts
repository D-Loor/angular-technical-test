import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../../app/ui-kit/components/loader/loader.component';
import { ToastComponent } from '../../../app/ui-kit/components/toast/toast.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-default-layout',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent, ToastComponent],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

}