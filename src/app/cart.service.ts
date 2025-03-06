import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 products=[
  {
    "id": 12,
    "sku": 12064273040195392,
    "title": "Cat Tee Black T-Shirt",
    "description": "4 MSL",
    "availableSizes": ["28", "30"],
    "style": "Black with custom print",
    "price": 10.9,
    "installments": 9,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },

  {
    "id": 13,
    "sku": 51498472915966366,
    "title": "Dark Thug Blue-Navy T-Shirt",
    "description": "Blue-Navy T-Shirt",
    "availableSizes": ["32"],
    "style": "Front print and paisley print",
    "price": 29.45,
    "installments": 5,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },

  {
    "id": 14,
    "sku": 10686354557628303,
    "title": "Sphynx Tie Dye Wine T-Shirt",
    "description": "GPX Poly 1",
    "availableSizes": ["30", "32", "34"],
    "style": "Front tie dye print",
    "price": 9.0,
    "installments": 3,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },

  {	 	  	  	 			  	   	 	
    "id": 15,
    "sku": 11033926921508487,
    "title": "Skuul",
    "description": "Treino 2014",
    "availableSizes": ["26", "28", "34", "36"],
    "style": "Black T-Shirt with front print",
    "price": 14.0,
    "installments": 5,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  },
  {
    "id": 16,
    "sku": 10412368723880253,
    "title": "Short Sleeve T-Shirt",
    "description": "Short Sleeve T-Shirt",
    "availableSizes": ["26", "28", "32", "34", "36"],
    "style": "Grey",
    "price": 75.0,
    "installments": 5,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  }, 
   {
    "id": 17,
    "sku": 10412368723880253,
    "title": "Jean",
    "description": "Short Sleeve T-Shirt",
    "availableSizes": ["26", "28", "32", "34", "36"],
    "style": "Blue-Navy",
    "price": 75.0,
    "installments": 5,
    "currencyId": "USD",
    "currencyFormat": "$",
    "isFreeShipping": true
  } 

]

    public cartItemList : any =[]
    cartSize = new EventEmitter<string>();
    
  constructor() { 

  }

  getProducts(){	 	  	  	 			  	   	 	
      
    // fill the code
    return this.products;
  }
  getCartItemList(){
   // fill the code
    return this.cartItemList;
  }
  addtoCart(product : any){
   // fill the code
  this.cartItemList.push(product);

    this.cartSize.emit(this.cartItemList.length);
   
  }
 
}
