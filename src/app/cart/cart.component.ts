
import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartList :Array<any>= [];
  public grandTotal :any=0;
  constructor(private cartService : CartService) { }
  

    ngOnInit(): void {
        // fill the code
        this.cartList = this.cartService.getCartItemList();
        let ele:any  = [];
        
        // for(let i of this.cartList) {
        //     this.grandTotal += i.price;
        // }
        this.cartList.forEach(ele =>{
            this.grandTotal += ele.price;
        });
        
    }
    
}	 	  	  	 			  	   	 	

