import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed, inject, tick, fakeAsync, getTestBed } from '@angular/core/testing';

import { Router, ActivatedRoute } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { HttpClient, HttpHandler, HttpResponse } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { routes } from './app.routes';

import {Location} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let comp1:any;
  let fixture:any, fixture1:any, fixture2:any;
  //  fixture: ComponentFixture<ProductComponent>;
  
  let location: Location;
	let router: Router;

	
  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    declarations: [
       ],
	  providers: [HttpClient,HttpHandler],
    }).compileComponents();
  }));


  it('should return products array using service', inject([CartService], (service: CartService) => {
        
    const mockprod=[  {
      "id": 101, 
      "sku": 12064273040195392,   
      "description": "4 MSL",  
      "title": "Cat Tee Orange T-Shirt",     
      "availableSizes": ["38", "42"],     
      "price": 20,
      "style": "Black with custom print",
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
           
    },
  
    {
      "id": 103,   
      "sku": 12064273040195392,     
      "title": "Thug Grey T-Shirt",
      "description": "Blue-Navy T-Shirt",
      "availableSizes": ["32"],
      "style": "Front print and paisley print",
      "price": 29.45,   
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true       
     
    }]
    service.products=mockprod;
    // console.log("++++",service.products);
    var prod:any=service.getProducts();
   
    if(prod !=null && prod.length > 0){
        if(prod[0].id != 101 && prod[1].id!=103)
            fail("Products are not returned properly by service method");
    }
    else
        fail("Check the logic of getProducts() method in service class");
  }));


  it('should check for addtoCart functionality in service', inject([CartService], (service: CartService) => {
        
    const obj=     {
      "id": 1122,   
      "sku": 12064273040195392,     
      "title": "Thug Red T-Shirt",
      "description": "Blue-Navy T-Shirt",
      "availableSizes": ["32"],
      "style": "Front print and paisley print",
      "price": 29.45,   
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true       
     
    }
    service.addtoCart(obj);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",service.cartItemList);
    var cart=service.cartItemList;
   
    if(cart !=null && cart.length > 0){
        if(cart[0].id != 1122 )
            fail("Product objects are not added properly by addtoCart service method");
    }
    else
        fail("Product objects are not added properly by addtoCart service method");
  }));

  it('should return cartItems array using service', inject([CartService], (service: CartService) => {
        
    const mockcart=[  {
      "id": 101, 
      "sku": 12064273040195392,   
      "description": "4 MSL",  
      "title": "Cat Tee Orange T-Shirt",     
      "availableSizes": ["38", "42"],     
      "price": 20,
      "style": "Black with custom print",
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
           
    },
  
    {
      "id": 103,   
      "sku": 12064273040195392,     
      "title": "Thug Grey T-Shirt",
      "description": "Blue-Navy T-Shirt",
      "availableSizes": ["32"],
      "style": "Front print and paisley print",
      "price": 29.45,   
      "installments": 9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true       
     
    }]
    service.cartItemList=mockcart;
    // console.log("++++",service.products);
    var cart:any=service.getCartItemList();
   
    if(cart !=null && cart.length > 0){
        if(cart[0].id != 101 && cart[1].id!=103)
            fail("Cart items are not returned properly by getCartItemList service method");
    }
    else
        fail("Cart items are not returned properly by getCartItemList service method");
  }));


  it('Should display the product details in ProductComponent', inject([CartService], (service: CartService) => {
       try {
          router = TestBed.get(Router); 
          location = TestBed.get(Location); 
          fixture = TestBed.createComponent(AppComponent);
          let compiled = fixture.debugElement.nativeElement;  
          
          let btn=compiled.querySelector("#productLink")  ;
          btn.click();
          fixture1 = TestBed.createComponent(ProductComponent);            
          router.initialNavigation();        
          router.navigate(['/product']); 
        // tick(); 
        
          fixture1.detectChanges();
       
          let compiled1 = fixture1.debugElement.nativeElement; 
           
          // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
          // console.log(compiled1.innerHTML)
              if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") ){
                fail("Product details not displayed properly in the product component");
              }
       } catch(err)     {
           fail("Product details not displayed properly in the product component");
       }
                
  })); 

