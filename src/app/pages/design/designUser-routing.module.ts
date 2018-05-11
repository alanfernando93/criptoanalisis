import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { designUserComponent } from './designUser.component';
import { userPopupComponent } from './userPopup/userPopup.component';

const routes: Routes = [{
    path: '',
    component: designUserComponent,
    children: [{
        path: 'user-Header',
        component: designUserComponent
    }]
    
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class designUserRoutingModule {}

export const routedComponents = [
    designUserComponent,
    userPopupComponent
];
