import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDialog } from '../../interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new Subject<IDialog>();
  $dialogData: Observable<IDialog> = this.dialogSubject.asObservable();

  emitDialog(dialogData: IDialog): void {
    this.dialogSubject.next(dialogData);
  }
}