//   it('Should display the cart count', inject([CartService], (service: CartService) => {
       
//     router = TestBed.get(Router); 
//     location = TestBed.get(Location); 
//     fixture = TestBed.createComponent(AppComponent);
//     let compiled = fixture.debugElement.nativeElement;  
    
//     let btn=compiled.querySelector("#productLink")  ;
//     btn.click();
//     fixture1 = TestBed.createComponent(ProductComponent);            
//     router.initialNavigation();        
//     router.navigate(['/product']); 
//   // tick(); 
  
//   const mockobj={
//     "id": 12,
//     "sku": 12064273040195392,
//     "title": "Cat Tee Black T-Shirt",
//     "description": "4 MSL",
//     "availableSizes": ["28", "30"],
//     "style": "Black with custom print",
//     "price": 10.9,
//     "installments": 9,
//     "currencyId": "USD",
//     "currencyFormat": "$",
//     "isFreeShipping": true
//   }


//     fixture1.detectChanges();
//     let compiled1 = fixture1.debugElement.nativeElement; 
//     // let add=compiled1.querySelector("#btn12064273040195392")  ;
//     // add.click();
//     component=fixture1.componentInstance
//     component.addtocart(mockobj)
//     comp1= fixture.componentInstance;
   
//     fixture.detectChanges();
    
//     console.log("#########################################################")
//     console.log(comp1.totalItem)
//     console.log(compiled.innerHTML)
//         if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") ){
//           fail("Product details not displayed properly in the product component ");
//         }
      
          
// }));

it('Should check for the presence of addtocart button', inject([CartService], (service: CartService) => {

try {       
  router = TestBed.get(Router); 
  location = TestBed.get(Location); 
  fixture = TestBed.createComponent(AppComponent);
  let compiled = fixture.debugElement.nativeElement;  
  
  let btn=compiled.querySelector("#productLink")  ;
  btn.click();
  fixture1 = TestBed.createComponent(ProductComponent);            
  router.initialNavigation();        
  router.navigate(['/product']); 

  fixture1.detectChanges();
  let compiled1 = fixture1.debugElement.nativeElement;    

  if( ! compiled1.querySelector("#btn12064273040195392")  ){
    fail("Button 'Add To Cart' is not created dynamically with unique id");
  } 
}catch(e) {
    fail("Button 'Add To Cart' is not created dynamically with unique id");
}
        
}));


it('Should check for addtocart functionality', inject([CartService], (service: CartService) => {
    try {
  router = TestBed.get(Router); 
  location = TestBed.get(Location); 
  fixture = TestBed.createComponent(AppComponent);
  let compiled = fixture.debugElement.nativeElement;  
  
  let btn=compiled.querySelector("#productLink")  ;
  btn.click();
  fixture1 = TestBed.createComponent(ProductComponent);            
  router.initialNavigation();        
  router.navigate(['/product']); 

  fixture1.detectChanges();
  let compiled1 = fixture1.debugElement.nativeElement; 
  let add=compiled1.querySelector("#btn12064273040195392")  ;
  add.click();
  component=fixture1.componentInstance
 
  // console.log("#########################################################")
  // console.log( service.cartItemList)
      if( !( service.cartItemList[0].id==12 && service.cartItemList[0].sku==12064273040195392 )){
        fail("Product objects are not added into cart list while there is a click on the 'Add To Cart' button");
      }  
    } catch(e) {
        fail("Product objects are not added into cart list while there is a click on the 'Add To Cart' button");
    }
        
}));

// it('Should check for cart component functionality with empty cart', inject([CartService], (service: CartService) => {
 
// try {
// router = TestBed.get(Router); 
// location = TestBed.get(Location); 
// fixture = TestBed.createComponent(AppComponent);
// let compiled = fixture.debugElement.nativeElement;  

// let btn=compiled.querySelector("#cartLink")  ;
// btn.click();
// fixture1 = TestBed.createComponent(CartComponent);            
// router.initialNavigation();        
// router.navigate(['/cart']); 

// fixture1.detectChanges();

// let compiled1 = fixture1.debugElement.nativeElement; 
// // let add=compiled1.querySelector("#btn12064273040195392")  ;
// // add.click();
// // component=fixture1.componentInstance

