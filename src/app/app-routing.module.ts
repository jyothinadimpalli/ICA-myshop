import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat-integration/chat.component';
import { ProductDetailsComponent } from './product-details/product-details.component'; // Replace with actual component path
import { PurchasedHistoryComponent } from './purchased-history/purchased-history.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: UserComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'purchased-history', component: PurchasedHistoryComponent },
  { path: 'payment-options', component: PaymentOptionsComponent },
  
{ path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products component by default
{ path: '**', redirectTo: '/products', pathMatch: 'full' } ,// Redirect to products component for any other unmatched routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
