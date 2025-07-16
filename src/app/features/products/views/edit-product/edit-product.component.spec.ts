import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductDataService } from '../../services/utils/product-data.service';
import { IProduct } from '../../models/product.model';
import { IProductEditResponse } from '../../models/product-edit-response.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../../ui-kit/services/utils/toast.service';
import { provideHttpClient } from '@angular/common/http';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let mockToastService: jest.Mocked<ToastService>;
  let mockProductDataService: jest.Mocked<ProductDataService>;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockToastService = {
      emitToast: jest.fn()
    } as unknown as jest.Mocked<ToastService>;

    mockProductDataService = {
      getData: jest.fn()
    } as unknown as jest.Mocked<ProductDataService>;

    mockProductService = {
      editProduct: jest.fn()
    } as unknown as jest.Mocked<ProductService>;

    mockRouter = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [EditProductComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: mockToastService },
        { provide: ProductDataService, useValue: mockProductDataService },
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('should emit error toast and navigate if no product data is available', () => {
    mockProductDataService.getData.mockReturnValue(null);

    fixture.detectChanges();

    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Error',
      'No hay un producto por editar!',
      'error',
      true
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/list']);
  });

  it('should call editProduct and update the product when the response is successful', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2025-07-16',
      date_revision: '2026-07-16'
    };

    const mockResponse: IProductEditResponse = { 
      data: [mockProduct], 
      message: 'Product updated successfully' 
    };

    mockProductService.editProduct.mockReturnValue(of(mockResponse));
    mockProductDataService.getData.mockReturnValue(mockProduct);

    fixture.detectChanges();

    component.editProduct(mockProduct);

    expect(mockProductService.editProduct).toHaveBeenCalledWith(mockProduct);

    expect(mockToastService.emitToast).toHaveBeenCalledWith(
      'Success',
      'Producto actualizado con éxito!',
      'success',
      true
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/list']);
  });
  
});
