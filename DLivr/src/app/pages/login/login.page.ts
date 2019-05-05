import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'email': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your password must contain only numbers and letters.' },
      ],
    };

  constructor (public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {
      password: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ]
      )),
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
      ]
     ))
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('login form invalid');
        return;
    }
  }


  get f() { return this.loginForm.controls; }

  ngOnInit() {
  }
}
