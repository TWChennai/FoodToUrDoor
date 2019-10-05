import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DataserviceService } from '../dataservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    success = false;
    register = false;

    constructor(private formBuilder: FormBuilder, private dataService: DataserviceService,private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const firstname = this.f.firstName.value;
        const lastname = this.f.lastName.value;
        const email = this.f.email.value;
        const mobileNumber = this.f.mobileNumber.value;
        const password = this.f.password.value;
        this.success = this.dataService.signUp(firstname, lastname,email, password, mobileNumber )
        .then(res => {
            res.token;
            this.register=true;
            this.success = true
          })
        .catch(() => this.success = false)
    }
}