import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  public productList : any ;
 
  constructor( private cartService : CartService) { 

   
  }

  ngOnInit(): void {

    //   fill the code
    this.productList = this.cartService.getProducts();
    console.log("products", this.productList)
  }
  
  addtocart(item: any){
    //   fill the code
    this.cartService.addtoCart(item);
    
  }
  

}
	 	  	  	 			  	   	 	
