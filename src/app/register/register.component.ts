import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { DataserviceService } from '../dataservice.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { getRandomInt } from '../_helpers/random';

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
    image: File;

    constructor(private formBuilder: FormBuilder,
        private dataService: DataserviceService,
        private router: Router,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {

        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, getRandomInt());

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            customFile: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    aretermsAccepted() {
       if ( localStorage.getItem('terms') === 'accepted' ) {
           return true;
       }
       return false;

    }

    onFileChanged(event) {
        const file = event.target.files[0]
        document.getElementById("custom-file-label").innerHTML = file.name
        console.log(file.name)
        this.image=file
      }

    onSubmit() {
        this.submitted = true;
        if ( !this.aretermsAccepted()) {
            return;
        }

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const firstname = this.f.firstName.value;
        const lastname = this.f.lastName.value;
        const email = this.f.email.value;
        const mobileNumber = this.f.mobileNumber.value;
        const password = this.f.password.value;
    
        this.dataService.signUp(firstname, lastname, email, password, mobileNumber, this.image)
        .then(res => {
            this.register = true;
            this.success = true;
            localStorage.removeItem('terms');
          })
        .catch(err => { this.success = false; });
    }
}
