import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { designUserRoutingModule, routedComponents} from './designUser-routing.module';
import { userPopupComponent } from './userPopup/userPopup.component';


@NgModule({
    imports: [
        ThemeModule,
        designUserRoutingModule
    ],
    exports: [
        userPopupComponent
    ],
    declarations: [
        ...routedComponents,
        userPopupComponent
    ],
    providers: [],
})
export class designUserModule {}