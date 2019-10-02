import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Object;

  constructor(private dataservice: DataserviceService) { }

  ngOnInit() {
    this.dataservice.getRestaurants().subscribe(data => {
      this.restaurants = data;
      console.log(this.restaurants);
    });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
