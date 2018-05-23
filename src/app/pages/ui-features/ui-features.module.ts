import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ButtonsModule } from './buttons/buttons.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { TypographyComponent } from './typography/typography.component';
import { SearchComponent } from './search-fields/search-fields.component';

const components = [
  UiFeaturesComponent,
  TypographyComponent,
  SearchComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UiFeaturesRoutingModule,
    ButtonsModule,
  ],
  declarations: [
    ...components,
  ]
})
export class UiFeaturesModule { }
