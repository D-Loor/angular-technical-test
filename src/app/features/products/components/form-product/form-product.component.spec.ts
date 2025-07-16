import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../../ui-kit/services/utils/toast.service';
import { provideHttpClient } from '@angular/common/http';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let toastService: ToastService;
  let router: Router;
  let productService: ProductService;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, FormProductComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ToastService,
        Router,
        ProductService,
        DatePipe,
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    destroy$ = new Subject<void>();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form when resetForm input changes', () => {
    component.ngOnChanges({
      resetForm: { 
        currentValue: true, 
        previousValue: false, 
        firstChange: false, 
        isFirstChange: () => false
      }
    });
    expect(component.form.pristine).toBe(true);
  });

  it('should emit submitForm with valid data when form is valid', () => {
    const validData = {
      id: '123',
      name: 'Producto de prueba',
      description: 'Descripción de prueba',
      logo: 'logo.png',
      date_release: '2025-07-16',
      date_revision: '2026-07-16',
    };
  
    component.form.setValue(validData);
  
    const emitSpy = jest.spyOn(component.submitForm, 'emit');
  
    component.onSubmit();
  
    expect(component.form.valid).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(validData);
  });
  

  it('should call toastService and emit error if form is invalid on submit', () => {
    jest.spyOn(toastService, 'emitToast');
    component.form.setValue({ id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' });
    component.onSubmit();
    expect(toastService.emitToast).toHaveBeenCalledWith('Error', 'Inconsistencia en los campos', 'error', true);
  });

  it('should not call verificationProduct if id length is less than 3', () => {
    const productId = '12';
    const spyVerification = jest.spyOn(productService, 'verificationProduct');
    const spyToast = jest.spyOn(toastService, 'emitToast');
  
    component.verificationProduct(productId);
  
    expect(spyVerification).not.toHaveBeenCalled();
    expect(spyToast).not.toHaveBeenCalled();
  });
  
  it('should call verificationProduct and show error if product already exists', () => {
    const productId = '123';
    jest.spyOn(productService, 'verificationProduct').mockReturnValue(of(true));
    jest.spyOn(toastService, 'emitToast');
    component.verificationProduct(productId);
    expect(productService.verificationProduct).toHaveBeenCalledWith(productId);
    expect(toastService.emitToast).toHaveBeenCalledWith('Error', 'Este ID de Producto ya existe!', 'error', true);
    expect(component.form.get('id')?.hasError('invalid')).toBe(true);
  });

  it('should navigate to the product list on cancel', () => {
    jest.spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/products/list']);
  });

  it('should load and format the date revision when a new release date is selected', () => {
    const newDate = '2023-01-01';
    const expectedDate = '2024-01-01';
    jest.spyOn(component.datePipe, 'transform').mockReturnValue(expectedDate);
    component.loadDateRevision(newDate);
    expect(component.form.get('date_revision')?.value).toBe(expectedDate);
  });

  it('should reset form on reset button click', () => {
    jest.spyOn(component, 'onReset');
    component.onReset();
    expect(component.form.pristine).toBe(true);
  });

  it('should reset form', () => {
    component.onReset();
    expect(component.form.pristine).toBe(true);
  });
  
});