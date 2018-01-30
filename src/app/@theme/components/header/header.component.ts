import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { UserService } from "../../../@core/data/users.service";
import { AnalyticsService } from "../../../@core/utils/analytics.service";
import { overrideComponentView } from '@angular/core/src/view/entrypoint';

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  @Input() position = "normal";

  user: any = null;

  userMenu = [
    { title: "Profile", link: "/user/profile" },
    { title: "Log out" }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private authService: NbAuthService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.getValue() && localStorage.length != 0) {
        this.userService.setToken("?access_token="+localStorage.getItem("auth_app_token"));
        this.userService.setUserId(localStorage.getItem("userId"));
        this.userService.getUser().then((usuario)=>{
          this.user = JSON.parse(usuario['_body']);
          this.userService.setSession(this.user);
        })
      }
    });
  }

  ngOnInit() {    
    
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, "settings-sidebar");
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent("startSearch");
  }

  logout() {
    this.userService.logout().then(()=>{
      this.userService.clear();
      this.router.navigateByUrl("/auth/logout");
      setTimeout(()=>{
        this.router.navigate(["/"])
      },500)
    });
  }

  signin() {
    this.router.navigate(["/auth/login"]);
  }

  signup() {
    this.router.navigate(["/auth/register"]);
  }
}
