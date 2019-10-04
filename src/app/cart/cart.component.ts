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
// restaurant:1;item:1:1;

  constructor() { }

  ngOnInit() {
    const cart = localStorage.getItem('cart-items').split(';');
    this.order = new Ordermodel();
    let restaurant = cart.find(x => x.startsWith('restaurant:'));
    this.order.restaurantId = restaurant.replace('restaurant:', '' );
    console.log(this.order.restaurantId);
    this.order.orderItems = [];
    for ( let i = 1; i < cart.length; i++ ) {
        let itemDetails = cart[i].split(':');
        let item = new OrderItem();
        item.itemName = itemDetails[0];
        item.itemId = itemDetails[1];
        item.qty = itemDetails[2];
        this.order.orderItems.push(item);
        console.log('item = ' + item.itemId);
    }
  }

}
