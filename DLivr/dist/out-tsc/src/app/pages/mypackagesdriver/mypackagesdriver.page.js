import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { AlertController } from '@ionic/angular';
var MypackagesdriverPage = /** @class */ (function () {
    function MypackagesdriverPage(myFirstService, alertController, alertCtrl) {
        /*this.packages = JSON.parse(localStorage.getItem("mypackages.packages"));
        console.log("packages: " + JSON.stringify(this.packages[0].pickupAddress));*/
        this.myFirstService = myFirstService;
        this.alertController = alertController;
        this.alertCtrl = alertCtrl;
        this.packages = [];
    }
    MypackagesdriverPage.prototype.ngOnInit = function () {
        var _this = this;
        this.myFirstService.mypackagesdriverget()
            .subscribe(function (data) {
            console.log("We got my packages driver data : ", data);
            _this.packages = data;
            // console.log(this.packages[0]);
            // console.log(this.packages[1]);
            // console.log(this.packages[2]);
            //   this.packages = data;
        }, function (error) {
            console.log(error);
            _this.presentWarning('Atentie!', error.error['message']);
        });
    };
    MypackagesdriverPage.prototype.markPackageAsDelivered = function () {
        this.presentPrompt();
    };
    MypackagesdriverPage.prototype.presentPrompt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            // title: 'PIN',
                            inputs: [
                                {
                                    name: 'PIN',
                                    placeholder: 'PIN'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                },
                                {
                                    text: 'Ok',
                                    role: 'ok',
                                }
                            ]
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
    MypackagesdriverPage.prototype.presentWarning = function (hd, msg) {
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
    MypackagesdriverPage = tslib_1.__decorate([
        Component({
            selector: 'app-mypackagesdriver',
            templateUrl: './mypackagesdriver.page.html',
            styleUrls: ['./mypackagesdriver.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ClientsService, AlertController, AlertController])
    ], MypackagesdriverPage);
    return MypackagesdriverPage;
}());
export { MypackagesdriverPage };
//# sourceMappingURL=mypackagesdriver.page.js.map