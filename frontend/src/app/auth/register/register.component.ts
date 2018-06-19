/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

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
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  ngxRegister() {
    if (!this.valid) {
      this.validCaptcah = true;
      setTimeout(() => {
        this.validCaptcah = false;
      }, 1000);
      return;
    }
    this.user.username = this.user.email.split("@")[0];
    super.register();
  }
}
