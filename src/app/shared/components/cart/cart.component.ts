import { Component } from "@angular/core";
import { shoppingCartService } from '../../services/shoppingcart.service';


@Component({
    selector:'app-cart',
    template:`
        <ng-container *ngIf="{total: total$ | async, quantity: quantity$ | async } as dataCart">
            <ng-container *ngIf="dataCart.total">
                <mat-icon>add_shopping_cart</mat-icon>
                    {{dataCart.total | currency}}
                    ({{dataCart.quantity}})
            </ng-container>
           
        </ng-container>
    `
})

export class CartComponent{
    quantity$=this.shoppingCartSvc.quantityActions$
  total$=this.shoppingCartSvc.totalActions$

  constructor(private shoppingCartSvc: shoppingCartService) { }

}