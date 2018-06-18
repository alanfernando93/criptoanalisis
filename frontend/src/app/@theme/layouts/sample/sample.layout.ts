import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { MenuItem } from '../../../pages/menu-item';

@Component({
  selector: 'nb-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  templateUrl: './sample.layout.html',
})
export class SampleLayoutComponent implements OnInit {
  @Input() menu: any = [];
  user;

  constructor(
    protected userService: UserService,
    protected router: Router,
    private authService: NbAuthService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.translateMenu();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
    }catch (e) {
      return;
    }
    this.translate.get(key).subscribe((translation: string) => {
      menuItem.title = translation;
    });
    if (menuItem.children != null) {
      menuItem.children.forEach((childMenuItem: MenuItem) => {
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
      return prefix + '.' + key + '.' + key;
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
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/register']);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  profile() {
    this.router.navigate(['/user/profile']);
  }
}
