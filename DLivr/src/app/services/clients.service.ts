import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  register(/*email: String, password: String, phoneNumber: String*/) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        /*'Key' : 'Authorization',
        'Value' : 'Bearer tok'*/
      })
    };

/*
    this.http.get('http://localhost:8081/currency-conversion-service/currency-converter-feign/from/EUR/to/RON/quantity/120'
    , httpOptions).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });*/

    const postData = {
      'email': 'madalin',
      'password': '1234',
      'phone_number': '1234'
    };

    this.http.post('http://localhost:8081/register', postData, httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }
}
