import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
var routes = [
    {
        path: 'menu',
        component: MenuPage,
        children: [
            {
                path: 'home',
                loadChildren: '../home/home.module#HomePageModule'
            },
            {
                path: 'homedriver',
                loadChildren: '../homedriver/homedriver.module#HomedriverPageModule'
            },
            {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsPageModule'
            },
            {
                path: 'mypackages',
                loadChildren: '../mypackages/mypackages.module#MypackagesPageModule'
            },
            {
                path: 'payment',
                loadChildren: '../payment/payment.module#PaymentPageModule'
            },
            {
                path: 'mypackagesdriver',
                loadChildren: '../mypackagesdriver/mypackagesdriver.module#MypackagesdriverPageModule'
            },
            {
                path: 'help',
                loadChildren: '../help/help.module#HelpPageModule'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/menu/home'
    }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuPage]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map