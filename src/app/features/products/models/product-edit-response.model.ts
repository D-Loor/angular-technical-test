import { IProduct } from "./product.model";

export interface IProductEditResponse {
    message: string;
    data: IProduct[];
}