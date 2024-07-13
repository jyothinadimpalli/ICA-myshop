import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module'; // Import the routing module

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Angular Material components and modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PerformanceComponent } from './performance/performance.component';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { ChatComponent } from './chat-integration/chat.component';
import { ProductRecommendationsComponent } from './product-recommendations/product-recommendations.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PurchasedHistoryComponent } from './purchased-history/purchased-history.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    UserComponent,
    PerformanceComponent,
    HomeComponent,ChatComponent, ProductRecommendationsComponent, ProductDetailsComponent, PurchasedHistoryComponent, PaymentOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule ,
    MatProgressSpinnerModule,
     // Add the AppRoutingModule here

         // Angular Material modules
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,MatDividerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
