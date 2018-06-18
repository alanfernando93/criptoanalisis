import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

import { _GLOBAL } from '../common/ConfigSettings';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          baseEndpoint: _GLOBAL.apiUrl,
          login: {
            redirectDelay: 500,
            rememberMe: true,
            endpoint: 'usuarios/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
          },
          token: {
            key: 'data.token',
            getter: (module: string, res: HttpResponse<Object>) => {
              localStorage.setItem('userId', res.body['userId']);
              return res.body['id'];
            },
          },
          register: {
            endpoint: 'usuarios',
            method: 'post',
            redirect: {
              success: '/pages/forms/inputs',
              failure: null,
            },
            defaultErrors: ['Signed Up is not correct, please try again'],
            defaultMessages: ['you have been successfully signed up'],
          },
        },
      },
    },
  }).providers,
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
