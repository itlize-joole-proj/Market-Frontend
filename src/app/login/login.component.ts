import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Buyer} from '../models/buyer.model';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  processing: boolean;
  submitted: boolean;
  message: string;
  messageClass: string;

  constructor(private userHttpService: AuthenticationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userHttpService.userHttpInfo();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.loginForm.controls['username'].disable;
    this.loginForm.controls['password'].disable;
  }

  enableForm() {
    this.loginForm.controls['username'].enable;
    this.loginForm.controls['password'].enable;
  }

  f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.processing = true;
    this.disableForm();

    this.userHttpService.login(this.f().username.value, this.f().password.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          console.log(localStorage.getItem('currentUser'));
        },
        error => {
          console.log(error);
          this.processing = false;
          this.enableForm();
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
