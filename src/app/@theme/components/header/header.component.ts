import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any = null;

  userMenu = [{ title: 'Profile', link: '/user/profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private router: Router,
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.getValue()) {
          let userId = Number.parseInt(localStorage.getItem('userId'));
          this.userService.getUser(userId, token['token']).then(usuario => {
            this.user = JSON.parse(usuario['_body']);
          });
        }
      });
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this.router.navigate(['/']);
  }

  signin() {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/register'])
  }
}
