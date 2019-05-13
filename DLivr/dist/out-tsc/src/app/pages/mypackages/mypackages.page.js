import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
var MypackagesPage = /** @class */ (function () {
    function MypackagesPage(menuCtrl, userService, formBuilder) {
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.error_messages = {
            'packageName': [
                { type: 'required', message: 'Package\'s name is required!' },
                { type: 'minLength', message: 'Package\'name must be longer than 3 characters!' },
                { type: 'maxLength', message: 'Package\'name must be lower than 30 characters!' }
            ]
        };
        this.packages = [];
        this.name = "";
        this.pickupAddress = "";
        this.deliveryAddress = "";
        this.receiverName = "";
        this.receiverPhoneNumber = "";
        this.packageLength = "";
        this.packageWeight = "";
        this.packageHeight = "";
        this.packageWidth = "";
        this.pickupHours = [];
        this.id = "";
        this.pickupDay = "";
        this.pickupStartHour = "";
        this.pickupEndHour = "";
        this.selectedPackage = [];
        this.selectedpickupHours = [
            {
                "id": 0,
                "pickupDay": "",
                "pickupStartHour": "",
                "pickupEndHour": "",
            }
        ];
        console.log('email: ' + this.userService.email);
        // userService.getPackages(userService.email)
        // .subscribe(data => {
        //   console.log("get packages???");
        //   console.log(data);
        //   var packages = data['packages'];
        //   packages.forEach(p => {
        //     this.pushCard(
        //       p['name'],
        //       p['pickupAddress'],
        //       p['deliveryAddress'],
        //       p['receiverName'],
        //       p['receiverPhoneNumber'],
        //       p['packageLength'],
        //       p['packageWeight'],
        //       p['packageHeight'],
        //       p['packageWidth'],
        //       p['pickupHours'].concat(),
        //     )
        //   });
        // }, error => {
        //   console.log("Unable to retrieve packages from server");
        //   console.log(error);
        // });
        this.addPackageForm = this.formBuilder.group({
            packageName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
            ])),
            pickupAddress: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(60),
            ])),
            deliveryAddress: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(60),
            ])),
            receiverName: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ])),
            receiverPhoneNumber: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(30),
            ])),
            packageWeight: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            packageWidth: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            packageLength: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.minLength(1),
                Validators.maxLength(30),
            ])),
            packageHeight: new FormControl('', Validators.compose([
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
        this.name = "";
        this.pickupAddress = "";
        this.deliveryAddress = "";
        this.receiverName = "";
        this.receiverPhoneNumber = "";
        this.packageLength = "";
        this.packageWeight = "";
        this.packageHeight = "";
        this.packageWidth = "";
        this.pickupHours.splice(0, this.pickupHours.length);
        /* this.pickupHours.push(
          {
            "pickupDay" : "",
            "pickupStart" : "",
            "pickupEnd" : "",
          }
        ); */
    };
    MypackagesPage.prototype.setAddPackageInputs = function (pack) {
        this.name = pack.name;
        this.pickupAddress = pack.pickupAddress;
        this.deliveryAddress = pack.deliveryAddress;
        this.receiverName = pack.receiverName;
        this.receiverPhoneNumber = pack.receiverPhoneNumber;
        this.packageLength = pack.packageLength;
        this.packageWeight = pack.packageWeight;
        this.packageHeight = pack.packageHeight;
        this.packageWidth = pack.packageWidth;
        this.pickupHours = pack.pickupHours.concat();
    };
    // addPackage form
    MypackagesPage.prototype.addPackageButton = function () {
        var _this = this;
        var divNoPackage = document.getElementById("text");
        var divDriverText = document.getElementById("textDriver");
        var divAdd = document.getElementById("addPackage");
        var buttonAdd = document.getElementById("addpackage");
        var divtextDriver2 = document.getElementById("textDriver2");
        console.log(buttonAdd.textContent);
        this.closeExistingPackage();
        divtextDriver2.style.display = "none";
        if (buttonAdd.textContent == "Add Package") {
            divNoPackage.style.display = "none";
            divAdd.style.display = "block";
            buttonAdd.textContent = "Confirm";
            divDriverText.style.display = "block";
        }
        else // Confirm
         {
            buttonAdd.textContent = "Add Package";
            divDriverText.style.display = "none";
            this.pickupHours.forEach(function (pickupHour) {
                console.log(pickupHour);
            });
            var newPackage = this.makePackage(this.name, this.pickupAddress, this.deliveryAddress, this.receiverName, this.receiverPhoneNumber, this.packageLength, this.packageWeight, this.packageHeight, this.packageWidth, this.pickupHours);
            this.userService.addPackage(newPackage)
                .subscribe(function (data) {
                console.log("addPackage success: data");
                _this.pushCard(_this.name, _this.pickupAddress, _this.deliveryAddress, _this.receiverName, _this.receiverPhoneNumber, _this.packageLength, _this.packageWeight, _this.packageHeight, _this.packageWidth, _this.pickupHours);
            }, function (error) {
                console.log('Unable to register package');
                console.log(error);
                // alert maybe?
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
        var pickupHours = this.selectedPackage["pickupHours"];
        pickupHours.forEach(function (element) {
            console.log(element);
        });
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
        buttonEdit.textContent = "Add Package";
        divtextDriver2.style.display = "none";
    };
    // cancel edit in editPackage
    MypackagesPage.prototype.dontSaveEditPackage = function () {
        var buttonEdit = document.getElementById("addpackage");
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
    // add pickup hour ng
    MypackagesPage.prototype.addPickupHour = function () {
        this.addPickupItem();
    };
    MypackagesPage.prototype.makePackage = function (name, pickupAddress, deliveryAddress, receiverName, receiverPhoneNumber, packageLength, packageWeight, packageHeight, packageWidth, pickupHours) {
        return [{
                "number": (this.packages.length + 1).toString(),
                "name": name,
                "status": "",
                "pickupAddress": pickupAddress,
                "deliveryAddress": deliveryAddress,
                "receiverName": receiverName,
                "receiverPhoneNumber": receiverPhoneNumber,
                "packageLength": packageLength,
                "packageWeight": packageWeight,
                "packageHeight": packageHeight,
                "packageWidth": packageWidth,
                "pickupHours": pickupHours.concat(),
            }];
    };
    MypackagesPage.prototype.pushCard = function (name, pickupAddress, deliveryAddress, receiverName, receiverPhoneNumber, packageLength, packageWeight, packageHeight, packageWidth, pickupHours) {
        this.packages.push(this.makePackage(name, pickupAddress, deliveryAddress, receiverName, receiverPhoneNumber, packageLength, packageWeight, packageHeight, packageWidth, pickupHours));
        localStorage.setItem("mypackages.packages", JSON.stringify(this.packages));
        this.clearAddPackageInputs();
    };
    MypackagesPage.prototype.addPickupItem = function () {
        this.pickupHours.push({
            // name (as string) : actual value
            // "id" : (this.selectedpickupHours.length + 1).toString(),
            "pickupDay": "",
            "pickupStartHour": "",
            "pickupEndHour": "",
        });
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