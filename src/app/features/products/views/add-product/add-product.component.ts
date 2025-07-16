import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { CardComponent } from '../../../../../app/ui-kit/components/card/card.component';
import { ICard } from '../../../../../app/ui-kit/interfaces/card.interface';
import { ToastService } from '../../../../../app/ui-kit/services/utils/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { FormProductComponent } from "../../components/form-product/form-product.component";
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { LoaderService } from '../../../../ui-kit/services/utils/loader.service';

@Component({
  selector: 'lib-add-product',
  standalone: true,
  imports: [CommonModule, CardComponent, FormProductComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {
  private _toastService = inject(ToastService);
  private _productService = inject(ProductService);
  private _loaderService = inject(LoaderService);
  private destroy$ = new Subject<void>();
  resetForm: boolean = false;

  cardData: ICard = {
    header: 'Formulario de Registro'
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProduct(product: IProduct): void {
    this._loaderService.show(true);
    this.resetForm = false;
    this._productService.addProduct(product).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if("Product added successfully" === response.message) {
        this._toastService.emitToast("Success", "Producto agregado con éxito!", "success", true);
        this.resetForm = true;
      }
      this._loaderService.show(false);
    });
  }

}