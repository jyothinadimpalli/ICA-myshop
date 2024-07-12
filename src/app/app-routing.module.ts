import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products component by default
  { path: '**', redirectTo: '/products', pathMatch: 'full' } // Redirect to products component for any other unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
