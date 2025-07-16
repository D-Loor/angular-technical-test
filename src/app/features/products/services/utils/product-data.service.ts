import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productSubject = new BehaviorSubject<IProduct | null>(null);
  $productData: Observable<IProduct | null> = this.productSubject.asObservable();

  sendData(data: any): void {
    this.productSubject.next(data);
  }

  getData(): IProduct | null {
    return this.productSubject.getValue();
  }

}