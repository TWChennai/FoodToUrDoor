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
  imagePath: String;

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
    this.imagePath = "http://localhost:8102/getImage?username=" + this.getEmail();
    console.log("imagepath = " + this.imagePath);
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

  getEmail() {
    return sessionStorage.getItem('email');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
