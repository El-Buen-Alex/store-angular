import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonComponent implements OnInit {
  @Input()product!:Product
  @Output()click=new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  onClickButton():void{
    console.log("ola")
      this.click.emit()
  }

}
