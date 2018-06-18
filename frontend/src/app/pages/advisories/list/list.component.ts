import { Component, OnInit } from '@angular/core';
import { AdvisoriesService } from '../advisories.service';
import { Session } from '../../../@core/data/session';
import { UserService } from '../../../@core/data/users.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';



@Component({
    selector: 'ngx-list-coach',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent extends Session implements OnInit {
    advisories: any;
    modalidad1: any;
    modalidad2: any;
    advisoriesbyid: any;
    virtual: any;
    private userId = this.getUserId();
    user: any = null;

    constructor(
        private userService: UserService,
        private authService: NbAuthService,
        private advisoriesService: AdvisoriesService,

    ) {
        super()
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.getValue() && localStorage.length !== 0) {
                const id = localStorage.getItem('userId')
                this.userService.getById(id).subscribe(resp => this.user = resp)
            }
        });
    }

    ngOnInit() {

        this.getAdvisories()
        this.getadvisoriesbyid();
    }
    getAdvisories() {
        this.advisoriesService.getAdvisories().subscribe(advisorie => {
            this.advisories = advisorie;
            this.advisories.forEach((element, index) => {
                const newsId = this.advisories[index].id;
                this.advisoriesService.getUserByNews(newsId).subscribe(user => {
                    this.advisories[index].contentUser = [];
                    this.advisories[index].contentUser.push(user);
                    this.advisories[index].mod1 = ' ';
                    this.advisories[index].mod2 = ' ';
                    this.advisories[index].mod1 = this.advisories[index].modalidad[0];
                    this.virtual = this.advisories[index].modalidad[0];
                    this.advisories[index].mod2 = this.advisories[index].modalidad[1];

                });
            });


        });
    }
    getadvisoriesbyid() {
        this.advisoriesService.getadvisoriesbyuserid(this.userId).subscribe(data => {
            this.advisoriesbyid = data;
        });
    }
}
