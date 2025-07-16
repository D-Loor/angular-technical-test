import { IProduct } from "./product.model";

export interface IProductAddResponse {
    message: string;
    data: IProduct[];
}