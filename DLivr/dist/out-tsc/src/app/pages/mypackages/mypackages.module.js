import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MypackagesPage } from './mypackages.page';
var routes = [
    {
        path: '',
        component: MypackagesPage
    }
];
var MypackagesPageModule = /** @class */ (function () {
    function MypackagesPageModule() {
    }
    MypackagesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MypackagesPage]
        })
    ], MypackagesPageModule);
    return MypackagesPageModule;
}());
export { MypackagesPageModule };
//# sourceMappingURL=mypackages.module.js.map