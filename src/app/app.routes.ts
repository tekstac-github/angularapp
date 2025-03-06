import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

    
export const routes: Routes = [

    //Fill the code to add routing path
    {path:'product', component: ProductComponent},
    {path:'cart', component: CartComponent}
]

