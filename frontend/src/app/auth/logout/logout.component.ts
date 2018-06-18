/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  template: `
    <div>Logging out, please wait...</div>
  `,
})
export class NgxLogoutComponent extends NbLogoutComponent implements OnInit {

}
