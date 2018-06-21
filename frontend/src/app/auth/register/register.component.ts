/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent {
  valid: boolean = false;
  validCaptcah: boolean = false;

  public resolved(captchaResponse: string) {
    this.valid = true;
  }

  ngxRegister() {
    if (!this.valid) {
      this.validCaptcah = true;
      setTimeout(() => {
        this.validCaptcah = false;
      }, 1000);
      return;
    }
    this.user.username = this.user.email.split('@')[0];
    this.register();
  }

  register() {
    var _this = this;
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.register(this.provider, this.user).subscribe(function (result) {
      console.log(result);
      _this.submitted = false;
      if (result.isSuccess()) {
        _this.messages = result.getMessages();
      }
      else {
        _this.errors = result.getErrors();
      }
      var redirect = result.getRedirect();
      if (redirect) {
        setTimeout(function () {
          return _this.router.navigateByUrl(redirect);
        }, _this.redirectDelay);
      }
    }, error => console.log(error),
    () => console.log("---aqui"));
  }

  getConfigValue(key) {
    return getDeepFromObject(this.config, key, null);
  }
}
