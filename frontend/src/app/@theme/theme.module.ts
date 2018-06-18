import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MomentModule } from 'angular2-moment';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import {
  NbActionsModule,
  NbLayoutModule,
  NbCardModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
} from '@nebular/theme';

import {
  FooterComponent,
  ScheduleComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageModalComponent,
  SearchInputComponent,
  TinyMCEComponent,
  SignalAllComponent,
  NewsAllComponent,
  UserDesignComponent,
  CommentComponent,
  ComplaintComponent,
  ShareComponent,
  AdvisoriesAllComponent,
  PreloadComponent,
} from './components';
import { CapitalizePipe, PluralPipe, RoundPipe } from './pipes';
import {
  SampleLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, ToasterModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NgbModule,
  MomentModule,
  ShareButtonsModule,
];

const COMPONENTS = [
  ImageCropperComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageModalComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  SampleLayoutComponent,
  ScheduleComponent,
  AdvisoriesAllComponent,
  UserDesignComponent,
  CommentComponent,
  ComplaintComponent,
  ShareComponent,
  NewsAllComponent,
  SignalAllComponent,
  PreloadComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
];

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ShareButtonsModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  })],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
