import { Component, OnInit } from '@angular/core';
import { Ordermodel } from '../models/ordermodel';
import { OrderItem } from '../models/orderitem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  order: Ordermodel;
  // restaurant:1:test1;item:1:Dosa:23.2:1;

  constructor() { }

  getCartString() {
    return localStorage.getItem('cart-items');
  }

  ngOnInit() {
    if( this.getCartString() != null ) {
      const cart = this.getCartString().split(';');
      this.order = new Ordermodel();
      let restaurant = cart.find(x => x.startsWith('restaurant:'));
      let restaurantInfo = restaurant.replace('restaurant:', '' ).split(':');
      this.order.restaurantId = restaurantInfo[0];
      this.order.restaurantName = restaurantInfo[1];
      console.log(this.order.restaurantId);
      this.order.orderItems = [];
      let subTotal = 0;
      this.order.deliveryFee = '50';
      for ( let i = 1; i < cart.length - 1; i++ ) {
          let itemDetails = cart[i].split(':');
          let item = new OrderItem();
          item.itemId = itemDetails[1];
          item.itemName = itemDetails[2];
          item.qty = itemDetails[4];
          item.price = String(Number(itemDetails[3]) * Number(item.qty));
          this.order.orderItems.push(item);
          subTotal = subTotal + Number(item.price);
      }
      this.order.tax = '5';
      this.order.totalValue = String(subTotal + Number(this.order.tax) + Number(this.order.deliveryFee) - 1);
    }
  }

}
