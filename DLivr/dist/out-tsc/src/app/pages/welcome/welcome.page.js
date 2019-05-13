import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var WelcomePage = /** @class */ (function () {
    function WelcomePage(router) {
        this.router = router;
    }
    WelcomePage.prototype.ngOnInit = function () {
    };
    WelcomePage.prototype.clickedLogin = function () {
        this.router.navigate(['login']);
    };
    WelcomePage.prototype.clickedRegister = function () {
        this.router.navigate(['register']);
    };
    WelcomePage = tslib_1.__decorate([
        Component({
            selector: 'app-welcome',
            templateUrl: './welcome.page.html',
            styleUrls: ['./welcome.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], WelcomePage);
    return WelcomePage;
}());
export { WelcomePage };
//# sourceMappingURL=welcome.page.js.map