import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MypackagesdriverPage } from './mypackagesdriver.page';
var routes = [
    {
        path: '',
        component: MypackagesdriverPage
    }
];
var MypackagesdriverPageModule = /** @class */ (function () {
    function MypackagesdriverPageModule() {
    }
    MypackagesdriverPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MypackagesdriverPage]
        })
    ], MypackagesdriverPageModule);
    return MypackagesdriverPageModule;
}());
export { MypackagesdriverPageModule };
//# sourceMappingURL=mypackagesdriver.module.js.map