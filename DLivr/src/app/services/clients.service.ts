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
        'Content-Type':  'application/json'
       // 'Access-Control-Allow-Origin':'*'
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

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
   
    this.http.post('http://localhost:8298/account-management/login', credentials, httpOptions)
    .subscribe(data => {
      console.log(data);
      this.accessToken = data['token'];
      this.email =  JSON.parse(credentials)['email'];
     //  credentials['email'];
      this.loggedIn = true;
      console.log('hey sunt in login');
     // console.log('Acces token received:' + this.email);
      this.router.navigateByUrl('app/menu/home');
     }, error => {
      this.presentWarning('Atentie!', error.error['message']);
    });
  }

  async presentWarning(hd: String, msg: String) {
   console.log('ms ul asta e ' + msg);
    const alert = await this.alertController.create({
      header: hd.toString(),
      subHeader: '',
      message:
      //"" + msg,
  msg.toString(),
      buttons: ['OK']
    });

    await alert.present();
  }

  mypackagesdriverget()
  {
   console.log('Acces email MY PACK DRIVER ' + this.email);
   //console.log('Acces token MY PACK DRIVER ' + data['email']);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer ' + this.accessToken
      })  
      };
      
    return this.http.get('http://localhost:8298/package-management/packages/driver/'+this.email,httpOptions)

  }

}
