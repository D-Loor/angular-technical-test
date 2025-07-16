import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IInput } from '../../interfaces/input.interface';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnChanges {
  controlName = input<string>();
  inputData = input<IInput>();
  formGroup = input<FormGroup>();
  outputData = output<string>();
  formControl!: FormControl;

  inputEvent(event: Event) {
    if(this.formGroup()) {
      let textType = this.formGroup()!.get(this.inputData()?.formControlName!)?.value;
      return this.outputData.emit(textType);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['controlName'] && this.formGroup()) {
      this.formControl = this.formGroup()!.get(this.inputData()?.formControlName!) as FormControl;
    }
  }

  validateInput(): boolean {
    const control = this.formGroup()?.get(this.inputData()?.formControlName!);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  
}