// // console.log("_________________________________________________")
// // console.log( compiled1.innerHTML)
//  if( !compiled1.innerHTML.includes("Your cart is empty")  ){
//   fail("Cart component does not display the message properly when cart item is empty");
//  }   
 
// } catch(e) {
//     fail("Cart component does not display the message properly when cart item is empty");
// }
   
// }));

// it('Should check for cart component shop now button', inject([CartService], (service: CartService) => {
 
// try {
//   router = TestBed.get(Router); 
//   location = TestBed.get(Location); 
//   fixture = TestBed.createComponent(AppComponent);
//   let compiled = fixture.debugElement.nativeElement;  
  
//   let btn=compiled.querySelector("#cartLink")  ;
//   btn.click();
//   fixture1 = TestBed.createComponent(CartComponent);            
//   router.initialNavigation();        
//   router.navigate(['/cart']); 
  
//   fixture1.detectChanges();
  
//   let compiled1 = fixture1.debugElement.nativeElement;  
 
//   // console.log("_________________________________________________")
//   // console.log( compiled1.innerHTML)
//   if( ! compiled1.querySelector("#shopnow")  ){
//      fail("Button with id 'shopnow' is not defined when cart is empty");
//   }    
// }catch(e) {
//     fail("Button with id 'shopnow' is not defined when cart is empty");
// }
     
//   }));


//   it('ShopNow button should navigate to ProductComponent', inject([CartService], (service: CartService) => {
 
//   try{
//     router = TestBed.get(Router); 
//     location = TestBed.get(Location); 
//     fixture = TestBed.createComponent(AppComponent);
//     let compiled = fixture.debugElement.nativeElement;  
    
//     let btn=compiled.querySelector("#cartLink")  ;
//     btn.click();
//     fixture1 = TestBed.createComponent(CartComponent);    
//     fixture2 = TestBed.createComponent(ProductComponent);    
                  
//     router.initialNavigation();        
//     router.navigate(['/cart']); 
    
//     fixture1.detectChanges();
    
//     let compiled1 = fixture1.debugElement.nativeElement;  
//     let shop=compiled1.querySelector("#shopnow")  ;
//     shop.click();
//     // component=fixture1.componentInstance

//     // console.log("_________________________________________________")
//     // console.log( compiled1.innerHTML)
//     // router.initialNavigation();
    
//     router.initialNavigation();
//     location = TestBed.get(Location);        
//     router.navigate(['/product']); 
   
//     //  tick(); 
  
//     fixture2.detectChanges();
//     compiled1 = fixture2.debugElement.nativeElement;  
//       //  expect(location.path()).toBe('/product',"Check whether the path defined properly to navigate to ProductComponent while click on ShopNow button");  
//       if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") )
//         fail("Check whether the path is defined properly to navigate to ProductComponent while there is a click on ShopNow button")
       
//       } catch(err) { 
//         console.log(err)
//         fail("Check whether the path defined properly to navigate to ProductComponent while there is a click on ShopNow button")
//       }     
    
       
//     }));


// it('Should check for cart component functionality', inject([CartService], (service: CartService) => {
//     try {
//       const mockobj={
//         "id": 15,
//         "sku": 11033926921508487,
//         "title": "Skuul",
//         "description": "Treino 2014",
//         "availableSizes": ["26", "28", "34", "36"],
//         "style": "Black T-Shirt with front print",
//         "price": 14.0,
//         "installments": 5,
//         "currencyId": "USD",
//         "currencyFormat": "$",
//         "isFreeShipping": true
//   }
  
//   service.addtoCart(mockobj);
//   router = TestBed.get(Router); 
//   location = TestBed.get(Location); 
//   fixture = TestBed.createComponent(AppComponent);
//   let compiled = fixture.debugElement.nativeElement;  

//   let btn=compiled.querySelector("#cartLink")  ;
//   btn.click();
//   fixture1 = TestBed.createComponent(CartComponent);            
//   router.initialNavigation();        
//   router.navigate(['/cart']); 

//   fixture1.detectChanges();

//   let compiled1 = fixture1.debugElement.nativeElement; 
//   // let add=compiled1.querySelector("#btn12064273040195392")  ;
//   // add.click();
//   // component=fixture1.componentInstance
 
