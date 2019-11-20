import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, filter } from 'rxjs/operators';
import { RestaurantModel } from './models/RestaurantModel';
import { Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ordermodel } from './models/ordermodel';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  backend: string;

  constructor(private httpClient: HttpClient) {
    this.backend = 'http://localhost:8102';
  }

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.httpClient.get<RestaurantModel[]>(this.backend + '/getHotels').pipe(
      map(data => data.map(d => new RestaurantModel().deserialize(d)),
      catchError(() => throwError('Restaurants are not found'))
      ));
  }

  getRestaurantsMatching(id: string): Observable<RestaurantModel> {
    return this.httpClient.get<RestaurantModel[]>(this.backend + '/getHotels')
    .pipe(
      // tslint:disable-next-line: no-shadowed-variable
      map(data => data.map(d => new RestaurantModel().deserialize(d))
      .find(x => x.hotelId === id),
      catchError(() => throwError('Restaurants are not found'))
      ));
  }

  signIn(username: string, password: string): Promise<Object> {
    const payload = {
      'username': username,
      'password': password
    };

    return new Promise((resolve, reject) => {
      this.httpClient.post(this.backend + '/login', payload).subscribe(res => {
      resolve(res);
    });
    });
  }

  signUp(firstname: string, lastname: string, email: string, password: string, phone: string): Promise<Object> {
    const payload = {
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'password': password,
      'phone': phone
    };
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.backend + '/createUser', payload).subscribe(res => {
        resolve(res);
    });
    });
  }

  placeOrder(order: Ordermodel): Observable<Ordermodel> {
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', this.getToken());

    const options = {
      headers: httpHeaders
    };

    return this.httpClient.post<Ordermodel>(this.backend + '/placeOrder', order, options);
  }

  getOrderHistory(): Observable<Ordermodel[]> {

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('token', this.getToken());

    const options = {
      headers: httpHeaders
    };

    return this.httpClient.get<Ordermodel[]>(this.backend + '/orderHistory', options).pipe(
      map(data => data.map(d => new Ordermodel().deserialize(d)),
      catchError(() => throwError('Orders are not found'))
      ));
  }

  getToken() {
    return sessionStorage.getItem('authToken');
  }

}
