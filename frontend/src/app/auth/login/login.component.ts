/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthResult, NbAuthService, NbAuthBlockComponent } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {

  return: string = '';
  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(protected service: NbAuthService,
    protected config = {},
    protected router: Router,
    private route: ActivatedRoute) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/pages/dashboard');
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
