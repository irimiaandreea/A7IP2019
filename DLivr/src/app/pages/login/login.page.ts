import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
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

  async forgotPasswordAlert()
  {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs:
      [
        {
          name: 'email',
          placeholder: 'Email',
        },
        {
          name: 'newPassword',
          placeholder: 'New Password'
        }
      ],
      buttons: 
      [
        {
          text: 'Save'
        },
        {
          text: 'Cancel'
        }
      ]
    });
    await alert.present();
  }

}
