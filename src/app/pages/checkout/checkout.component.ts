import { Component, OnInit } from '@angular/core';

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
  tiendas=[{
    "id": 2,
    "name": "Store Alcalá",
    "address": "Calle de Alcalá, 21",
    "city": "Madrid",
    "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
}]
  constructor() { }

  ngOnInit(): void {
  }
  onPickUp(value:boolean){
    console.log(value)
  }
}
