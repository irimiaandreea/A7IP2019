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
    }
    ClientsService.prototype.register = function (credentials) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
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
            _this.accessToken = data['accessToken'];
            _this.email = data['email'];
            _this.loggedIn = true;
            console.log('Access token received:' + _this.accessToken);
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
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: hd.toString(),
                            subHeader: '',
                            message: msg.toString(),
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
    ClientsService.prototype.getPackages = function (email) {
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.get('http://localhost:8082/packages/sender/' + this.truncateEmailHost(this.email), httpOptions);
    };
    ClientsService.prototype.truncateEmailHost = function (email) {
        var index = email.lastIndexOf('@');
        return email.substring(0, index);
    };
    // newPackage is assumed to not be in JSON format
    ClientsService.prototype.addPackage = function (newPackage) {
        console.log(this.accessToken);
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
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