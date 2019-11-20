import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ordermodel } from '../models/ordermodel';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  orders: Ordermodel[];

  constructor(private dataservice: DataserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.dataservice.getOrderHistory().subscribe(r => this.orders = r.reverse());
  }

}
