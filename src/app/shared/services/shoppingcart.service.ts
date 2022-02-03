import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";
import { ProductsComponent } from "src/app/pages/products/products.component";



@Injectable({
    providedIn:'root'
})

export class shoppingCartService {

    products:Product[]=[]

    private carSubject =new BehaviorSubject<Product[]>([]);
    private totalSubject =new BehaviorSubject<number>(0);
    private quantitySubject =new BehaviorSubject<number>(0);


    get totalActions$():Observable<number>{
        return this.totalSubject.asObservable();
    }

    get quantityActions$():Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartActions$():Observable<Product[]>{
        return this.carSubject.asObservable();
    }


    updateCart(product:Product):void{
        this.addToCart(product)
        this.getQuantity()
        this.getTotal()
    }

    private addToCart(product:Product):void{
        const isProductInCar=this.products.find(({id})=>id===product.id)
        if(isProductInCar){
            isProductInCar.quantity+=1
        }else{
             this.products.push({...product, quantity:1})

        }
        this.carSubject.next(this.products)
    }

    private getQuantity():void{
        const quantity=this.products.reduce( (acc, prod)=>acc+=prod.quantity, 0);
        this.quantitySubject.next(quantity);
    }

    private getTotal():void {
        const total=this.products.reduce( (acc, prod)=>acc+=(prod.price*prod.quantity), 0)
        this.totalSubject.next(total)
    }

    public resetCart(){
        this.carSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
    }
}