import { TestBed } from '@angular/core/testing';

import { ProductDataService } from './product-data.service';
import { IProduct } from '../../models/product.model';

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit data and receive it via the observable', (done) => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };

    service.sendData(mockProduct);
    
    service.$productData.subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });

  });

  it('should retrieve the current data using getData()', () => {
    const mockProduct: IProduct = { 
      id: 'uno', 
      name: 'Tarjeta', 
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-01-01',
      date_revision: '2021-02-01'
    };

    service.sendData(mockProduct);
    
    expect(service.getData()).toEqual(mockProduct);
  });

  it('should return null if no data has been sent', () => {
    expect(service.getData()).toBeNull();
  });

});
