/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { NbLoginComponent, NbAuthService, defaultSettings, NbAuthResult } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  return = '';
  constructor(
    router: Router,
    service: NbAuthService,
    private route: ActivatedRoute,
  ) {
    super(service, defaultSettings, router);
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/pages/dashboard/');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = this.return;
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
