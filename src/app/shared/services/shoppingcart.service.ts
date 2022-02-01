import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";
import { ProductsComponent } from "src/app/pages/products/products.component";



@Injectable({
    providedIn:'root'
})

export class shoppingCartService {

    products:Product[]=[]

    private carSubject =new Subject<Product[]>();
    private totalSubject =new Subject<number>();
    private quantitySubject =new Subject<number>();


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
        this.products.push(product)
        this.carSubject.next(this.products)
    }

    private getQuantity():void{
        const quantity=this.products.length;
        this.quantitySubject.next(quantity);
    }

    private getTotal():void {
        const total=this.products.reduce( (acc, prod)=>acc+=prod.price, 0)
        this.totalSubject.next(total)
    }
}