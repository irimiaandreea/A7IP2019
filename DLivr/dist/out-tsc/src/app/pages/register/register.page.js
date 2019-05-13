import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(formBuilder, userService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.submitted = false;
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            phone_number: ['', [Validators.minLength(7), Validators.required, Validators.pattern('[0-9+ ]*')]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: this.MustMatch('password', 'confirmPassword'),
        });
    };
    Object.defineProperty(RegisterPage.prototype, "f", {
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterPage.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.registerForm.invalid) {
            console.log('register form invalid');
            return;
        }
        var formJson = JSON.stringify(this.registerForm.value);
        this.userService.register(formJson);
        console.log(formJson);
    };
    RegisterPage.prototype.MustMatch = function (controlName, matchingControlName) {
        return function (formGroup) {
            var control = formGroup.controls[controlName];
            var matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, ClientsService])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map