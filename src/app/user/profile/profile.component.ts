import { Component, OnInit } from '@angular/core';

import { UserService } from '../../@core/data/users.service';

@Component({
    selector: 'ngx-profile',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {

    user: any = {};
    userId;
    token;

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.userId = Number.parseInt(localStorage.getItem('userId'));
        this.token = localStorage.getItem('auth_app_token');
        this.userService.getUser(this.userId, this.token).then(usuario => {
            this.user = JSON.parse(usuario['_body']);
        });
    } 

    onSave() {
        this.userService.update(this.userId,this.token,this.user).then(resp=>{
            console.log(JSON.parse(resp));
        });
    }
}