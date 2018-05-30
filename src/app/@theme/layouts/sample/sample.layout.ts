import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

import { UserService } from "../../../@core/data/users.service";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/delay";

import { MENU_ITEMS } from "../../../pages/pages-menu";

// TODO: move layouts into the framework
@Component({
  selector: "nb-sample-layout",
  styleUrls: ["./sample.layout.scss"],
  template: `
  <nb-layout [center]="true" windowMode>    
    <nb-layout-header>
      <ngx-header [position]="'normal'"></ngx-header>    
    </nb-layout-header>
    <nb-layout-header>
        <ngx-headertwo [position]="'normal'"></ngx-headertwo>    
    </nb-layout-header>      
    <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive [left]="true">
      <nb-sidebar-header class="d-block d-sm-none" *ngIf="user">
        <nb-user [menu]="" [name]="user?.username" [picture]="user?.perfil" ></nb-user>
        <nb-action>
          <span class="badge badge-secondary">2 $CA</span>
        </nb-action>
        <nb-action>
          <span class="badge badge-secondary">17 F</span>
        </nb-action>
        <nb-action>
          <span class="badge badge-secondary">25 P</span>
        </nb-action>
        <hr>
        <div>
          <nb-action>
            <a class="btn btn-primary btn-tn" (click)="profile()">Profile</a>
          </nb-action>
          <nb-action>
            <a class="btn btn-primary btn-tn" (click)="logout()">Log out</a>
          </nb-action>
        </div>
      </nb-sidebar-header>

      <nb-sidebar-header *ngIf="!user" class="d-block d-sm-none">
        <nb-action>
          <a class="btn btn-primary btn-tn" (click)="signup()">Sign Up</a>
        </nb-action>
        <nb-action>
          <a class="btn btn-primary btn-tn" (click)="signin()" >Log In</a>
        </nb-action>
      </nb-sidebar-header>

        <!-- <ng-content select="nb-menu"></ng-content> -->
      <nb-menu [items]="menu" [autoCollapse]="true"></nb-menu>
    </nb-sidebar>

    <nb-layout-column class="main-content">
      <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>

    <nb-layout-footer fixed>
      <ngx-footer></ngx-footer>
    </nb-layout-footer>
  </nb-layout>
  `
})
export class SampleLayoutComponent implements OnInit {
  menu = MENU_ITEMS;
  user;

  constructor(
    protected userService: UserService,
    protected router: Router,
    private authService: NbAuthService
  ) {
  }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.getValue() && localStorage.length != 0) {
        let id = localStorage.getItem("userId")
        this.userService.getById(id).subscribe(resp => this.user = resp)
      }
    });
  }

  signin() {
    this.router.navigate(["/auth/login"]);
  }

  signup() {
    this.router.navigate(["/auth/register"]);
  }
  logout() {
    localStorage.clear();
    this.user = null;
    this.router.navigate(["/"]);
  }
  profile() {
    this.router.navigate(["/user/profile"]);
  }
}
