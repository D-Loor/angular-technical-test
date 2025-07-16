import { Routes } from "@angular/router";
import { DefaultLayoutComponent } from "../../layouts/default-layout/default-layout.component";
import { AddProductComponent } from "./views/add-product/add-product.component";
import { EditProductComponent } from "./views/edit-product/edit-product.component";
import { ListProductsComponent } from "./views/list-products/list-products.component";

export const productsRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'add',
                component: AddProductComponent
            },
            {
                path: 'edit',
                component: EditProductComponent
            },
            {
                path: 'list',
                component: ListProductsComponent
            },
            {
                path: "**",
                redirectTo: "list"
            }

        ]
    }
];