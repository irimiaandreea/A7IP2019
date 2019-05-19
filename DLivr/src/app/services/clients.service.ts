import { Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements AfterViewInit {

  loggedIn = false;
  accessToken: String = '';
  email: String = '';
  apiKey: String = 'AIzaSyCzbVg-JhZ5enrOtt6KwzDFqG9_7C-vSYo'; /*Your API Key*/
  geocoder: any;

  userType: String = 'client';

  ngAfterViewInit()
  {
  }

  constructor(private http: HttpClient, public alertController: AlertController, private router: Router) 
  {
  }

  // REGISTER : post
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

  // LOGIN : post
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
      
      this.router.navigateByUrl('app/menu/home');
     }, error => {
      this.presentWarning('Atentie!', error.error['message']);
    });
  }

  // RATING : post
  sendPackageRating(id, rating)
  {
    const body = {
      'idPackage': id, 
      'rating': rating
    };

    console.log("sendPackageRating: " + JSON.stringify(body));

    return this.http.post(
      'http://localhost:8298/rating-management/rating/setRating', 
      JSON.stringify(body),
      this.makeAuthorizedHeader()
    );
  }

  // async presentRating()
  // {
  //   const alert = await this.alertController.create({
  //     message: '<rating [rate]="rate"' +
  //       'readonly="false"' +
  //       'size="default" ' +
  //       '(rateChange)="onRateChange($event)">' +
  //     '</rating>',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

  changeToDriver()
  {
    this.userType = 'driver';
  }

  changeToClient()
  {
    this.userType = 'client';
  }

  // coroutines
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

  // HEADER : CORS 
  makeAuthorizedHeader() 
  {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      })
    };
  }

  // MYPACKAGES_ client : get
  getPackages()
  {
    return this.http.get('http://localhost:8298/package-management/packages/getPackagesSender', this.makeAuthorizedHeader());
  }

  // a try of validate address
  validateAddress()
  {
    var address1 = document.getElementById('pickupAddressInput');
    //var address2 = document.getElementById('deliveryAddressInput');

    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({'address': address1}, function(results, status) {
      if (status === 'OK') 
      {
        console.log("Address is good.");
      }
      else 
      {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  truncateEmailHost(email) : String{
    var index = email.lastIndexOf('@');
    return email.substring(0, index);
  }

  // MYPACKAGES_ client : post
  addPackage(newPackage)
  {
    const body = {
      "emailSender" : this.email,
      "namePackage" : newPackage['namePackage'],
      "senderAdress": newPackage['senderAdress'],
      "receiverAdress": newPackage['receiverAdress'],
      "kilograms": newPackage['kilograms'],
      "phoneNumberSender": newPackage['phoneNumberSender'],
      "phoneNumberReceiver": newPackage['phoneNumberReceiver'],
      "receiverName": newPackage['receiverName'],
      "senderName": newPackage['senderName'],
      "length": newPackage['length'],
      "width": newPackage['width'],
      "height": newPackage['height']
    };
    
    console.log(body);
    return this.http.post('http://localhost:8298/package-management/packages/registerPackage', 
      JSON.stringify(body), 
      this.makeAuthorizedHeader()
    );
  }

  // MYPACKAGES_ client: delete
  deletePackage(id)
  {
    return this.http.delete('http://localhost:8298/package-management/packages/deletePackage/' + id, this.makeAuthorizedHeader());
  }

  // MYPACKAGES_ client: put
  editPackage(packageToUpdate)
  {
    return this.http.put('http://localhost:8298/package-management/packages/modifyPackageInformations', 
      packageToUpdate, 
      this.makeAuthorizedHeader()
    );
  }

  // MYPACKAGES_ driver: get
  mypackagesdriverget()
  {
   console.log('Access email MY PACK DRIVER ' + this.email);
   //console.log('Acces token MY PACK DRIVER ' + data['email']);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer ' + this.accessToken
      })  
    };
      
    return this.http.get('http://localhost:8298/package-management/packages/driver/'+this.email,httpOptions)

  }

  // HOMEPAGE_ driver: get
  getPackagesInAreaOf(location: String) {
    return this.http.get('http://localhost:8298/package-management/packages/getPackages/'
    + location.toString(), this.makeAuthorizedHeader());
  }


  // FORGOT_PASSWORD: get
  generatePassword(email : String)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.get('http://localhost:8298/account-management/passwordRecovery/' + email, httpOptions);
  }

  // GET_PROFILE_INFO_ driver: get
  getProfileInfoDriver()
  {
    return this.http.get("http://localhost:8298/account-management/accountManagement/getProfileInformation/driver", this.makeAuthorizedHeader());
  }

  // GET_PROFILE_INFO_ sender: get
  getProfileInfoSender()
  {
    return this.http.get("http://localhost:8298/account-management/accountManagement/getProfileInformation/sender", this.makeAuthorizedHeader());
  }
}