//   // console.log("_________________________________________________")
//   // console.log( compiled1.innerHTML)
//       if( !( compiled1.innerHTML.includes("Skuul")  && compiled1.innerHTML.includes("Grand Total : $14")  )){
//         fail("Cart component does not display the cart items properly");
//       }  
    
//     } catch(e) {
//         fail("Cart component does not display the cart items properly");
//     }
        
// }));

});



describe('CartComponent', () => {
  let component: CartComponent;
  let comp1:any;
  let fixture:any, fixture1:any, fixture2:any;
  //  fixture: ComponentFixture<ProductComponent>;
  
  let location: Location;
	let router: Router;

	
  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    declarations: [
      ],
	  providers: [HttpClient,HttpHandler],
    }).compileComponents();
  }));


//   it('should return products array using service', inject([CartService], (service: CartService) => {
        
//     const mockprod=[  {
//       "id": 101, 
//       "sku": 12064273040195392,   
//       "description": "4 MSL",  
//       "title": "Cat Tee Orange T-Shirt",     
//       "availableSizes": ["38", "42"],     
//       "price": 20,
//       "style": "Black with custom print",
//       "installments": 9,
//       "currencyId": "USD",
//       "currencyFormat": "$",
//       "isFreeShipping": true
           
//     },
  
//     {
//       "id": 103,   
//       "sku": 12064273040195392,     
//       "title": "Thug Grey T-Shirt",
//       "description": "Blue-Navy T-Shirt",
//       "availableSizes": ["32"],
//       "style": "Front print and paisley print",
//       "price": 29.45,   
//       "installments": 9,
//       "currencyId": "USD",
//       "currencyFormat": "$",
//       "isFreeShipping": true       
     
//     }]
//     service.products=mockprod;
//     // console.log("++++",service.products);
//     var prod:any=service.getProducts();
   
//     if(prod !=null && prod.length > 0){
//         if(prod[0].id != 101 && prod[1].id!=103)
//             fail("Products are not returned properly by service method");
//     }
//     else
//         fail("Check the logic of getProducts() method in service class");
//   }));


//   it('should check for addtoCart functionality in service', inject([CartService], (service: CartService) => {
        
//     const obj=     {
//       "id": 1122,   
//       "sku": 12064273040195392,     
//       "title": "Thug Red T-Shirt",
//       "description": "Blue-Navy T-Shirt",
//       "availableSizes": ["32"],
//       "style": "Front print and paisley print",
//       "price": 29.45,   
//       "installments": 9,
//       "currencyId": "USD",
//       "currencyFormat": "$",
//       "isFreeShipping": true       
     
//     }
//     service.addtoCart(obj);
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",service.cartItemList);
//     var cart=service.cartItemList;
   
//     if(cart !=null && cart.length > 0){
//         if(cart[0].id != 1122 )
//             fail("Product objects are not added properly by addtoCart service method");
//     }
//     else
//         fail("Product objects are not added properly by addtoCart service method");
//   }));

//   it('should return cartItems array using service', inject([CartService], (service: CartService) => {
        
//     const mockcart=[  {
//       "id": 101, 
//       "sku": 12064273040195392,   
//       "description": "4 MSL",  
//       "title": "Cat Tee Orange T-Shirt",     
//       "availableSizes": ["38", "42"],     
//       "price": 20,
//       "style": "Black with custom print",
//       "installments": 9,
//       "currencyId": "USD",
//       "currencyFormat": "$",
//       "isFreeShipping": true
           
//     },
  
//     {
//       "id": 103,   
//       "sku": 12064273040195392,     
//       "title": "Thug Grey T-Shirt",
//       "description": "Blue-Navy T-Shirt",
//       "availableSizes": ["32"],
//       "style": "Front print and paisley print",
//       "price": 29.45,   
//       "installments": 9,
//       "currencyId": "USD",
//       "currencyFormat": "$",
//       "isFreeShipping": true       
     
//     }]
//     service.cartItemList=mockcart;
//     // console.log("++++",service.products);
//     var cart:any=service.getCartItemList();
   
