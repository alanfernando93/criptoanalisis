import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { NgxAuthComponent } from './auth.component';
import { NgxAuthBlockComponent } from './auth-block/auth-block.component';
import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

import {RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE} from 'ng-recaptcha';

import { AuthRoutingModule } from './auth-routing.module';

const AUTH_COMPONENTS = [
  NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
];

@NgModule({
  imports: [
      AuthRoutingModule,
      ThemeModule,
      RecaptchaModule.forRoot(),
  ],
  declarations: [
      ...AUTH_COMPONENTS,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { 
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    } as RecaptchaSettings,
  },{
    provide: RECAPTCHA_LANGUAGE,
    useValue: 'es',
  }],
})
export class AuthModule {}
