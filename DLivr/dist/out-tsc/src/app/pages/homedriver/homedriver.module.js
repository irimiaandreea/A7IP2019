import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomedriverPage } from './homedriver.page';
var routes = [
    {
        path: '',
        component: HomedriverPage
    }
];
var HomedriverPageModule = /** @class */ (function () {
    function HomedriverPageModule() {
    }
    HomedriverPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomedriverPage]
        })
    ], HomedriverPageModule);
    return HomedriverPageModule;
}());
export { HomedriverPageModule };
//# sourceMappingURL=homedriver.module.js.map