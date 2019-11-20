import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CartComponent } from './cart/cart.component';
import { TermsComponent } from './terms/terms.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';


const routes: Routes = [
  {path: '', component: RestaurantsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'restaurant/:id', component: RestaurantComponent},
  {path: 'cart', component: CartComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'orderhistory', component: OrderhistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
