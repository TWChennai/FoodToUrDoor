import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DataserviceService } from '../dataservice.service';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.dataService.signIn(
        this.loginForm.controls.userName.value,
        this.loginForm.controls.password.value)
          .then(res => {
            sessionStorage.setItem("authToken",res.token);
            sessionStorage.setItem("username",res.username);
            this.router.navigate(['/']);
            this.success = true
          })
          .catch(() => this.success = false)
        


}


}
