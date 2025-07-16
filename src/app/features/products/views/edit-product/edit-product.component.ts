import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../../../../../app/ui-kit/components/card/card.component';
import { ICard } from '../../../../../app/ui-kit/interfaces/card.interface';
import { ToastService } from '../../../../../app/ui-kit/services/utils/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { FormProductComponent } from "../../components/form-product/form-product.component";
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDataService } from '../../services/utils/product-data.service';
import { LoaderService } from '../../../../ui-kit/services/utils/loader.service';

@Component({
  selector: 'lib-edit-product',
  standalone: true,
  imports: [CommonModule, CardComponent, FormProductComponent],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnDestroy, OnInit {
  private _toastService = inject(ToastService);
  private _router = inject(Router);
  private _productDataService = inject(ProductDataService);
  private _editProductService = inject(ProductService);
  private _loaderService = inject(LoaderService);
  private destroy$ = new Subject<void>();
  productEdit: IProduct | undefined;
  resetForm: boolean = false;

  cardData: ICard = {
    header: 'Formulario de Actualización'
  };

  ngOnInit(): void {
    this.productEdit = this._productDataService.getData() ?? undefined;
    if(!this.productEdit) {
      this._toastService.emitToast("Error", "No hay un producto por editar!", "error", true);
      this._router.navigate(['/products/list']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editProduct(product: IProduct): void {
    this._loaderService.show(true);
    this._editProductService.editProduct(product).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product updated successfully" === response.message) {
        this._loaderService.show(false);
        this._toastService.emitToast("Success", "Producto actualizado con éxito!", "success", true);
        this._router.navigate(['/products/list']);
      }
    });
  }

}
