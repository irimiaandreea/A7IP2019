import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ClientsService } from 'src/app/services/clients.service';
var HomedriverPage = /** @class */ (function () {
    function HomedriverPage(zone, geolocation, userService) {
        var _this = this;
        this.zone = zone;
        this.geolocation = geolocation;
        this.userService = userService;
        this.packageArray = new PackageCollection();
        this.packageArr = [];
        this.location = { lat: null, lng: null };
        this.markerOptions = { position: null, map: null, title: null };
        this.apiKey = 'AIzaSyCzbVg-JhZ5enrOtt6KwzDFqG9_7C-vSYo'; /*Your API Key*/
        /*load google map script dynamically */
        var script = document.createElement('script');
        script.id = 'googleMap';
        if (this.apiKey) {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
        }
        else {
            script.src = 'https://maps.googleapis.com/maps/api/js?key=';
        }
        document.head.appendChild(script);
        /*Get Current location*/
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.location.lat = position.coords.latitude;
            _this.location.lng = position.coords.longitude;
        });
        /*Map options*/
        this.mapOptions = {
            center: this.location,
            zoom: 15,
            mapTypeControl: false
        };
        setTimeout(function () {
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, _this.mapOptions);
            /*Marker Options*/
            _this.markerOptions.position = _this.location;
            _this.markerOptions.map = _this.map;
            _this.markerOptions.title = 'My Location';
            _this.markerOptions.label = '1';
            _this.marker = new google.maps.Marker(_this.markerOptions);
        }, 3000);
        userService.getPackagesInAreaOf('iasi').subscribe(function (data) {
            _this.packages = Object.values(data);
            var loc = { lat: 49.143022, lng: 29.581259 };
            _this.addMarker(loc, _this.map, _this.packages[0]);
            _this.packages.forEach(function (p) {
                var pack = new PackageFormal(p['height'], p['id'], p['kilograms'], p['length'], p['phoneNumberReceiver'], p['phoneNumberSender'], p['receiverAdress'], p['receiverName'], p['senderAdress'], p['width']);
                _this.packageArray.packages.push(pack);
                // this.packageArr.push(pack);
                var loca = { lat: 47.143022, lng: 27.581259 };
                _this.addMarker(loca, _this.map, pack);
            });
        });
    }
    HomedriverPage.prototype.addMarker = function (location, map, packageForMe) {
        console.log(packageForMe);
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            label: packageForMe.id.toString()
        });
        console.log('packageForMe' + packageForMe);
        marker.addListener('click', function () {
            console.log('should print dis');
            /*for (let i = 0; i < 3 ; i++) {
              if (this.packageArray[i].id === marker.label) {
               this.selectedPackage = this.packageArray[i];
              }
            }
            console.log('Selected Package: ' + this.selectedPackage);*/
            map.setCenter(marker.getPosition());
        });
    };
    HomedriverPage.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        ViewChild('Map'),
        tslib_1.__metadata("design:type", ElementRef)
    ], HomedriverPage.prototype, "mapElement", void 0);
    HomedriverPage = tslib_1.__decorate([
        Component({
            selector: 'app-homedriver',
            templateUrl: './homedriver.page.html',
            styleUrls: ['./homedriver.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone, Geolocation, ClientsService])
    ], HomedriverPage);
    return HomedriverPage;
}());
export { HomedriverPage };
var PackageFormal = /** @class */ (function () {
    function PackageFormal(height, id, kilograms, length, phoneNumberReceiver, phoneNumberSender, receiverAdress, receiverName, senderAdress, width) {
        this.height = height;
        this.id = id;
        this.kilograms = kilograms;
        this.length = length;
        this.phoneNumberReceiver = phoneNumberReceiver;
        this.phoneNumberSender = phoneNumberSender;
        this.receiverAdress = receiverAdress;
        this.receiverName = receiverName;
        this.senderAdress = senderAdress;
        this.width = width;
    }
    return PackageFormal;
}());
var PackageCollection = /** @class */ (function () {
    function PackageCollection() {
        this.packages = [];
    }
    PackageCollection.prototype.getLength = function () {
        return this.packages.length;
    };
    return PackageCollection;
}());
//# sourceMappingURL=homedriver.page.js.map