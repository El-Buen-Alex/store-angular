import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material.module';
import { ProductComponent } from './product/product.component';
import { ConfirmButtonComponent } from './product/confirm-button/confirm-button.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ConfirmButtonComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule {

 }
