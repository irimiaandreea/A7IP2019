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
      this.email = data['email'];
      this.loggedIn = true;
      
      console.log('Access token received:' + this.accessToken);
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

    return this.http.get('http://localhost:8082/packages/sender/' + this.truncateEmailHost(this.email), httpOptions);
  }

  truncateEmailHost(email) : String{
    var index = email.lastIndexOf('@');
    return email.substring(0, index);
  }

  // newPackage is assumed to not be in JSON format
  addPackage(newPackage)
  {
    console.log(this.accessToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    };

    console.log(this.truncateEmailHost(this.email));
    console.log(httpOptions);
    newPackage['emailSender'] = this.truncateEmailHost(this.email);
    newPackage['emailDriver'] = 'one';
    newPackage['senderAddress'] = 'one';
    newPackage['receiverAddress'] = 'one';
    newPackage['kilograms'] = 'one';
    newPackage['phoneNumberSender'] = 'one';
    newPackage['phoneNumberReceiver'] = 'one';
    newPackage['receiverName'] = 'one';
    newPackage['length'] = '1';
    newPackage['height'] = '2';
    newPackage['width'] = '3';

    var jank = [{
      'emailSender': this.truncateEmailHost(this.email),
      "senderAddress": "Iasi",
      "recieverAddress": "Bucuresti",
      "kilograms": "23",
      "phoneNumberSender": "1234",
      "phoneNumberReceiver": "12345",
      "receiverName": "marus",
      "length": "1",
      "width": "1",
      "heigth": "1"
    }];

    
// emaiSender,emailDriver, senderAddress,receiverAddress,kilograms,phoneNumberSender,phoneNumberReceiver,receiverName,length,width,height si 
    console.log(JSON.stringify(jank));
    return this.http.post('http://localhost:8082/packages/registerPackage', JSON.stringify(jank), httpOptions);
  }
}
