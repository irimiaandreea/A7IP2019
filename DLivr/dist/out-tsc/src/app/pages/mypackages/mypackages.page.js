import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
var MypackagesPage = /** @class */ (function () {
    function MypackagesPage(menuCtrl, userService, formBuilder) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.packages = [];
        this.namePackage = "";
        this.senderAdress = "";
        this.receiverAdress = "";
        this.receiverName = "";
        this.senderName = "";
        this.phoneNumberReceiver = "";
        this.phoneNumberSender = "";
        this.length = "";
        this.kilograms = "";
        this.height = "";
        this.width = "";
        this.pickupHours = [];
        this.selectedPackage = [];
        this.id = "";
        console.log('email received in mypackages: ' + this.userService.email);
        userService.getPackages()
            .subscribe(function (data) {
            console.log(data);
            var packages = Object.values(data);
            console.log(packages);
            packages.forEach(function (p) {
                /*const names =  (p['receiverName'] + '');
                const colonIndex = names.lastIndexOf(':');
      
                // So we can see the actual name of the package
                // because there is no packageName in the database
                var receiverName = names;
                var packageName = '<name>';
                if (colonIndex != -1)
                {
                  receiverName = names.substring(0, colonIndex - 1);
                  packageName = names.substring(colonIndex + 1);
                }*/
                // /getPackagesSender returneaza un json care repezinta un obiect cu urmatoarele campuri: id,namePackage,senderAddress,receiverAddress,
                // kilograms,phoneNumberSender,phoneNumberReceiver,senderName,receiverName,length,width,height. Length,width,height sunt de tip int
                _this.pushCard(p['namePackage'], // p['name'],
                p['senderAdress'], // p['pickupAddress'],
                p['receiverAdress'], // p['deliveryAddress'],
                p['receiverName'], p['senderName'], p['phoneNumberReceiver'], p['phoneNumberSender'], p['length'], p['kilograms'], p['height'], p['width'], p['status']);
            });
            if (packages.length > 0) {
                var divNoPackage = document.getElementById("noPackageText");
                divNoPackage.style.display = "none";
            }
        }, function (error) {
            console.log("Unable to retrieve packages from server");
            console.log(error);
        });
        this.addPackageForm = this.formBuilder.group({
            namePackage: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ])),
            senderAdress: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(60),
            ]), this.validateAddress(this.userService)),
            receiverAdress: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(60),
            ])),
            receiverName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ])),
            senderName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ])),
            phoneNumberSender: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(7),
                Validators.maxLength(30),
            ])),
            phoneNumberReceiver: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(7),
                Validators.maxLength(30),
            ])),
            kilograms: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            width: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            length: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            height: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
        });
    }
    Object.defineProperty(MypackagesPage.prototype, "f", {
        get: function () { return this.addPackageForm.controls; },
        enumerable: true,
        configurable: true
    });
    MypackagesPage.prototype.submitForm = function () {
        this.submitted = true;
        // stop here if form is invalid
        if (this.addPackageForm.invalid) {
            console.log('Add package form invalid');
            return;
        }
    };
    MypackagesPage.prototype.toArray = function (object) {
        return Object.keys(object).map(function (key) {
            return [Number(key), object[key]];
        });
    };
    MypackagesPage.prototype.validateAddress = function (userService) {
        console.log("Validate address test");
        return function (control) {
            return userService.validateEmailAddress("horse");
        };
    };
    MypackagesPage.prototype.removeValidators = function (form) {
        for (var key in form.controls) {
            form.get(key).clearValidators();
            form.get(key).updateValueAndValidity();
        }
    };
    MypackagesPage.prototype.ngOnInit = function () {
    };
    // close addPackage page/ editPackage page
    MypackagesPage.prototype.closeExistingPackage = function () {
        var divAdd = document.getElementById("addPackage");
        var buttonAdd = document.getElementById("addpackage");
        // var divEdit = document.getElementById("editPackage");
        divAdd.style.display = "none";
        // divEdit.style.display = "none";
        //buttonAdd.textContent = "Add Package";
    };
    MypackagesPage.prototype.clearAddPackageInputs = function () {
        this.namePackage = "";
        this.receiverAdress = "";
        this.receiverName = "";
        this.phoneNumberReceiver = "";
        this.senderName = "";
        this.senderAdress = "";
        this.phoneNumberSender = "";
        this.length = "";
        this.kilograms = "";
        this.height = "";
        this.width = "";
    };
    MypackagesPage.prototype.setAddPackageInputs = function (pack) {
        this.namePackage = pack.name;
        this.senderName = pack.senderName;
        this.senderAdress = pack.senderAdress;
        this.phoneNumberSender = pack.phoneNumberSender;
        this.receiverAdress = pack.receiverAdress;
        this.receiverName = pack.receiverName;
        this.phoneNumberReceiver = pack.phoneNumberReceiver;
        this.length = pack.length;
        this.kilograms = pack.kilograms;
        this.height = pack.height;
        this.width = pack.width;
    };
    // addPackage form
    MypackagesPage.prototype.addPackageButton = function () {
        var _this = this;
        var divNoPackage = document.getElementById("noPackageText");
        var divDriverText = document.getElementById("textDriver");
        var divAdd = document.getElementById("addPackage");
        var buttonAdd = document.getElementById("addpackage");
        var divtextDriver2 = document.getElementById("textDriver2");
        console.log(buttonAdd.textContent);
        if (!this.addPackageForm.invalid)
            this.closeExistingPackage();
        divtextDriver2.style.display = "none";
        if (buttonAdd.textContent == "Add Package") {
            this.submitted = false;
            divNoPackage.style.display = "none";
            divAdd.style.display = "block";
            buttonAdd.textContent = "Confirm";
            divDriverText.style.display = "block";
        }
        else // Confirm
         {
            // if (this.addPackageForm.invalid)
            // {
            //   this.submitted = true;
            //   this.addPackageForm.updateValueAndValidity();
            //   return;
            // }
            if (!this.addPackageForm.invalid) {
                buttonAdd.textContent = "Add Package";
                divDriverText.style.display = "none";
                this.addPackageForm.clearValidators();
                this.addPackageForm.updateValueAndValidity();
            }
            var newPackage = this.makePackage(this.namePackage, this.senderAdress, this.receiverAdress, this.receiverName, this.senderName, this.phoneNumberReceiver, this.phoneNumberSender, this.length, this.kilograms, this.height, this.width, "Accepted");
            console.log(newPackage);
            this.submitted = true;
            this.userService.addPackage(newPackage)
                .subscribe(function (data) {
                console.log("addPackage success: data");
                _this.pushCard(_this.namePackage, _this.senderAdress, _this.receiverAdress, _this.receiverName, _this.senderName, _this.phoneNumberReceiver, _this.phoneNumberSender, _this.length, _this.kilograms, _this.height, _this.width, "Accepted");
            }, function (error) {
                console.log('Unable to register package');
                console.log(error);
                _this.userService.presentWarning("Formular Invalid", "A aparut o problema cu informatiile pe care le-ati trimis");
                // There was a problem with the info you provided
            });
        }
    };
    // editPackage form
    MypackagesPage.prototype.editPackageForm = function (i) {
        var divEdit = document.getElementById("editPackage");
        var buttonEdit = document.getElementById("addpackage");
        var divtextDriver2 = document.getElementById("textDriver2");
        this.closeExistingPackage();
        divEdit.style.display = "block";
        buttonEdit.textContent = "Save";
        divtextDriver2.style.display = "block";
        this.selectedPackage = this.packages[i - 1];
        console.log("editPackageForm: ");
        console.log("i = " + i);
        console.log("Name = " + this.selectedPackage["name"]);
        console.log("Number = " + this.selectedPackage["number"]);
        this.clearAddPackageInputs();
        this.setAddPackageInputs(this.selectedPackage);
    };
    // delete a package in addPackage page
    MypackagesPage.prototype.deletePackage = function (i) {
        this.packages.splice(i - 1, 1);
        console.log("delete package " + (i - 1).toString());
        for (var x = i - 1; x < this.packages.length; x++) {
            this.packages[x].number--;
        }
    };
    MypackagesPage.prototype.cancelEdit = function () {
        var divEdit = document.getElementById("editPackage");
        var buttonEdit = document.getElementById("addpackage");
        var divtextDriver2 = document.getElementById("textDriver2");
        this.closeExistingPackage();
        this.addPackageForm.clearValidators();
        buttonEdit.textContent = "Add Package";
        divtextDriver2.style.display = "none";
        divEdit.style.display = "none";
    };
    // cancel edit in editPackage
    MypackagesPage.prototype.dontSaveEditPackage = function () {
        var buttonEdit = document.getElementById("editpackage");
        var divtextDriver2 = document.getElementById("textDriver2");
        this.closeExistingPackage();
        buttonEdit.textContent = "Add Package";
        divtextDriver2.style.display = "none";
        this.clearAddPackageInputs();
    };
    // cancel addPackage
    MypackagesPage.prototype.dontAddPackage = function () {
        var buttonAddPackage = document.getElementById("addpackage");
        var divDriverText = document.getElementById("textDriver");
        this.closeExistingPackage();
        buttonAddPackage.textContent = "Add Package";
        divDriverText.style.display = "none";
        this.clearAddPackageInputs();
    };
    MypackagesPage.prototype.makePackage = function (namePackage, senderAdress, receiverAdress, receiverName, senderName, phoneNumberReceiver, phoneNumberSender, length, kilograms, height, width, status) {
        return {
            "number": (this.packages.length + 1).toString(),
            "namePackage": namePackage,
            "status": status,
            "senderAdress": senderAdress,
            "receiverAdress": receiverAdress,
            "receiverName": receiverName,
            "senderName": senderName,
            "phoneNumberReceiver": phoneNumberReceiver,
            "phoneNumberSender": phoneNumberSender,
            "length": length,
            "kilograms": kilograms,
            "height": height,
            "width": width,
        };
    };
    MypackagesPage.prototype.pushCard = function (namePackage, senderAdress, receiverAdress, receiverName, senderName, phoneNumberReceiver, phoneNumberSender, length, kilograms, height, width, status) {
        this.packages.push(this.makePackage(namePackage, senderAdress, receiverAdress, receiverName, senderName, phoneNumberReceiver, phoneNumberSender, length, kilograms, height, width, status));
        this.clearAddPackageInputs();
    };
    MypackagesPage = tslib_1.__decorate([
        Component({
            selector: 'app-mypackages',
            templateUrl: './mypackages.page.html',
            styleUrls: ['./mypackages.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController,
            ClientsService,
            FormBuilder])
    ], MypackagesPage);
    return MypackagesPage;
}());
export { MypackagesPage };
//# sourceMappingURL=mypackages.page.js.map