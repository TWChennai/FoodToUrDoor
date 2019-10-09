import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { RestaurantModel } from '../models/RestaurantModel';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private dataserviceService: DataserviceService, private router: Router) {
    this.route.params.subscribe( params => this.restaurandId = params['id']);
  }

  ngOnInit() {
    this.dataserviceService.getRestaurantsMatching(this.restaurandId).subscribe(r => this.restaurant = r);
    this.isLoggedInAlready = this.isLoggedIn();
    if ( !this.isLoggedInAlready ) {
      this.router.navigate(['/login']);
    }
  }

  getCartInfo(): string {
    return localStorage.getItem('cart-items');
  }

  doesCartContainsitemsFromRestaurant(restaurantId: string) {
    let cart = this.getCartInfo();
    if ( cart != null && cart.startsWith('restaurant:' + restaurantId )) {
      return true;
    }
    return false;
  }

  clearCartAndAddRestaurantIfRestaurantIsDifferent(restaurantId: string, restaurantName: string) {
    if ( !this.doesCartContainsitemsFromRestaurant( restaurantId )) {
      localStorage.clear();
    }
    let cart = this.getCartInfo();
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

  decrementItemInCartByOne(itemId: string, itemName: string, itemPrice: string) {
    let cart = this.getCartInfo().split(';');
    const restaurant = cart[0];
    for ( let i = 0; i < cart.length; i++ ) {
      if ( cart[i].startsWith('item:' + itemId)) {
        const itemCount = cart[i].split(':')[4];
        console.log("before qty of item in cart :" + itemCount);
        console.log("after qty of item in cart :" + (Number(itemCount) - 1 ));
        cart[i] = 'item:' + itemId + ':' + itemName + ':' + itemPrice + ':' + (Number(itemCount) - 1 );
      }
    }
    localStorage.setItem('cart-items', cart.join(';'));
  }

  removeFromCart(restaurantId: string, restaurantName: string, itemId: string, itemName: string, itemPrice: string) {
    console.log('restaurant ID: ' + restaurantId)
    console.log('in remove item from cart:' + this.doesCartContainsitemsFromRestaurant( restaurantId ));
    if ( this.doesCartContainsitemsFromRestaurant( restaurantId )) {
      console.log('cart contains items from restaurant');
      if ( this.isItemAlreadyPresentInCart(itemId) ) {
        console.log('cart contains item to -');
        this.decrementItemInCartByOne(itemId, itemName, itemPrice);
        alert('Item added to cart');
      } else {
        const cart = this.getCartInfo();
        console.log('item is not in cart');
        console.log('cart that is being set to:=' + cart + 'item:' + itemId + ':' + itemName + ':' + itemPrice + ':-1;' );
        localStorage.setItem('cart-items', cart + 'item:' + itemId + ':' + itemName + ':' + itemPrice + ':-1;' );
        alert('Item added to cart!');
      }
    }
  }
}
