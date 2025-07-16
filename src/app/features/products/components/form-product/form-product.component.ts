import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnChanges, OnDestroy, OnInit, output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../../app/ui-kit/components/button/button.component';
import { InputComponent } from '../../../../../app/ui-kit/components/input/input.component';
import { IButton } from '../../../../../app/ui-kit/interfaces/button.interface';
import { ToastService } from '../../../../../app/ui-kit/services/utils/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit, OnChanges, OnDestroy {
  resetForm = input<boolean>(false);
  productEdit = input<IProduct>();
  submitForm = output<IProduct>();
  private _toastService = inject(ToastService);
  private _router = inject(Router);
  datePipe = inject(DatePipe);
  private _productService = inject(ProductService);
  private destroy$ = new Subject<void>();

  leftButtonForm: IButton = {
    customClass: 'secondary',
    label: 'Reiniciar',
    disabled: false
  };

  rigthButtonForm: IButton = {
    customClass: 'primary',
    label: 'Enviar',
    disabled: false
  };

  ngOnInit(): void {
    if(this.productEdit() != undefined) {
      this.form.patchValue(this.productEdit() as IProduct);
      this.form.get('id')?.disable();
      this.leftButtonForm.label = "Cancelar";
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetForm']) {
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dateValidator: ValidatorFn = (control: AbstractControl) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0);
    inputDate.setDate(inputDate.getDate() + 1);

    return inputDate >= today ? null : { invalidDate: true };
  };

  form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    name: new FormControl('', [Validators.minLength(5), Validators.maxLength(100), Validators.required]),
    description: new FormControl('', [Validators.minLength(10), Validators.maxLength(200), Validators.required]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required, this.dateValidator]),
    date_revision: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });
  
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let data: IProduct = this.form.getRawValue();
      this.submitForm.emit(data);
    } else {
      this._toastService.emitToast("Error", "Inconsistencia en los campos", "error", true);
    }
  }

  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    this._router.navigate(['/products/list']);
  }

  loadDateRevision($event: any): void {
    if ($event) {
      const newDate = new Date($event);
      newDate.setFullYear(newDate.getFullYear() + 1);
      const formattedDate = this.datePipe.transform(newDate, 'yyyy-MM-dd');
      this.form.get('date_revision')?.setValue(formattedDate);
    }
  }

  verificationProduct(event: string): void {
    if(event.length < 3) {
      return;
    }

    this._productService.verificationProduct(event).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if(response) {
        this._toastService.emitToast("Error", "Este ID de Producto ya existe!", "error", true);
        this.form.get('id')?.setErrors({ invalid: true });
      }
    });
  }
}