import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title = 'FoodToUrDoor';
  token: boolean;
  username: String;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.token = this.getToken();
    this.username = this.getUsername();
  }

  getToken() {
    if ( sessionStorage.getItem('authToken') != null ) {
     return true;
    }
    return false;
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
