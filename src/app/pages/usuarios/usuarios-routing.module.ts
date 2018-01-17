import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { ProfileComponent} from './profile/profile.component';

const routes: Routes = [{
    path: '',
    component: UsuariosComponent,
    children: [{
      path: 'profile',
      component: ProfileComponent,
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
  UsuariosComponent,
  ProfileComponent
];