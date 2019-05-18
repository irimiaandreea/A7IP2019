import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
var ClientsService = /** @class */ (function () {
    function ClientsService(http, alertController, router) {
        this.http = http;
        this.alertController = alertController;
        this.router = router;
        this.loggedIn = false;
        this.accessToken = '';
        this.email = '';
        this.apiKey = 'AIzaSyCzbVg-JhZ5enrOtt6KwzDFqG9_7C-vSYo'; /*Your API Key*/
    }
    ClientsService.prototype.register = function (credentials) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                // 'Access-Control-Allow-Origin':'*'
            })
        };
        this.http.post('http://localhost:8298/account-management/register', credentials, httpOptions)
            .subscribe(function (data) {
            console.log(data['message']);
            _this.presentWarning('Account registered successfully!', 'Welcome to DLivr! Please follow the confirmation link you received at your email address to finish validating your account!');
            _this.login(credentials);
        }, function (error) {
            console.log(error);
            _this.presentWarning('Atentie!', error.error['message']);
        });
    };
    ClientsService.prototype.login = function (credentials) {
        var _this = this;
        console.log(credentials);
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        this.http.post('http://localhost:8298/account-management/login', credentials, httpOptions)
            .subscribe(function (data) {
            _this.accessToken = data['token'];
            _this.email = JSON.parse(credentials)['email'];
            _this.loggedIn = true;
            console.log('Access token received:' + _this.accessToken);
            console.log('Email received:' + _this.email);
            _this.router.navigateByUrl('app/menu/home');
        }, function (error) {
            _this.presentWarning('Atentie!', error.error['message']);
        });
    };
    // coroutines
    ClientsService.prototype.presentWarning = function (hd, msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ms ul asta e ' + msg);
                        return [4 /*yield*/, this.alertController.create({
                                header: hd.toString(),
                                subHeader: '',
                                message: 
                                //"" + msg,
                                msg.toString(),
                                buttons: ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientsService.prototype.makeAuthorizedHeader = function () {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            })
        };
    };
    // GET for mypackages  
    ClientsService.prototype.getPackages = function () {
        return this.http.get('http://localhost:8298/package-management/packages/getPackagesSender', this.makeAuthorizedHeader());
    };
    ClientsService.prototype.validateEmailAddress = function (email) {
        var script = document.createElement('script');
        var geocoder = google.maps.Geocoder();
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
        script.id = 'googleGeocoder';
        console.log(script.src);
        document.head.appendChild(script);
        var mapOptions = {
            center: { lat: 47.143022, lng: 27.581259 },
            zoom: 15,
            mapTypeControl: false
        };
        return geocoder.geocode({ 'address': '10389 Shenandoah' }, function (results, status) {
            console.log(status);
        });
    };
    ClientsService.prototype.truncateEmailHost = function (email) {
        var index = email.lastIndexOf('@');
        return email.substring(0, index);
    };
    // POST for mypackages
    ClientsService.prototype.addPackage = function (newPackage) {
        var body = {
            "emailSender": this.email,
            "namePackage": newPackage['namePackage'],
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
        return this.http.post('http://localhost:8298/package-management/packages/registerPackage', JSON.stringify(body), this.makeAuthorizedHeader());
    };
    // PUT localhost:8298/package-management/packages/modifyPackageInformations modifica informatiile despre un pachet (request facut de sender). 
    // Primeste in body :  id,namePackage,senderAddress,receiverAddress, 
    // phoneNumberSender,phoneNumberReceiver,receiverName,kilograms,length,width,height. Numai id-ul este obligatoriu, celelalte campuri pot fi null
    // POST for mypackages
    ClientsService.prototype.editPackage = function () {
    };
    ClientsService.prototype.mypackagesdriverget = function () {
        console.log('Access email MY PACK DRIVER ' + this.email);
        //console.log('Acces token MY PACK DRIVER ' + data['email']);
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            })
        };
        return this.http.get('http://localhost:8298/package-management/packages/driver/' + this.email, httpOptions);
    };
    ClientsService.prototype.getPackagesInAreaOf = function (location) {
        return this.http.get('http://localhost:8298/package-management/packages/getPackages/'
            + location.toString(), this.makeAuthorizedHeader());
    };
    ClientsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, AlertController, Router])
    ], ClientsService);
    return ClientsService;
}());
export { ClientsService };
//# sourceMappingURL=clients.service.js.map