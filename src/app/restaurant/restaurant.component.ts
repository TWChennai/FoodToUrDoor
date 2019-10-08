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
  isLoggedInAlready: boolean;
  isAlertVisible: boolean = false;

  constructor(private route: ActivatedRoute, private dataserviceService: DataserviceService) {
    this.route.params.subscribe( params => this.restaurandId = params['id']);
  }

  ngOnInit() {
    this.dataserviceService.getRestaurantsMatching(this.restaurandId).subscribe(r => this.restaurant = r);
    this.isLoggedInAlready = this.isLoggedIn();
  }

  getCartInfo(): string {
    return localStorage.getItem('cart-items');
  }

  clearCartAndAddRestaurantIfRestaurantIsDifferent(restaurantId: string, restaurantName: string) {
    let cart = this.getCartInfo();
    if ( cart != null && !cart.startsWith('restaurant:' + restaurantId )) {
      alert('Clearing Items from');
      localStorage.clear();
    }
    cart = this.getCartInfo();
    if ( cart == null) {
      localStorage.setItem('cart-items', 'restaurant:' + restaurantId + ':' + restaurantName + ';');
    }
  }

  isLoggedIn() {
    if ( sessionStorage.getItem('authToken') != null ) {
      return true;
    }
    return false;
  }

  isItemAlreadyPresentInCart(itemId: string) {
    const cart = this.getCartInfo();
    if ( cart.includes('item:' + itemId + ':') ) {
      return true;
    }
    return false;
  }

  incrementItemInCartByOne(itemId: string, itemName: string, itemPrice: string) {
    let cart = this.getCartInfo().split(';');
    const restaurant = cart[0];
    for ( let i = 0; i < cart.length; i++ ) {
      if ( cart[i].startsWith('item:' + itemId)) {
        const itemCount = cart[i].split(':')[4];
        cart[i] = 'item:' + itemId + ':' + itemName + ':' + itemPrice + ':' + (Number(itemCount) + 1 );
      }
    }
    localStorage.setItem('cart-items', cart.join(';'));
  }

  addToCart(restaurantId: string, restaurantName: string, itemId: string, itemName: string, itemPrice: string) {
    this.clearCartAndAddRestaurantIfRestaurantIsDifferent(restaurantId, restaurantName);
    if ( this.isItemAlreadyPresentInCart(itemId) ) {
      this.incrementItemInCartByOne(itemId, itemName, itemPrice);
      alert('Item added to cart');
    } else {
      const cart = this.getCartInfo();
      localStorage.setItem('cart-items', cart + 'item:' + itemId + ':' + itemName + ':' + itemPrice + ':1;' );
      alert('Item added to cart!');
    }
  }
}
