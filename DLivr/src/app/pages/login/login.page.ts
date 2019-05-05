import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor (
    public formBuilder: FormBuilder,
    private userService: ClientsService,
    private router: Router
    ) {
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

    const formJson = JSON.stringify(this.loginForm.value);
    this.userService.login(formJson);
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
  }
}
