import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { MenuItem } from '../../../pages/menu-item';

// import { MENU_ITEMS } from "../../../pages/pages-menu";

// TODO: move layouts into the framework
@Component({
  selector: "nb-sample-layout",
  styleUrls: ["./sample.layout.scss"],
  template: `
  <nb-layout windowMode>    
    <nb-layout-header>
      <ngx-header [position]="'normal'"></ngx-header>    
    </nb-layout-header>
    <nb-layout-header>
        <ngx-headertwo [position]="'normal'"></ngx-headertwo>    
    </nb-layout-header>      
    <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
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
  @Input() menu: any = [];
  user;

  constructor(
    protected userService: UserService,
    protected router: Router,
    private authService: NbAuthService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translateMenu();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => { //Live reload
      this.translateMenu();
    });
    if (!this.userService.isAuth()) return;
    this.userService.getCurrentUser().subscribe(data => this.user = data)
  }

  private translateMenu(): void {
    this.menu.forEach((menuItem: MenuItem) => {
      this.translateMenuTitle(menuItem);
    });
  }

  /**
   * Translates one root menu item and every nested children
   * @param menuItem
   * @param prefix
   */
  private translateMenuTitle(menuItem: MenuItem, prefix: string = ''): void {
    let key = '';
    try {
      key = (prefix !== '')
        ? SampleLayoutComponent.getMenuItemKey(menuItem, prefix)
        : SampleLayoutComponent.getMenuItemKey(menuItem);
    }
    catch (e) {
      //Key not found, don't change the menu item
      return;
    }

    this.translate.get(key).subscribe((translation: string) => {
      menuItem.title = translation;
    });
    if (menuItem.children != null) {
      //apply same on every child
      menuItem.children.forEach((childMenuItem: MenuItem) => {
        //We remove the nested key and then use it as prefix for every child
        this.translateMenuTitle(childMenuItem, SampleLayoutComponent.trimLastSelector(key));
      });
    }
  }

  /**
   * Resolves the translation key for a menu item. The prefix must be supplied for every child menu item
   * @param menuItem
   * @param prefix
   * @returns {string}
   */
  private static getMenuItemKey(menuItem: MenuItem, prefix: string = 'menu'): string {
    if (menuItem.key == null) {
      throw new Error('Key not found');
    }

    const key = menuItem.key.toLowerCase();
    if (menuItem.children != null) {
      return prefix + '.' + key + '.' + key; //Translation is nested
    }
    return prefix + '.' + key;
  }

  /**
   * Used to remove the nested key for translations
   * @param key
   * @returns {string}
   */
  private static trimLastSelector(key: string): string {
    const keyParts = key.split('.');
    keyParts.pop();
    return keyParts.join('.');
  }

  signin() {
    this.router.navigate(["/auth/login"]);
  }

  signup() {
    this.router.navigate(["/auth/register"]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  profile() {
    this.router.navigate(["/user/profile"]);
  }
}
