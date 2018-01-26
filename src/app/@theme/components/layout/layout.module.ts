/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';

import { NbSharedModule } from '@nebular/theme/components/shared/shared.module';

import {
  NgxLayoutComponent,
  NgxLayoutColumnComponent,
  NgxLayoutFooterComponent,
  NgxLayoutHeaderComponent,
} from './layout.component';

const NB_LAYOUT_COMPONENTS = [
  NgxLayoutComponent,
  NgxLayoutColumnComponent,
  NgxLayoutFooterComponent,
  NgxLayoutHeaderComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_LAYOUT_COMPONENTS,
  ],
  exports: [
    ...NB_LAYOUT_COMPONENTS,
  ],
})
export class NgxLayoutModule { }