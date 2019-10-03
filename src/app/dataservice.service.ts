import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerRequest } from 'http';
import { catchError, map, filter } from 'rxjs/operators';
import { RestaurantModel } from './models/RestaurantModel';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.httpClient.get<RestaurantModel[]>('http://localhost:8102/getHotels').pipe(
      // tslint:disable-next-line: no-shadowed-variable
      map(data => data.map(d => new RestaurantModel().deserialize(d)),
      catchError(() => throwError('Restaurants are not found'))
      ));
  }

  getRestaurantsMatching(id: string): Observable<RestaurantModel> {
    return this.httpClient.get<RestaurantModel[]>('http://localhost:8102/getHotels')
    .pipe(
      // tslint:disable-next-line: no-shadowed-variable
      map(data => data.map(d => new RestaurantModel().deserialize(d))
      .find(x => x.hotelId === id),
      catchError(() => throwError('Restaurants are not found'))
      ));
  }



  signIn(username: string, password: string): boolean {
    const payload = username + ':' + password;
    this.httpClient.post('http://localhost:8102/login', payload).subscribe(res => {
      // get the token and write it to localstore or cookie 	
        return true;
    },
    err => {
      console.log(err);
      return false;
    });
    return false;
  }

  signUp(email: string, username: string, password: string, phone: string): boolean {
    const payload = {
      'email': email,
      'username': username,
      'password': password,
      'phone': phone
    };
    this.httpClient.post('http://localhost:8102/createUser', payload).subscribe(res => {
      // get the token and write it to localstore or cookie
        return true;
    },
    err => {
      console.log(err);
      return false;
    });
    return false;
  }
}
