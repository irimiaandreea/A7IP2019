import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var MenuPage = /** @class */ (function () {
    function MenuPage(router) {
        var _this = this;
        this.router = router;
        this.userType = 'client';
        this.clientPages = [
            {
                title: 'Home',
                url: '../menu/home',
                icon: 'home'
            },
            {
                title: 'My Packages',
                url: '../menu/mypackages',
                icon: 'cube'
            },
            {
                title: 'Settings',
                url: '../menu/settings',
                icon: 'settings'
            },
            {
                title: 'Payment',
                url: '../menu/payment',
                icon: 'card'
            },
            {
                title: 'Help',
                url: '../menu/help',
                icon: 'help-circle'
            },
        ];
        this.driverPages = [
            {
                title: 'Home',
                url: '../menu/homedriver',
                icon: 'home'
            },
            {
                title: 'My Packages',
                url: '../menu/mypackagesdriver',
                icon: 'cube'
            },
            {
                title: 'Settings',
                url: '../menu/settings',
                icon: 'settings'
            },
            {
                title: 'Payment',
                url: '../menu/payment',
                icon: 'card'
            },
            {
                title: 'Help',
                url: '../menu/help',
                icon: 'help-circle'
            },
        ];
        this.selectedPath = '';
        this.router.events.subscribe(function (event) {
            _this.selectedPath = event.url;
        });
    }
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage.prototype.changeUserType = function () {
        if (this.userType === 'client') {
            this.userType = 'driver';
            this.router.navigate(['app/menu/homedriver']);
        }
        else {
            this.userType = 'client';
            this.router.navigate(['app/menu/home']);
        }
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map