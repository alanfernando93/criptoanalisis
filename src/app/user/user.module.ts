import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule} from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MomentModule } from 'angular2-moment';
import { EditComponent } from './edit/edit.component';
//import { NewsModule } from '../pages/news/news.module';
import { ListSignalComponent } from '../pages/news/list/list.component';
import { NewsService } from '../pages/news/news.service'
import { ViewComponent } from '../pages/news/view/view.component';
import { ListComponent } from '../pages/signals/list/list.component';
import { SignalsService } from '../pages/signals/signals.service'

const USER_COMPONENTS = [
    UserComponent,
    ProfileComponent,
    EditComponent,
];

@NgModule({
    imports: [
        UserRoutingModule,
        ThemeModule,
        MomentModule
    ],
    declarations: [
        ...USER_COMPONENTS,
        ListComponent,
        ListSignalComponent
    ],
    providers: [NewsService, SignalsService],
})
export class UserModule { }
