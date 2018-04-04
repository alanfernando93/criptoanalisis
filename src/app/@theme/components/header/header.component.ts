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
        let id = localStorage.getItem("userId")
        this.userService.getById(id).subscribe(resp=> this.user = resp)
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
    this.userService.logout().subscribe(success => {
      this.router.navigateByUrl("/auth/logout", {skipLocationChange: true}).then(r => {
        localStorage.clear()
        this.router.navigate(["/pages/dashboard"])
      })
    })
  }

  signin() {
    this.router.navigate(["/auth/login"]);
  }

  signup() {
    this.router.navigate(["/auth/register"]);
  }
}
