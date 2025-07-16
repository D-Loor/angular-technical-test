import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IButton } from '../../interfaces/button.interface';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges{
  buttonData = input<IButton>();
  clickEvent = output<void>();

  clickedEvent() {
    this.clickEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['buttonData'] && this.buttonData()?.disabled) {
      this.buttonData()!.disabled = this.buttonData()!.disabled;
    }
  }

} 