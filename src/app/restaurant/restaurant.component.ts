import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { RestaurantModel } from '../models/RestaurantModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant: RestaurantModel;
  restaurandId: string;

  constructor(private route: ActivatedRoute, private dataserviceService: DataserviceService) { 
    this.route.params.subscribe( params => this.restaurandId = params['id']);
    console.log('restaurant Id' + this.restaurandId);
  }

  ngOnInit() {
    this.dataserviceService.getRestaurantsMatching(this.restaurandId).subscribe(r => this.restaurant = r);
  }

  getCartInfo(): string {
    return localStorage.getItem('cart-items');
  }

  clearCartAndAddRestaurantIfRestaurantIsDifferent(restaurantId: string) {
    let cart = this.getCartInfo();
    if ( cart != null && !cart.startsWith('restaurant:' + restaurantId )) {
      console.log('cart is already empty');
      localStorage.clear();
    }
    cart = this.getCartInfo();
    if ( cart == null) {
      console.log('adding = ' + 'restaurant:' + restaurantId + ';');
      localStorage.setItem('cart-items', 'restaurant:' + restaurantId + ';');
    }
  }

  isItemAlreadyPresentInCart(itemId: string) {
    const cart = this.getCartInfo();
    if ( cart.includes('item:' + itemId + ':') ) {
      console.log('item already present in cart');
      return true;
    }
    console.log('item not present in cart');
    return false;
  }

  incrementItemInCartByOne(itemId: string) {
    let cart = this.getCartInfo().split(';');
    const restaurant = cart[0];
    for ( let i = 0; i < cart.length; i++ ) {
      if ( cart[i].startsWith('item:' + itemId)) {
        const itemCount = cart[i].replace('item:' + itemId + ':', '');
        cart[i] = 'item:' + itemId + ':' + (Number(itemCount) + 1 );
      }
    }
    localStorage.setItem('cart-items', cart.join(';'));
  }


  addToCart(restaurantId: string, itemId: string) {
    this.clearCartAndAddRestaurantIfRestaurantIsDifferent(restaurantId);
    if ( this.isItemAlreadyPresentInCart(itemId) ) {
      this.incrementItemInCartByOne(itemId);
    } else {
      const cart = this.getCartInfo();
      localStorage.setItem('cart-items', cart + 'item:' + itemId + ':1;' );
    }
  }
// restaurant:1;item:1:1;
}
