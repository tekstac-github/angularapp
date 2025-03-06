import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingCart';

  public totalItem : number = 0;
//   public searchTerm !: string;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    // this.totalItem=this.cartService.cartItemList.length;
    // console.log("cart length",this.cartService.cartItemList.length)
    this.cartService.cartSize.subscribe((data)=>{
      console.log("log in ts file ", data);
      this.totalItem=parseInt(data);
      // alert(data);
      
    })
    // this.totalItem

  }
  
}
	 	  	  	 			  	   	 	
