import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { RestaurantModel } from '../models/RestaurantModel';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant: RestaurantModel;

  constructor(private dataserviceService: DataserviceService) { }

  ngOnInit() {
    this.dataserviceService.getRestaurantsMatching('1').subscribe(r => this.restaurant = r);
  }

}
