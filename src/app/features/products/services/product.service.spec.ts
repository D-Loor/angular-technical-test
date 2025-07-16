import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IProductAddResponse } from '../models/product-add-response.model';
import { IProduct } from '../models/product.model';
import { ProductService } from './product.service';
import { IProductDeleteResponse } from '../models/product-delete-response.model';
import { IProductEditResponse } from '../models/product-edit-response.model';
import { IProductGetResponse } from '../models/product-get-response.model';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService
      ],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add a product', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    };
    const mockResponse: IProductAddResponse = { 
      data: [mockProduct], 
      message: 'Product added' 
    };

    service.addProduct(mockProduct).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should send a GET request to get products', () => {
    const mockResponse: IProductGetResponse = { 
      data: [{ 
        id: 'uno', 
        name: 'Tarjeta', 
        description: 'Descripción Producto',
        logo: 'logo.jpeg',
        date_release: '2025-01-01',
        date_revision: '2025-01-01'
      }] 
    };

    service.getProducts().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should send a PUT request to edit a product', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2025-01-01',
      date_revision: '2025-01-01'
    };
    const mockResponse: IProductEditResponse = { 
      data: [mockProduct], 
      message: 'Product updated' 
    };

    service.editProduct(mockProduct).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/' + mockProduct.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should send a DELETE request to delete a product', () => {
    const productId = '123';
    const mockResponse: IProductDeleteResponse = { 
       message: 'Product deleted' 
      };

    service.deleteProduct(productId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/' + productId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should send a GET request to verify a product', () => {
    const productId = '123';
    const mockResponse = true;

    service.verificationProduct(productId).subscribe((response: any) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/products/verification/' + productId);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});