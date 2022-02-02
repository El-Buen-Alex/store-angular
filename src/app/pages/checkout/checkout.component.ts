import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/interface/store.interface';
import { DataService } from 'src/app/shared/services/data.service';

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
  constructor(private dataSvc:DataService) { }

  ngOnInit(): void {
    this.getStores()
  }
  onPickUp(value:boolean){
    this.needDelivery=value
  }
  onSubmit(){
    console.log("ey")
  }
  getStores():void{
    this.dataSvc.getStores().pipe(
      tap((stores:Store[])=>{
       this.tiendas=stores
      })
    ).subscribe()
  }
}
