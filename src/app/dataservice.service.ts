import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ServerRequest } from 'http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get('https://reqres.in/api/users');
  }

  signIn(username: string, password: string): boolean {
    const payload = {
      'username': username,
      'password': password
    };
    this.httpClient.post('http://localhost:8102/login', payload).subscribe(res => {
      // get the token and write it to localstore or cookie 	
     
      return false;
    })
  
    // err => {
    //   console.log(err);
    //   return false;
    
    return true;
  }

  signUp(firstname: string, lastname: string, email: string, password: string, phone: string): boolean {
    const payload = {
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
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
    })
    return false;
  }
}
