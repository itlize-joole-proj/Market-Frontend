import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import {MustMatch} from './mustMatch.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

@Injectable()
export class SignupComponent implements OnInit {
  private registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

    // if valid go http request
    this.http.post('/register', this.registerForm.value)
      .subscribe((response) => {
        console.log('response ', response);
      });
  }
}


// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//
// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent implements OnInit {
//   private userForm: FormGroup;
//
//   constructor(private formBuilder: FormBuilder, ) { }
//
//   ngOnInit() {
//     this.userForm = this.formBuilder.group({
//       firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
//       lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
//       email: ['', [Validators.required, Validators.email]],
//       password: [''],
//     });
//   }
//
//   onSubmit() {
//       if (this.userForm.valid) {
//         alert('User form is valid!!');
//         console.log('reactiveForm' , this.userForm.value);
//       } else {
//         alert('User form is not valid!!');
//       }
//   }
// }
