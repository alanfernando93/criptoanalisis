import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";

import { StateService } from "../../../@core/data/state.service";
import { UserService } from '../../../@core/data/users.service';

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/delay";

import { MENU_ITEMS } from "../../../pages/pages-menu";

// TODO: move layouts into the framework
@Component({
  selector: "ngx-sample-layout",
  styleUrls: ["./sample.layout.scss"],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'right' ? 'normal': 'inverse'"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [right]="sidebar.id === 'left'">

        <nb-sidebar-header class="d-block d-sm-none" *ngIf="user" >
          <nb-user [menu]="userMenu" [name]="user?.username" [picture]="user?.picture" (menuClick)="logout()"></nb-user>
            <nb-action>
              <span class="badge badge-secondary">2 $CA</span>
            </nb-action>
            <nb-action>
              <span class="badge badge-secondary">17 F</span>
            </nb-action>
            <nb-action>
              <span class="badge badge-secondary">25 P</span>
            </nb-action>
            <nb-action>
            <a class="icon-container badge badge-secondary" href="#">
              Sign Up
            </a>
          </nb-action>
          <nb-action>
            <a class="icon-container badge badge-secondary" href="#">
              Log In
            </a>
          </nb-action>
            <!--
          <a href="#" class="btn btn-hero-success main-btn d-block d-sm-block">
            <i class="ion ion-social-github"></i> <span>Support Us</span>
          </a>
          -->
        </nb-sidebar-header>        

        <nb-sidebar-header *ngIf="!user" class="d-block d-sm-none">
          <nb-action>
            <a class="icon-container badge badge-secondary" href="#">
              Sign Up
            </a>
          </nb-action>
          <nb-action>
            <a class="icon-container badge badge-secondary" href="#">
              Log In
            </a>
          </nb-action>
        </nb-sidebar-header>
        
        <!-- <ng-content select="nb-menu"></ng-content> -->
        <nb-menu [items]="menu"></nb-menu>
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
export class SampleLayoutComponent implements OnDestroy, OnInit {
  menu = MENU_ITEMS;
  id;
  user;
  token;

  subMenu: NbMenuItem[] = [
    {
      title: "PAGE LEVEL MENU",
      group: true
    },
    {
      title: "Buttons",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/buttons"
    },
    {
      title: "Grid",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/grid"
    },
    {
      title: "Icons",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/icons"
    },
    {
      title: "Modals",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/modals"
    },
    {
      title: "Typography",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/typography"
    },
    {
      title: "Animated Searches",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/search-fields"
    },
    {
      title: "Tabs",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/tabs"
    }
  ];
  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;

  constructor(
    protected stateService: StateService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    protected userService: UserService
  ) {
    this.layoutState$ = this.stateService
      .onLayoutState()
      .subscribe((layout: string) => (this.layout = layout));

    this.sidebarState$ = this.stateService
      .onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName("is");
    this.menuClick$ = this.menuService
      .onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .subscribe(
        ([item, [bpFrom, bpTo]]: [
          any,
          [NbMediaBreakpoint, NbMediaBreakpoint]
        ]) => {
          if (bpTo.width <= isBp.width) {
            this.sidebarService.collapse("menu-sidebar");
          }
        }
      );
  }

  ngOnInit(){
    this.token = localStorage.getItem("auth_app_token");
    this.id = Number.parseInt(localStorage.getItem("userId"));
    this.userService.getUser(this.id, this.token).then((usuario)=>{
      this.user = JSON.parse(usuario['_body']);
    });
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
    this.user = null;
  }
  
}
