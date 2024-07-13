import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.css']
})
export class PaymentOptionsComponent implements OnInit {
  cart: any; // Placeholder for cart data
  totalPrice: number = 0; // Placeholder for total price
   PhonePe: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.cart = navigation.extras.state['cart'];
      this.totalPrice = navigation.extras.state['totalPrice'];
    } else {
      // Handle case where state data is missing (optional)
      console.error('Error: Missing state data for cart and total price.');
    }
  }

    payWithPhonePe() {
      // Logic to handle payment with PhonePe
      console.log('Redirecting to PhonePe');
      // Add your PhonePe payment integration code here
    }
  
    payWithGPay() {
      // Logic to handle payment with Google Pay
      console.log('Redirecting to Google Pay');
      // Add your Google Pay payment integration code here
    }
    
  }
  
  
  // Further implementation for payment options component

