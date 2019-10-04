import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { RestaurantModel } from '../models/RestaurantModel';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: RestaurantModel[];

  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    this.dataservice.getRestaurants().subscribe(r => this.restaurants = r);
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
