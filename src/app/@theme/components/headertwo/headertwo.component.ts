import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
    selector: "ngx-headertwo",
    styleUrls: ["./headertwo.component.scss"],
    templateUrl: "./headertwo.component.html"
})
export class HeaderTwoComponent implements OnInit {
    @Input() position = "normal";

    user: any = null;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private userService: UserService,
        private analyticsService: AnalyticsService,
        private authService: NbAuthService,
        private router: Router 
    ){}

    ngOnInit(){

    }

}