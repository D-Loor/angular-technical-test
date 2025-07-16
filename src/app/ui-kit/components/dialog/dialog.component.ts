import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { IDialog } from '../../interfaces/dialog.interface';
import { DialogService } from '../../services/utils/dialog.service';
import { ButtonComponent } from '../button/button.component';
import { IButton } from '../../interfaces/button.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private dialogService = inject(DialogService);
  presentDialog = input<boolean>(false);
  clickLeftButton = output<void>();
  clickRightButton = output<void>();

  dialogData: IDialog | undefined;
  showDialog = false;

  buttonLeftData: IButton = {
    customClass: "secondary",
    label: "Cancelar",
    disabled: false
  };
  buttonRightData: IButton = {
    customClass: "primary",
    label: "Confirmar",
    disabled: false
  };

  constructor() {
    this.dialogService.$dialogData.subscribe(dialogData => {     
      this.showDialog = true;
      this.dialogData = dialogData;
      this.buttonLeftData.label = this.dialogData?.labelButtonLeft;
      this.buttonRightData.label = this.dialogData?.labelButtonRight;
    });
  }

  onClose() {
    this.showDialog = false;
  }

  onClickLeftButton() {
    this.showDialog = false;
    this.clickLeftButton.emit();
  }

  onClickRightButton() {
    this.clickRightButton.emit();
  }

}