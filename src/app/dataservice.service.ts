import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get('https://reqres.in/api/users');
  }

}
