import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme/theme.module';
import { UsuariosRoutingModule, routedComponents } from './usuarios-routing.module';

import { UsuariosService } from './usuarios.service';

@NgModule({
    imports: [
        ThemeModule,
        UsuariosRoutingModule,
    ],
    declarations: [...routedComponents],
    providers: [ UsuariosService ],
})
export class UsuariosModule { }
