import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule} from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { UploadService } from './upload.service';

const USER_COMPONENTS = [
    UserComponent,
    ProfileComponent,
];

@NgModule({
    imports: [
        UserRoutingModule,
        ThemeModule,
    ],
    declarations: [
        ...USER_COMPONENTS
    ],
    providers: [UploadService],
})
export class UserModule { }
