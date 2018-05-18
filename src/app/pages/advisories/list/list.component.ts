import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AdvisoriesService } from '../advisories.service';
import { Session } from '../../../@core/data/session';
import { UserService } from "../../../@core/data/users.service";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";


@Component({
    selector: 'ngx-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends Session implements OnInit {
    advisories: any;
    modalidad1:any;
    modalidad2:any;
    advisoriesbyid: any;
    private userId = this.getUserId();
    user: any = null;

    constructor(
        private userService: UserService,
        private authService: NbAuthService,

        
        private http: Http,
        private AdvisoriesService: AdvisoriesService,

    ) {
        super()
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.getValue() && localStorage.length != 0) {
              let id = localStorage.getItem("userId")
              this.userService.getById(id).subscribe(resp=> this.user = resp)
            }
          });
    }
    
    ngOnInit() {
        
        this.getAdvisories()
        this.getadvisoriesbyid();
    }
    getAdvisories() {
        this.AdvisoriesService.getAdvisories().subscribe(data => {
            this.advisories = data;
            
            
            /*this.advisories.forEach((element, index) => {
          
                this.modalidad1= this.advisories[index];
                console.log("hola"+this.modalidad1.modalidad[0])
                this.modalidad1= this.advisories[index].modalidad[0];
                this.modalidad2= this.advisories[index].modalidad[1];
                
                
              });*/
              this.advisories.forEach((element, index) => {
                let newsId = this.advisories[index].id;
                this.AdvisoriesService.getUserByNews(newsId).subscribe(data => {
                  this.advisories[index].contentUser = [];
                  this.advisories[index].contentUser.push(data);
                  this.advisories[index].mod1 = " ";
                  this.advisories[index].mod2 = " ";
                  this.advisories[index].mod1 = this.advisories[index].modalidad[0];
                  this.advisories[index].mod2 = this.advisories[index].modalidad[1];
                  
                });
              });
            
            
        });
    }
    getadvisoriesbyid(){
        this.AdvisoriesService.getadvisoriesbyuserid(this.userId).subscribe(data => {
            this.advisoriesbyid = data;
            //console.log(this.userId)
        });
    }
}