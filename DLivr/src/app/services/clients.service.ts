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

    this.http.post('http://localhost:8298/account-management/register', credentials, httpOptions)
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

    console.log(credentials);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.http.post('http://localhost:8298/account-management/login', credentials, httpOptions)
    .subscribe(data => {
      this.accessToken = data['token'];
      this.email = JSON.parse(credentials)['email'];
      this.loggedIn = true;
      
      console.log('Access token received:' + this.accessToken);
      console.log('Email received:' + this.email);

      // localStorage['email'] = this.email;
      // localStorage['accessToken'] = this.accessToken;

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

  makeAuthorizedHeader() 
  {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    };
  }

  getPackages()
  {
    return this.http.get('http://localhost:8298/package-management/packages/sender/' + this.email, this.makeAuthorizedHeader());
  }

  truncateEmailHost(email) : String{
    var index = email.lastIndexOf('@');
    return email.substring(0, index);
  }

  // newPackage is assumed to not be in JSON format
  addPackage(newPackage)
  {
    const body = {
      "emailSender" : this.email,
      "senderAdress": newPackage['pickupAddress'],
      "receiverAdress": newPackage['deliveryAddress'],
      "kilograms": newPackage['packageWeight'],
      "phoneNumberSender": newPackage['senderPhoneNumber'],
      "phoneNumberReceiver": newPackage['receiverPhoneNumber'],
      "receiverName": newPackage['receiverName'] + ":" + newPackage['name'],
      "length": newPackage['packageLength'],
      "width": newPackage['packageWidth'],
      "height": newPackage['packageHeight']
    };
    
    console.log(body);
    return this.http.post('http://localhost:8298/package-management/packages/registerPackage', 
      JSON.stringify(body), 
      this.makeAuthorizedHeader()
    );
  }

  // mypackagesdriverget()
  // {
  //   return this.http.get('http://localhost:8298/package-management/packages/driver/' +  this.email, this.makeAuthorizedHeader());
  // }
}
