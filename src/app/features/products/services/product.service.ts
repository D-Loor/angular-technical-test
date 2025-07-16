import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.model';
import { IProductAddResponse } from '../models/product-add-response.model';
import { Observable } from 'rxjs';
import { IProductGetResponse } from '../models/product-get-response.model';
import { IProductEditResponse } from '../models/product-edit-response.model';
import { IProductDeleteResponse } from '../models/product-delete-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);

  addProduct(request: IProduct): Observable<IProductAddResponse> {
    return this.http.post<IProductAddResponse>(environment.apiUrl + '/products', request);
  }

  getProducts(): Observable<IProductGetResponse> {
    return this.http.get<IProductGetResponse>(environment.apiUrl + '/products');
  }

  editProduct(request: IProduct): Observable<IProductEditResponse> {
    return this.http.put<IProductEditResponse>(environment.apiUrl + '/products/' + request.id, request);
  }

  deleteProduct(id: string): Observable<IProductDeleteResponse> {
    return this.http.delete<IProductDeleteResponse>(environment.apiUrl + '/products/' + id);
  }

  verificationProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/products/verification/' + id);
  }

}