//     if(cart !=null && cart.length > 0){
//         if(cart[0].id != 101 && cart[1].id!=103)
//             fail("Cart items are not returned properly by getCartItemList service method");
//     }
//     else
//         fail("Cart items are not returned properly by getCartItemList service method");
//   }));


//   it('Should display the product details in ProductComponent', inject([CartService], (service: CartService) => {
//       try {
//           router = TestBed.get(Router); 
//           location = TestBed.get(Location); 
//           fixture = TestBed.createComponent(AppComponent);
//           let compiled = fixture.debugElement.nativeElement;  
          
//           let btn=compiled.querySelector("#productLink")  ;
//           btn.click();
//           fixture1 = TestBed.createComponent(ProductComponent);            
//           router.initialNavigation();        
//           router.navigate(['/product']); 
//         // tick(); 
        
//           fixture1.detectChanges();
       
//           let compiled1 = fixture1.debugElement.nativeElement; 
           
//           // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
//           // console.log(compiled1.innerHTML)
//               if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") ){
//                 fail("Product details not displayed properly in the product component");
//               }
//       } catch(err)     {
//           fail("Product details not displayed properly in the product component");
//       }
                
//   })); 

//   it('Should display the cart count', inject([CartService], (service: CartService) => {
       
//     router = TestBed.get(Router); 
//     location = TestBed.get(Location); 
//     fixture = TestBed.createComponent(AppComponent);
//     let compiled = fixture.debugElement.nativeElement;  
    
//     let btn=compiled.querySelector("#productLink")  ;
//     btn.click();
//     fixture1 = TestBed.createComponent(ProductComponent);            
//     router.initialNavigation();        
//     router.navigate(['/product']); 
//   // tick(); 
  
//   const mockobj={
//     "id": 12,
//     "sku": 12064273040195392,
//     "title": "Cat Tee Black T-Shirt",
//     "description": "4 MSL",
//     "availableSizes": ["28", "30"],
//     "style": "Black with custom print",
//     "price": 10.9,
//     "installments": 9,
//     "currencyId": "USD",
//     "currencyFormat": "$",
//     "isFreeShipping": true
//   }


//     fixture1.detectChanges();
//     let compiled1 = fixture1.debugElement.nativeElement; 
//     // let add=compiled1.querySelector("#btn12064273040195392")  ;
//     // add.click();
//     component=fixture1.componentInstance
//     component.addtocart(mockobj)
//     comp1= fixture.componentInstance;
   
//     fixture.detectChanges();
    
//     console.log("#########################################################")
//     console.log(comp1.totalItem)
//     console.log(compiled.innerHTML)
//         if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") ){
//           fail("Product details not displayed properly in the product component ");
//         }
      
          
// }));

// it('Should check for the presence of addtocart button', inject([CartService], (service: CartService) => {

// try {       
//   router = TestBed.get(Router); 
//   location = TestBed.get(Location); 
//   fixture = TestBed.createComponent(AppComponent);
//   let compiled = fixture.debugElement.nativeElement;  
  
//   let btn=compiled.querySelector("#productLink")  ;
//   btn.click();
//   fixture1 = TestBed.createComponent(ProductComponent);            
//   router.initialNavigation();        
//   router.navigate(['/product']); 

//   fixture1.detectChanges();
//   let compiled1 = fixture1.debugElement.nativeElement;    

//   if( ! compiled1.querySelector("#btn12064273040195392")  ){
//     fail("Button 'Add To Cart' is not created dynamically with unique id");
//   } 
// }catch(e) {
//     fail("Button 'Add To Cart' is not created dynamically with unique id");
// }
        
// }));


// it('Should check for addtocart functionality', inject([CartService], (service: CartService) => {
//     try {
//   router = TestBed.get(Router); 
//   location = TestBed.get(Location); 
//   fixture = TestBed.createComponent(AppComponent);
//   let compiled = fixture.debugElement.nativeElement;  
  
//   let btn=compiled.querySelector("#productLink")  ;
//   btn.click();
//   fixture1 = TestBed.createComponent(ProductComponent);            
//   router.initialNavigation();        
//   router.navigate(['/product']); 

