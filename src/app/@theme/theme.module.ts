import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

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
  HorarioComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageModalComponent,
  SearchInputComponent,
  TinyMCEComponent,
  signalAllComponent,
  newsAllComponent,
  userDesignComponent,
  commentComponent,
  denunciaComponent,
  shareComponent,
  advisoriesAllComponent

  

  
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
  MomentModule
];

const COMPONENTS = [
  ImageCropperComponent,
  //CropperModalComponent,
  HeaderComponent,
  HeaderTwoComponent,
  ImageModalComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  SampleLayoutComponent,
  HorarioComponent,
  advisoriesAllComponent,
  userDesignComponent,
  commentComponent,
  denunciaComponent,
  shareComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
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
