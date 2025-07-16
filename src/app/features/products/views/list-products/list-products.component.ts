import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../../app/ui-kit/components/button/button.component';
import { CardComponent } from '../../../../../app/ui-kit/components/card/card.component';
import { DialogComponent } from '../../../../../app/ui-kit/components/dialog/dialog.component';
import { InputComponent } from '../../../../../app/ui-kit/components/input/input.component';
import { TableComponent } from '../../../../../app/ui-kit/components/table/table.component';
import { IButton } from '../../../../../app/ui-kit/interfaces/button.interface';
import { ICard } from '../../../../../app/ui-kit/interfaces/card.interface';
import { IDialog } from '../../../../../app/ui-kit/interfaces/dialog.interface';
import { IInput } from '../../../../../app/ui-kit/interfaces/input.interface';
import { ITableHeader } from '../../../../../app/ui-kit/interfaces/table-header.interface';
import { DialogService } from '../../../../../app/ui-kit/services/utils/dialog.service';
import { ToastService } from '../../../../../app/ui-kit/services/utils/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { IProductGetResponse } from '../../models/product-get-response.model';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDataService } from '../../services/utils/product-data.service';
import { LoaderService } from '../../../../ui-kit/services/utils/loader.service';

@Component({
  selector: 'lib-list-products',
  standalone: true,
  imports: [CommonModule, TableComponent, InputComponent, ButtonComponent, CardComponent, DialogComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {
  private _toastService = inject(ToastService);
  private _dialogService = inject(DialogService);
  private _productDataService = inject(ProductDataService);
  private _productService = inject(ProductService);
  private _router = inject(Router);
  private _loaderService = inject(LoaderService);
  private destroy$ = new Subject<void>();
  cardData: ICard = {};
  searchFormGroup = new FormGroup({'search': new FormControl()});
  presentDialog: boolean = false;
  loadingData: boolean = false;
  productSelected: IProduct | undefined;

  inputData: IInput = {
    id: "search",
    value: "",
    placeholder: "Search...",
    type: "text",
    formControlName: "search",
    required: false,
    disabled: false
  };

  buttonData: IButton = {
    customClass: "primary",
    label: "Agregar",
    disabled: false
  };
  
  tableHeader: ITableHeader[] = [
    {
      name: 'Logo',
      key: 'logo',
      type: 'image',
      class: 'text-center'
    },
    {
      name: 'Nombre del producto',
      key: 'name',
      type: 'text',
    },
    {
      name: 'Descripción',
      key: 'description',
      type: 'text',
      tooltip: 'Descripción del producto'
    },
    {
      name: 'Fecha de liberación',
      key: 'date_release',
      type: 'date',
      tooltip: 'Fecha de liberación del producto'
    },
    {
      name: 'Fecha de reestructuración',
      key: 'date_revision',
      type: 'date',
      tooltip: 'Fecha de reestructuración del producto'
    }
  ]

  tableBody: IProduct[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProducts():void {
    this.loadingData = true;
    this._productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe((response: IProductGetResponse) => {
      this.loadingData = false;
      this.tableBody = response.data;
    });
  }

  deleteProduct(productId: string): void {
    this._loaderService.show(true);
    this._productService.deleteProduct(productId).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product removed successfully" === response.message) {
        this.presentDialog = false;
        this._toastService.emitToast("Success", "Producto eliminado con éxito!", "success", true);
        this.getProducts();
      }
      this._loaderService.show(false);
    });
  }

  addButtonClick(): void {
    this._router.navigate(['/products/add']);
  }

  optionClicked(event: any): void {
    this.productSelected = event.item as IProduct;

    switch(event.option) {
      case "edit":
        this._productDataService.sendData(this.productSelected);
        this._router.navigate(['/products/edit']);
        break;
      case "delete":
        this.showDialog(event.item);
        break;
    }
  }

  showDialog(data: any): void {
    this.presentDialog = true;
    let dialogData: IDialog = {
      description: "¿Estás seguro de eliminar el producto " + data.name + "?",
      labelButtonLeft: "Cancelar",
      labelButtonRight: "Eliminar"
    };
    this._dialogService.emitDialog(dialogData);
  }

  onClickCancelDialog(): void {
    this.presentDialog = false;
  }

  onClickConfirmDialog(): void {
    this.deleteProduct(this.productSelected?.id as string);
  }

}