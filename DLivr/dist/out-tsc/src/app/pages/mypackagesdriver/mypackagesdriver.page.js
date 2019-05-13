import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var MypackagesdriverPage = /** @class */ (function () {
    function MypackagesdriverPage() {
        this.packages = [];
        /*this.packages = JSON.parse(localStorage.getItem("mypackages.packages"));
        console.log("packages: " + JSON.stringify(this.packages[0].pickupAddress));*/
    }
    MypackagesdriverPage.prototype.ngOnInit = function () {
    };
    MypackagesdriverPage = tslib_1.__decorate([
        Component({
            selector: 'app-mypackagesdriver',
            templateUrl: './mypackagesdriver.page.html',
            styleUrls: ['./mypackagesdriver.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MypackagesdriverPage);
    return MypackagesdriverPage;
}());
export { MypackagesdriverPage };
//# sourceMappingURL=mypackagesdriver.page.js.map