//   fixture1.detectChanges();
//   let compiled1 = fixture1.debugElement.nativeElement; 
//   let add=compiled1.querySelector("#btn12064273040195392")  ;
//   add.click();
//   component=fixture1.componentInstance
 
//   // console.log("#########################################################")
//   // console.log( service.cartItemList)
//       if( !( service.cartItemList[0].id==12 && service.cartItemList[0].sku==12064273040195392 )){
//         fail("Product objects are not added into cart list while there is a click on the 'Add To Art' button");
//       }  
//     } catch(e) {
//         fail("Product objects are not added into cart list while there is a click on the 'Add To Art' button");
//     }
        
// }));

it('Should check for cart component functionality with empty cart', inject([CartService], (service: CartService) => {
 
try {
router = TestBed.get(Router); 
location = TestBed.get(Location); 
fixture = TestBed.createComponent(AppComponent);
let compiled = fixture.debugElement.nativeElement;  

let btn=compiled.querySelector("#cartLink")  ;
btn.click();
fixture1 = TestBed.createComponent(CartComponent);            
router.initialNavigation();        
router.navigate(['/cart']); 

fixture1.detectChanges();

let compiled1 = fixture1.debugElement.nativeElement; 
// let add=compiled1.querySelector("#btn12064273040195392")  ;
// add.click();
// component=fixture1.componentInstance

// console.log("_________________________________________________")
// console.log( compiled1.innerHTML)
 if( !compiled1.innerHTML.includes("Your cart is empty")  ){
   fail("Cart component does not display the message properly when cart item is empty");
 }   
 
} catch(e) {
    fail("Cart component does not display the message properly when cart item is empty");
}
   
}));

it('Should check for cart component Shop Now button', inject([CartService], (service: CartService) => {
 
try {
  router = TestBed.get(Router); 
  location = TestBed.get(Location); 
  fixture = TestBed.createComponent(AppComponent);
  let compiled = fixture.debugElement.nativeElement;  
  
  let btn=compiled.querySelector("#cartLink")  ;
  btn.click();
  fixture1 = TestBed.createComponent(CartComponent);            
  router.initialNavigation();        
  router.navigate(['/cart']); 
  
  fixture1.detectChanges();
  
  let compiled1 = fixture1.debugElement.nativeElement;  
 
  // console.log("_________________________________________________")
  // console.log( compiled1.innerHTML)
   if( ! compiled1.querySelector("#shopnow")  ){
     fail("Button with id 'shopnow' is not defined when cart is empty");
   }    
}catch(e) {
    fail("Button with id 'shopnow' is not defined when cart is empty");
}
     
  }));


  it('Shop Now button should navigate to ProductComponent', inject([CartService], (service: CartService) => {
 
  try{
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    fixture = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.nativeElement;  
    
    let btn=compiled.querySelector("#cartLink")  ;
    btn.click();
    fixture1 = TestBed.createComponent(CartComponent);    
    fixture2 = TestBed.createComponent(ProductComponent);    
                  
    router.initialNavigation();        
    router.navigate(['/cart']); 
    
    fixture1.detectChanges();
    
    let compiled1 = fixture1.debugElement.nativeElement;  
    let shop=compiled1.querySelector("#shopnow")  ;
    shop.click();
    // component=fixture1.componentInstance

    // console.log("_________________________________________________")
    // console.log( compiled1.innerHTML)
    // router.initialNavigation();
    
    router.initialNavigation();
    location = TestBed.get(Location);        
    router.navigate(['/product']); 
   
    //  tick(); 
  
    fixture2.detectChanges();
    compiled1 = fixture2.debugElement.nativeElement;  
      //  expect(location.path()).toBe('/product',"Check whether the path defined properly to navigate to ProductComponent while click on ShopNow button");  
      if(!compiled1.innerHTML.includes("Cat Tee Black T-Shirt") && !compiled1.innerHTML.includes("10412368723880252") )
        fail("Check whether the path is defined properly to navigate to ProductComponent while there is a click on Shop Now button")
       
      } catch(err) { 
        console.log(err)
        fail("Check whether the path defined properly to navigate to ProductComponent while there is a click on Shop Now button")
      }     
    
       
    }));


