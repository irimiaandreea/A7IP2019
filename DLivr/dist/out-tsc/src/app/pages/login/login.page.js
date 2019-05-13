import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.submitted = false;
        this.loginForm = this.formBuilder.group({
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30),
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ]))
        });
    }
    LoginPage.prototype.onSubmit = function () {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            console.log('login form invalid');
            return;
        }
        var formJson = JSON.stringify(this.loginForm.value);
        this.userService.login(formJson);
    };
    Object.defineProperty(LoginPage.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ClientsService,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map