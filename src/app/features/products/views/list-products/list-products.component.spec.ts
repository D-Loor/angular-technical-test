import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductsComponent } from './list-products.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ProductDataService } from '../../services/utils/product-data.service';
import { IProductGetResponse } from '../../models/product-get-response.model';
import { IProduct } from '../../models/product.model';
import { ToastService } from '../../../../../app/ui-kit/services/utils/toast.service';
import { ProductService } from '../../services/product.service';
import { DialogService } from '../../../../../app/ui-kit/services/utils/dialog.service';
import { IDialog } from '../../../../../app/ui-kit/interfaces/dialog.interface';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  let mockToastService: jest.Mocked<ToastService>;
  let mockProductDataService: jest.Mocked<ProductDataService>;
  let mockProductService: jest.Mocked<ProductService>;
  let mockDialogService: DialogService;
  let mockRouter: jest.Mocked<Router>;

  let dialogData: IDialog = {
    description: 'description',
    labelButtonLeft: 'labelButtonLeft',
    labelButtonRight: 'labelButtonRight'
  };

  beforeEach(() => {
    mockToastService = {
      emitToast: jest.fn()
    } as unknown as jest.Mocked<ToastService>;

    mockProductDataService = {
      sendData: jest.fn()
    } as unknown as jest.Mocked<ProductDataService>;

    mockProductService = {
      getProducts: jest.fn(),
      deleteProduct: jest.fn()
    } as unknown as jest.Mocked<ProductService>;

    mockDialogService = {
      emitDialog: jest.fn(),
      $dialogData: new BehaviorSubject<IDialog>(dialogData)
    } as unknown as DialogService;

    mockRouter = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [ListProductsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: mockToastService },
        { provide: ProductDataService, useValue: mockProductDataService },
        { provide: ProductService, useValue: mockProductService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
  });

  it('should get products on ngOnInit', () => {
    const mockResponse: IProductGetResponse = {
      data: [{
        id: 'uno',
        name: 'Tarjeta',
        description: 'Descripción Producto',
        logo: 'logo.jpeg',
        date_release: '2021-07-16',
        date_revision: '2022-07-16'
      }]
    };
    mockProductService.getProducts.mockReturnValue(of(mockResponse));

    fixture.detectChanges();

    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.tableBody).toEqual(mockResponse.data);
  });

  it('should show a success toast and update the list when product is deleted', () => {
    const mockProduct: IProduct = {
      id: 'uno',
      name: 'Tarjeta',
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-07-16',
      date_revision: '2022-07-16'
    };
    const mockDeleteResponse = { message: 'Product removed successfully' };
    mockProductService.deleteProduct.mockReturnValue(of(mockDeleteResponse));
    mockProductService.getProducts.mockReturnValue(of({ data: [] }));

    component.productSelected = mockProduct;
    component.onClickConfirmDialog();

    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(mockProduct.id as string);
    expect(mockToastService.emitToast).toHaveBeenCalledWith('Success', 'Producto eliminado con éxito!', 'success', true);
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it('should navigate to add product page when "Agregar" button is clicked', () => {
    component.addButtonClick();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/add']);
  });

  it('should navigate to edit product page and send product data when "edit" option is clicked', () => {
    const mockProduct: IProduct = {
      id: 'uno',
      name: 'Tarjeta',
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-07-16',
      date_revision: '2022-07-16'
    };
    const event = { option: 'edit', item: mockProduct };

    component.optionClicked(event);

    expect(mockProductDataService.sendData).toHaveBeenCalledWith(mockProduct);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit']);
  });

  it('should show a dialog when "delete" option is clicked', () => {
    const mockProduct: IProduct = {
      id: 'uno',
      name: 'Tarjeta',
      description: 'Descripción Producto',
      logo: 'logo.jpeg',
      date_release: '2021-07-16',
      date_revision: '2022-07-16'
    };
    const event = { option: 'delete', item: mockProduct };

    component.optionClicked(event);

    expect(component.presentDialog).toBe(true);
    expect(mockDialogService.emitDialog).toHaveBeenCalledWith({
      description: '¿Estás seguro de eliminar el producto Tarjeta?',
      labelButtonLeft: 'Cancelar',
      labelButtonRight: 'Eliminar'
    });
  });

  it('should hide the dialog when onClickCancelDialog is called', () => {
    component.presentDialog = true;

    component.onClickCancelDialog();

    expect(component.presentDialog).toBe(false);
  });
  
});