it('Should check for cart component functionality', inject([CartService], (service: CartService) => {
    try {
       const mockobj={
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
  }
  
  service.addtoCart(mockobj);
  router = TestBed.get(Router); 
  location = TestBed.get(Location); 
  fixture = TestBed.createComponent(AppComponent);
  let compiled = fixture.debugElement.nativeElement;  

  let btn=compiled.querySelector("#cartLink")  ;
  btn.click();
  fixture1 = TestBed.createComponent(CartComponent);            
  router.initialNavigation();        
  router.navigate(['/cart']); 

  fixture1.detectChanges();

  let compiled1 = fixture1.debugElement.nativeElement; 
  // let add=compiled1.querySelector("#btn12064273040195392")  ;
  // add.click();
  // component=fixture1.componentInstance
 
  // console.log("_________________________________________________")
  // console.log( compiled1.innerHTML)
      if( !( compiled1.innerHTML.includes("Skuul")  && compiled1.innerHTML.includes("Grand Total : $14")  )){
        fail("Cart component does not display the cart items properly");
      }  
    
    } catch(e) {
        fail("Cart component does not display the cart items properly");
    }
        
}));

});


describe('AppComponent', () => {
	
	let fixture1:any,fixture2:any,fixture3:any,fixture4:any;
  let app1:any,app2:any,app3:any,app4:any;
  let location: Location;
	let router: Router;
	let fixture;
	
  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    declarations: [
		 ],
	  providers: [HttpClient,HttpHandler],
    }).compileComponents();
  }));

  it('should have the routerlink for product component' , fakeAsync(() => { 
    try{
      
      router = TestBed.get(Router); 
      location = TestBed.get(Location); 
      fixture = TestBed.createComponent(AppComponent);
      let compiled = fixture.debugElement.nativeElement;              
      if(compiled.querySelector('#productLink')==null)
        fail("Button for 'productLink' was not defined");
    }   
     catch(err) { 
        fail("Button for 'productLink' was not defined");
      }

   }));
	
    it('should have the routerlink for cart component' , fakeAsync(() => { 
      try{        
        router = TestBed.get(Router); 
        location = TestBed.get(Location); 
        fixture = TestBed.createComponent(AppComponent);
        let compiled = fixture.debugElement.nativeElement;
                
        if(compiled.querySelector('#cartLink')==null)
          fail("Button for 'cartLink' was not defined");
      }   
       catch(err) {      
      fail("Button for 'cartLink' was not defined");}
  
    }));
    

  it('should navigate to ProductComponent by clicking product link' , fakeAsync(() => { 
    try{
      
      router = TestBed.get(Router); 
      location = TestBed.get(Location); 
      fixture = TestBed.createComponent(AppComponent);
      let compiled = fixture.debugElement.nativeElement;  
      
      let btn=compiled.querySelector("#productLink")  ;
      btn.click();
      fixture1 = TestBed.createComponent(ProductComponent);     
      let compiled1 = fixture1.debugElement.nativeElement; 
      router.initialNavigation();
    
      router.navigate(['/product']); 
     tick(); 
    
      fixture1.detectChanges();
 
  	expect(location.path()).toBe('/product',"Check whether the path is defined properly to navigate to ProductComponent");  
       } catch(err) { 
        // console.log(err) ;
        fail("Check whether the path is defined properly to navigate to ProductComponent");}
  
    }));
	
    it('should navigate to CartComponent by clicking cart link' , fakeAsync(() => { 
      try{
        
        router = TestBed.get(Router); 
        location = TestBed.get(Location); 
        fixture = TestBed.createComponent(AppComponent);
        let compiled = fixture.debugElement.nativeElement;  
        
        let btn=compiled.querySelector("#cartLink")  ;
        btn.click();
        fixture1 = TestBed.createComponent(CartComponent);     
        let compiled1 = fixture1.debugElement.nativeElement; 
        router.initialNavigation();
      
        router.navigate(['/cart']); 
       tick(); 
      
        fixture1.detectChanges();
   
      expect(location.path()).toBe('/cart',"Check whether the path is defined properly to navigate to CartComponent");  
         } catch(err) { 
          // console.log(err) ;
          fail("Check whether the path is defined properly to navigate to CartComponent");}
    
      }));
  
});
