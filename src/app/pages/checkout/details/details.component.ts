import { Component, OnInit } from '@angular/core';
import { shoppingCartService } from 'src/app/shared/services/shoppingcart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  total$=this.shoppingCartSvc.totalActions$;
   cart$=this.shoppingCartSvc.cartActions$
  constructor(private shoppingCartSvc:shoppingCartService) { }

  ngOnInit(): void {
  }

}
