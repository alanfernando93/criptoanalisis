import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    var isAuth = this.authService.isAuthenticated();
    console.log(JSON.stringify(isAuth));
    return false;
      // .do(authenticated => {
      //   if (!authenticated) {
      //     this.router.navigate(['auth/login']);
      //   }
      // });

  }
}
