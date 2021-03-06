import { Component, OnInit } from '@angular/core';
import { tap } from "rxjs/operators";
import { shoppingCartService } from 'src/app/shared/services/shoppingcart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList!:Product[];

  constructor(private productSvc: ProductsService, private shoppingCartSvc: shoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts().pipe(
        tap((products:Product[])=>this.productsList=products)
      ).subscribe()
  }
  addToCart(product:Product):void{
    this.shoppingCartSvc.updateCart(product)
  } 

}
