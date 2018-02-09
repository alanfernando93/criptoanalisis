import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { routedComponents } from '../../../pages/tables/tables-routing.module';

@NgModule({
    imports: [
        ThemeModule
    ],
    declarations:[
        ...routedComponents,
    ],
    providers:[]
})
export class HeadertwoModule {}