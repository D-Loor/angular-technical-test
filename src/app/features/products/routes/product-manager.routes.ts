import { Routes } from "@angular/router";

import { DefaultLayoutComponent } from "ui-kit";
import { AddProductComponent } from "../views/add-product/add-product.component";
import { ListProductsComponent } from "../views/list-products/list-products.component";
import { EditProductComponent } from "../views/edit-product/edit-product.component";

export const productManagerRoutes: Routes= [
    {
        path: 'products',
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