import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaymentPage } from './payment.page';
var routes = [
    {
        path: '',
        component: PaymentPage
    }
];
var PaymentPageModule = /** @class */ (function () {
    function PaymentPageModule() {
    }
    PaymentPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PaymentPage]
        })
    ], PaymentPageModule);
    return PaymentPageModule;
}());
export { PaymentPageModule };
//# sourceMappingURL=payment.module.js.map