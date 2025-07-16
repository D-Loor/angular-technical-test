import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { IProduct } from '../../models/product.model';
import { IProductAddResponse } from '../../models/product-add-response.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastService } from '../../../../ui-kit/services/utils/toast.service';
import { CardComponent } from '../../../../ui-kit/components/card/card.component';
import { provideHttpClient } from '@angular/common/http';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockToastService: jest.Mocked<ToastService>;
  let mockProductService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    mockToastService = {
      emitToast: jest.fn()
    } as unknown as jest.Mocked<ToastService>;

    mockProductService = {
      addProduct: jest.fn()
    } as unknown as jest.Mocked<ProductService>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, CardComponent, FormProductComponent, AddProductComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: mockToastService },
        { provide: ProductService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProduct and emit success toast when product is added successfully', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2025-07-16',
      date_revision: '2026-07-16'
    };
    const mockResponse: IProductAddResponse = { 
      data: [mockProduct], 
      message: 'Product added successfully' 
    };

    mockProductService.addProduct.mockReturnValue(of(mockResponse));

    component.addProduct(mockProduct);

    expect(mockProductService.addProduct).toHaveBeenCalledWith(mockProduct);
    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Success',
      'Producto agregado con éxito!',
      'success',
      true
    );
    expect(component.resetForm).toBe(true);
  });

  it('should not emit success toast if response message is not "Product added successfully"', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2025-07-16',
      date_revision: '2026-07-16'
    };
    const mockResponse: IProductAddResponse = { 
      data: [mockProduct], 
      message: 'Product added' 
    };

    mockProductService.addProduct.mockReturnValue(of(mockResponse));

    component.addProduct(mockProduct);

    expect(mockProductService.addProduct).toHaveBeenCalledWith(mockProduct);
    expect(mockToastService.emitToast).not.toHaveBeenCalled();
    expect(component.resetForm).toBe(false);
  });
  
  it('should call ngOnDestroy and complete destroy$ when component is destroyed', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});
