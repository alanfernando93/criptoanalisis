import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { ImageCropperComponent } from 'ng2-img-cropper';

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
  CropperModalComponent,
  FooterComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  userDesignComponent,
  commentComponent
  
} from './components';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import {
  SampleLayoutComponent
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
];

const COMPONENTS = [
  ImageCropperComponent,
  //CropperModalComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageComponent,
  FooterComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  SampleLayoutComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
