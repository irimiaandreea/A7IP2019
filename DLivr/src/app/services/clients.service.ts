import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  loggedIn = false;
  accessToken: String = '';
  email: String = '';

  constructor(private http: HttpClient, public alertController: AlertController, private router: Router) { }

  register(credentials) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.http.post('http://localhost:8081/register', credentials, httpOptions)
    .subscribe(data => {
      console.log(data['message']);
      this.presentWarning('Account registered successfully!',
       'Welcome to DLivr! Please follow the confirmation link you received at your email address to finish validating your account!');
      this.login(credentials);
     }, error => {
      console.log(error);
      this.presentWarning('Atentie!', error.error['message']);
    });
  }

  login(credentials) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.http.post('http://localhost:8081/login', credentials, httpOptions)
    .subscribe(data => {
      console.log(data);
      this.accessToken = data['accessToken'];
      this.email = credentials['email'];
      this.loggedIn = true;
      console.log('Acces token received:' + this.accessToken);
      this.router.navigateByUrl('app/menu/home');
     }, error => {
      this.presentWarning('Atentie!', error.error['message']);
    });
  }

  // coroutines
  async presentWarning(hd: String, msg: String) {
    const alert = await this.alertController.create({
      header: hd.toString(),
      subHeader: '',
      message:  msg.toString(),
      buttons: ['OK']
    });

    await alert.present();
  }

  getPackages(email: String)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.get('http://localhost:8081/packages/sender/' + email, httpOptions);
  }

  // newPackage is assumed to not in JSON format
  registerPackage(newPackage)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post('http://localhost:8081/packages/registerPackage', JSON.stringify(newPackage), httpOptions);
  }
}
