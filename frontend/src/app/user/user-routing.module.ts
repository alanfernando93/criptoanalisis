import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [{ 
    path: '', 
    component: UserComponent,
    children: [{
        path: 'profile/:id',
        component: ProfileComponent,
    },{
        path: 'edit',
        component: EditComponent
    }]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
