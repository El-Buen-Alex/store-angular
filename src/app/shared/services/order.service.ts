import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DetailsOrder } from "../interface/DetailsOrder.interface";
import { Order } from "../interface/order.interface";


@Injectable({providedIn:'root'})


export class OrderService {
    private apiUrl='http://localhost:3000';

    constructor(private htpp:HttpClient){}

    saveOrder(order : Order):Observable<Order>{
        return this.htpp.post<Order>(`${this.apiUrl}/orders`, order)
    }
    saveDetailsOrders(details:DetailsOrder):Observable<DetailsOrder>{
        return this.htpp.post<DetailsOrder>(`${this.apiUrl}/detailsOrders`, details)
    }

}