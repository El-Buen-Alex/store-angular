import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, DetailsOrder } from 'src/app/shared/interface/DetailsOrder.interface';
import { Order } from 'src/app/shared/interface/order.interface';
import { Store } from 'src/app/shared/interface/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { shoppingCartService } from 'src/app/shared/services/shoppingcart.service';
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model={
    name:'ola',
    store:'',
    shippingAddress:'',
    city:''
  }
  needDelivery:boolean=false
  tiendas:Store[]=[]
  cart:Product[]=[]
  constructor(private dataSvc:DataService, private orderSvc:OrderService, private shoppingCartSvc:shoppingCartService, private router:Router, private productSVC:ProductsService) {
    this.checkCartEmpty()
   }

  ngOnInit(): void {
    this.getStores()
    this.getDataCart()

  }
  onPickUp(value:boolean){
    this.needDelivery=value
  }
  onSubmit({value: FormData}: NgForm){
    console.log("mm")
    
    const data:Order={
      ...FormData,
      date: new Date().toLocaleDateString(),
      pickup: !this.needDelivery
    }
    this.orderSvc.saveOrder(data).pipe(
      tap(res=>console.log('order:',res)),
      switchMap((order)=>{
        const orderId=order.id
        const details=this.getDetailsOrder();
        return this.orderSvc.saveDetailsOrders({details, orderId})
      }),
      tap(()=>this.router.navigate(['/checkout/thanks-page'])),
      delay(250),
      tap(()=>this.shoppingCartSvc.resetCart())
    ).subscribe()

  }
  getStores():void{
    this.dataSvc.getStores().pipe(
      tap((stores:Store[])=>{
       this.tiendas=stores
      })
    ).subscribe()
  }
  private getDetailsOrder():Details[]{
    const details:Details[]=[]
    this.cart.forEach((product:Product)=>{


        const {id : idProduct, name:productName, quantity, stock}=product;
        const updateStcok=(stock-quantity)
        this.productSVC.updateStock(idProduct, updateStcok).pipe(
            tap(()=>{
              details.push({idProduct,productName ,quantity})
            })  
        ).subscribe()
    })
    return details;
  }
  private getDataCart():void{
   
    this.shoppingCartSvc.cartActions$.pipe(
      tap((products:Product[])=>this.cart=products)
    ).subscribe()
  }
  private checkCartEmpty():void{
      this.shoppingCartSvc.cartActions$.pipe(
        tap((products:Product[])=>{
          if( Array.isArray(products) && !products.length){
            this.router.navigate(['/products'])
          }
        })
      ).subscribe();
  }
}

